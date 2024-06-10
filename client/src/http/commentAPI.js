import { $authHost, $host } from ".";

export const createComment = async (comment) => {
    const { data } = await $authHost.post(
        `api/collection/${comment.collectionId}/item/${comment.itemId}/comment`,
        comment
    );
    return data;
};

export const fetchItemComments = async (collectionId, itemId) => {
    const { data } = await $host.get(`api/collection/${collectionId}/item/${itemId}/comment`, {
        params: {
            itemId,
        },
    });
    return data;
};
