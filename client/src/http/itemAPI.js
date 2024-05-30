import { $authHost, $host } from ".";

export const createItem = async (item) => {
    const { data } = await $authHost.post("api/collection/item", item);
    return data;
};

export const fetchAllItems = async (collectionId, page, limit = 7) => {
    const { data } = await $host.get("api/collection/item", {
        params: {
            collectionId,
            page,
            limit,
        },
    });
    return data;
};

export const fetchOneItem = async (id) => {
    const { data } = await $host.get("api/collection/item/" + id);
    return data;
};

export const removeOne = async (id) => {
    const { data } = await $authHost.delete("api/collection/item/" + id, {
        data: { id },
    });
    return data;
};

export const updateItem = async (item) => {
    const { data } = await $authHost.patch("api/collection/item/" + item.itemId, item);
    return data;
};

export const fetchPopularTags = async () => {
    const { data } = await $host.get("api/collection/item/tags");
    return data;
};

export const addLike = async (itemId, userId) => {
    const { data } = await $authHost.post("api/collection/item/" + itemId + "/like", { userId });
    return data;
};

export const removeLike = async (itemId, userId) => {
    const { data } = await $authHost.delete("api/collection/item/" + itemId + "/unlike", {
        data: { userId },
    });
    return data;
};

export const checkLike = async (itemId, userId) => {
    const { data } = await $authHost.get("api/collection/item/" + itemId + "/checklike", {
        params: { userId },
    });
    return data;
};
