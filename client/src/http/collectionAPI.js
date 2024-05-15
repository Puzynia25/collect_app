import { $authHost, $host } from ".";

export const createCollection = async (collection) => {
    const { data } = await $authHost.post("api/collection", collection);
    return data;
};

export const fetchCollectionsList = async () => {
    const { data } = await $host.get("api/collection");
    return data;
};

export const fetchOneCollection = async (id) => {
    const { data } = await $host.get("api/collection/" + id);
    return data;
};

export const fetchCategoriesList = async () => {
    const { data } = await $host.get("api/category");
    return data;
};

export const fetchCategory = async (categoryId) => {
    const { data } = await $host.post("api/category/:id", {
        id: categoryId,
    });
    return data;
};
