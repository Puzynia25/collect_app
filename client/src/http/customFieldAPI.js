import { $authHost, $host } from ".";

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

export const updateCustomFields = async (collectionId, customFields) => {
    const { data } = await $authHost.patch("api/collection/" + collectionId + "/custom-fields", customFields);
    return data;
};
