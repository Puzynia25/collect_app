import { $authHost, $host } from ".";

export const createCollection = async (collection) => {
    const { data } = await $authHost.post("api/collection", collection);
    return data;
};

export const fetchAllCollections = async (categoryId, page, limit = 5) => {
    const { data } = await $host.get("api/collection", {
        params: {
            categoryId,
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

export const fetchAllCategories = async () => {
    const { data } = await $host.get("api/category");
    return data;
};

export const fetchCategory = async (categoryId) => {
    const { data } = await $host.post("api/category/:id", {
        id: categoryId,
    });
    return data;
};
