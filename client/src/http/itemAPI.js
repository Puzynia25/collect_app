import { $authHost, $host } from ".";

export const createItem = async (item) => {
    const { data } = await $authHost.post(`api/collection/${item.collectionId}/item`, item);
    return data;
};

export const fetchAllItems = async (collectionId, page, limit = 7) => {
    const { data } = await $host.get(`api/collection/${collectionId}/item`, {
        params: {
            collectionId,
            page,
            limit,
        },
    });
    return data;
};

export const fetchOneItem = async (collectionId, itemId) => {
    const { data } = await $host.get(`api/collection/${collectionId}/item/${itemId}`);
    return data;
};

export const removeOne = async (collectionId, itemId) => {
    const { data } = await $authHost.delete(`api/collection/${collectionId}/item/${itemId}`, {
        data: { id: itemId },
    });
    return data;
};

export const updateItem = async (item) => {
    const { data } = await $authHost.patch(`api/collection/${item.collectionId}/item/${item.itemId}`, item);
    return data;
};

export const fetchPopularTags = async () => {
    const { data } = await $host.get(`api/tags`);
    return data;
};

export const addLike = async (collectionId, itemId, userId) => {
    const { data } = await $authHost.post(`api/collection/${collectionId}/item/${itemId}/like`, { userId });
    return data;
};

export const removeLike = async (collectionId, itemId, userId) => {
    const { data } = await $authHost.delete(`api/collection/${collectionId}/item/${itemId}/unlike`, {
        data: { userId },
    });
    return data;
};

export const checkLike = async (collectionId, itemId, userId) => {
    const { data } = await $authHost.get(`api/collection/${collectionId}/item/${itemId}/checklike`, {
        params: { userId },
    });
    return data;
};
