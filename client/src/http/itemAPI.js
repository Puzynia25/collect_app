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
