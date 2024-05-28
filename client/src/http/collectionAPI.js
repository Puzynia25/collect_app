import { $authHost, $host } from ".";

export const createCollection = async (collection) => {
    const { data } = await $authHost.post("api/collection", collection);
    return data;
};

export const fetchAllCollections = async (categoryId, userId, page, limit = 5) => {
    const { data } = await $host.get("api/collection", {
        params: {
            categoryId,
            userId,
            page,
            limit,
        },
    });

    return data;
};

export const fetchOneCollection = async (id) => {
    const { data } = await $host.get("api/collection/" + id);
    return data;
};

export const removeOneCollection = async (id) => {
    const { data } = await $authHost.delete("api/collection/" + id, {
        data: { id },
    });
    return data;
};

export const fetchAllCategories = async () => {
    const { data } = await $host.get("api/category");
    return data;
};

export const fetchBiggest = async () => {
    const { data } = await $host.get("api/collection/biggest");
    return data;
};

export const createCustomFields = async ({ collectionId, customFields }) => {
    const { data } = await $authHost.post("api/collection/" + collectionId + "/custom-fields", {
        collectionId,
        customFields,
    });
    return data;
};

export const fetchAllCustomFields = async (collectionId) => {
    const { data } = await $host.get("api/collection/" + collectionId + "/custom-fields");
    return data;
};
