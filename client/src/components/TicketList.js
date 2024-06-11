import { Table } from "flowbite-react";
import Pages from "./Pages";
import { useContext } from "react";
import { Context } from "../utils/context";
import { JIRA_DOMAIN } from "../utils/consts";

const TicketList = ({ ticketList }) => {
    const { ticketPage } = useContext(Context);
    console.log(ticketList);

    const issueUrl = (key) => {
        return `${JIRA_DOMAIN}/browse/${key}`;
    };

    return (
        <div className="overflow-x-auto">
            <Table className="rounded-3xl shadow text-nowrap">
                <Table.Head>
                    <Table.HeadCell>Issue Id</Table.HeadCell>
                    <Table.HeadCell>Issue Key</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Collection</Table.HeadCell>
                    <Table.HeadCell>Link</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {ticketList?.length > 0 ? (
                        ticketList.map((issue) => {
                            return (
                                <Table.Row key={issue.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {issue.id}
                                    </Table.Cell>
                                    <Table.Cell>{issue.key}</Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {" "}
                                            {issue.fields.status.statusCategory.name}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>{issue.fields.customfield_10035}</Table.Cell>
                                    <Table.Cell>
                                        <a
                                            className="text-blue-600 hover:underline"
                                            href={issueUrl(issue.key)}
                                            target="_blank">
                                            {issueUrl(issue.key)}
                                        </a>
                                    </Table.Cell>
                                    <Table.Cell>{issue.fields.priority.name}</Table.Cell>
                                    <Table.Cell>{issue.fields.description.content[0]?.content[0]?.text}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    ) : (
                        <Table.Row className="p-4">
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                colSpan={6}>
                                There is no issues ...
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Pages page={ticketPage} />
        </div>
    );
};

export default TicketList;
