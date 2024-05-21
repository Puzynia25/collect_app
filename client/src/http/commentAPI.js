import { $authHost, $host } from ".";

export const createComment = async (comment) => {
    const { data } = await $authHost.post("api/collection/item/comment", comment);
    return data;
};

export const fetchItemComments = async (itemId) => {
    const { data } = await $host.get("api/collection/item/comment", {
        params: {
            itemId,
        },
    });
    return data;
};
