const axios = require("axios");

const headers = {
    Authorization: `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64")}`,
    Accept: "application/json",
};

const getJiraAccountId = async (email) => {
    try {
        const response = await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${email}`, {
            headers: headers,
        });

        const users = response.data;
        if (users.length > 0) {
            return users[0].accountId;
        } else {
            return null;
        }
    } catch (e) {
        console.log("Error get Jira AccountId:", e);
    }
};

const createJiraUser = async (name, email) => {
    try {
        const user = await axios.post(
            process.env.JIRA_DOMAIN + "/rest/api/3/user",
            {
                emailAddress: email,
                displayName: name,
                products: ["jira-software"],
            },
            { headers: headers }
        );

        return user.data.accountId;
    } catch (e) {
        if (e.response) {
            console.error("Error response data:", e.response.data);
        } else {
            console.error("Error message:", e.message);
        }
        throw new Error("Failed to create user");
    }
};

const getJiraTicketsByAccountId = async (accountId, startAt = 0, maxResults = 10) => {
    try {
        const data = await axios.get(process.env.JIRA_DOMAIN + "/rest/api/3/search", {
            headers: headers,
            params: {
                jql: `reporter=${accountId}`,
                startAt: startAt,
                maxResults: maxResults,
            },
        });

        return {
            issues: data.data.issues,
            total: data.data.total,
            startAt: data.data.startAt,
            maxResults: data.data.maxResults,
        };
    } catch (e) {
        console.error("Error getJiraTicketsByAccountId", e.message);
    }
};

module.exports = { getJiraAccountId, createJiraUser, getJiraTicketsByAccountId };
