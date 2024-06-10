import { $authHost } from ".";

export const createTicket = async (ticket) => {
    const { data } = await $authHost.post("api/create-ticket", ticket);
    return data;
};

export const fetchTicketsByEmail = async (email, startAt, maxResults) => {
    console.log("Sending request to server with email:", email);
    const { data } = await $authHost.get("api/create-ticket", {
        params: {
            email,
            startAt,
            maxResults,
        },
    });
    return data;
};