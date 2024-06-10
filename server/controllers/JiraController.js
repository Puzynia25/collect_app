const ApiError = require("../error/ApiError");
const axios = require("axios");
const { getJiraAccountId, createJiraUser, getJiraTicketsByAccountId } = require("../services/jiraService");
const { Collection } = require("../models/models");

class JiraController {
    async create(req, res, next) {
        const { user, collectionId, link, priority, description } = req.body;

        let accountId;
        try {
            accountId = await getJiraAccountId(user.email);

            if (!accountId) {
                accountId = await createJiraUser(user.name, user.email);
            }
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest("Failed to fetch current user id"));
        }

        if (!accountId) {
            return next(ApiError.badRequest("not possible to make an issue: accountId undefined"));
        }

        let collection;
        if (collectionId) {
            collection = await Collection.findByPk(collectionId);
            if (!collection) {
                return next(ApiError.badRequest("Collection not found"));
            }
        }

        const adfDescription = {
            type: "doc",
            version: 1,
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: description,
                        },
                    ],
                },
            ],
        };

        const issue = {
            fields: {
                project: {
                    key: process.env.JIRA_PROJECT_KEY,
                },
                summary: `Support request from ${user.email}`,
                description: adfDescription,
                issuetype: {
                    name: "Task",
                },
                priority: {
                    name: priority,
                },
                reporter: {
                    id: String(accountId),
                },
                customfield_10035: collection?.name || "",
                customfield_10034: link,
            },
        };

        try {
            const response = await axios.post(`${process.env.JIRA_DOMAIN}/rest/api/3/issue`, issue, {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
                    ).toString("base64")}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (response.status !== 201) {
                console.error("Error creating issue:", e);
                return next(ApiError.badRequest("Failed to create issue"));
            }

            res.json(response.data);
        } catch (e) {
            console.error("Error creating issue:", e);
            next(ApiError.badRequest(e.message));
        }
    }

    async getTicketByEmail(req, res, next) {
        const { email, startAt, maxResults } = req.query;

        try {
            const accountId = await getJiraAccountId(email);

            const tickets = await getJiraTicketsByAccountId(accountId, parseInt(startAt), parseInt(maxResults));

            return res.json(tickets);
        } catch (e) {
            console.error("Error in getTicketByEmail:", e);
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new JiraController();
