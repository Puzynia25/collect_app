import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Spinner from "../Spinner";
import ErrorMessage from "./ErrorMessage";
import { fetchAllItems, fetchOneItem, updateItem } from "../../http/itemAPI";
import CustomFieldTypes from "../CustomFieldTypes";
import { fetchAllCustomFields, updateCustomFieldsValues } from "../../http/customFieldAPI";
import { useTranslation } from "react-i18next";
import { Context } from "../../utils/context";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";

const EditItem = observer(({ show, onHide, itemId, fields, setFields, collectionId }) => {
    const { t } = useTranslation();
    const { item } = useContext(Context);
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [fieldValues, setFieldValues] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    useEffect(() => {
        setLoading(true);
        if (itemId) {
            fetchOneItem(itemId)
                .then((data) => initialValues(data))
                .finally(() => setLoading(false));
        }
        setCustomFields(fields);
        setFieldValues(initialCustomFields(fields));
    }, [itemId]);

    const initialValues = (data) => {
        setName(data.name);
        setTags(data.tags);
    };

    const initialCustomFields = (fields) => {
        return fields.reduce((obj, field) => {
            obj[field.id] =
                field.values[0]?.value ?? (field.type === "checkbox" ? false : field.type === "date" ? new Date() : "");
            return obj;
        }, {});
    };

    const onChangeValue = (id, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const editItem = (e) => {
        e.preventDefault();
        setLoadingEdit(true);

        const formattedTags = Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim().toLowerCase());
        const formattedValues = Object.keys(fieldValues).map((id) => ({
            id,
            value: fieldValues[id],
        }));

        Promise.all([
            updateItem({ name, tags: formattedTags, itemId }).catch(
                (e) => (setErrorMessage(t("The item has not been edited, please try again")), setError(true))
            ),

            updateCustomFieldsValues(collectionId, { itemId, customFields: formattedValues }).catch(
                (e) => (
                    setErrorMessage(t("Failed to update the item")),
                    setError(true),
                    console.log(e.response.data.message)
                )
            ),
        ]).then(
            () =>
                fetchAllCustomFields(collectionId)
                    .then((data) => setFields(data))
                    .then(() => fetchAllItems(collectionId).then((data) => item.setItems(data.rows))),
            setLoadingEdit(false),
            onHide()
        );
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                    show ? "block bg-black bg-opacity-50 duration-300 min-h-screen" : "hidden"
                }`}>
                <div className="relative p-5 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {t("Edit item")}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onHide}>
                                <XMarkIcon className="h-6 w-6" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form className="p-4 md:p-7" onSubmit={editItem}>
                            {!loading ? (
                                <>
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {t("Name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required=""
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label
                                                htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {t("Tags")}
                                            </label>

                                            <textarea
                                                id="description"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            {" "}
                                            <ul>
                                                {customFields?.map((field) => {
                                                    return (
                                                        <li key={field.id} className="my-4">
                                                            <CustomFieldTypes
                                                                type={field.type}
                                                                name={field.name}
                                                                isReadOnly={false}
                                                                value={fieldValues[field.id]}
                                                                onChange={(e) => onChangeValue(field.id, e)}
                                                            />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    {!loadingEdit ? (
                                        <button
                                            type="submit"
                                            className="relative text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <PencilSquareIcon className="me-1 -ms-1 -mt-0.5 w-4 h-4 text-white" />
                                            <p> {t("Edit item")}</p>
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            {t("Loading")}...
                                        </button>
                                    )}
                                </>
                            ) : (
                                <Spinner />
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {errorModal}
        </>
    );
});

export default EditItem;
