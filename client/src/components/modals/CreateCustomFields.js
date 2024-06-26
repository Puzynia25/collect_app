import { useState } from "react";
import { createCustomFields, fetchAllCustomFields } from "../../http/customFieldAPI";
import CustomFieldTypes from "../CustomFieldTypes";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";

const CreateCustomFields = ({ show, onHide, collectionId, setFields }) => {
    const { t } = useTranslation();
    const availableTypes = [
        { value: "number", label: "Number" },
        { value: "string", label: "String" },
        { value: "text", label: "Text" },
        { value: "checkbox", label: "Checkbox" },
        { value: "date", label: "Date" },
    ];

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [customFields, setCustomFields] = useState([]);

    const onHideError = () => {
        setError(false);
    };

    const addField = () => {
        const selectedType = availableTypes.find((el) => el.value === type);
        if (!selectedType) return setErrorMessage(t("Please choose a type")), setError(true);
        if (selectedType) {
            setCustomFields(() => [...customFields, { name, type, number: Date.now() }]);
            setName("");
            setType("");
        } else {
            setError(true);
        }
    };

    const removeField = (number) => {
        setCustomFields(customFields.filter((el) => el.number !== number));
    };

    const submitCustomFields = () => {
        setLoading(true);

        createCustomFields(collectionId, customFields)
            .then(() => setCustomFields([]), onHide(), setErrorMessage(t("Fields successfully added!")), setError(true))
            .then(() => fetchAllCustomFields(collectionId).then((data) => setFields(data)))
            .catch((e) => console.log(e), setCustomFields([]))
            .finally(() => setLoading(false));
        console.log("create");
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
                                {t("Create New Fields")}
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
                        <form className="p-4 md:p-7">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="field-type"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Field Type")}
                                    </label>
                                    <select
                                        id="field-type"
                                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}>
                                        <option>{t("Select field type")}</option>
                                        {availableTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {t(type.label)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Field Name")}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={t("Type collection name")}
                                        required=""
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                className="mt-6 flex justify-between place-items-center place-self-end p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={(e) => {
                                    return e.preventDefault(), addField();
                                }}>
                                <span className="flex text-sm ps-4 pr-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <PlusIcon className="me-1 -ms-1 w-4 h-4" />
                                    {t("Add field")}
                                </span>
                            </button>
                            {/* List of fields */}
                            <ul>
                                {customFields?.map((field) => {
                                    return (
                                        <li key={field.number} className="flex items-center my-4">
                                            <CustomFieldTypes type={field.type} name={field.name} isReadOnly={true} />

                                            <div className="grow flex justify-end">
                                                <button
                                                    type="button"
                                                    className="ms-2 px-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => removeField(field.number)}>
                                                    <svg
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 14">
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </form>

                        <div className="text-right border-t p-4 md:p-5 dark:border-gray-600">
                            <button
                                onClick={submitCustomFields}
                                className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={loading}>
                                <p>{t("Submit")}</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {errorModal}
        </>
    );
};

export default CreateCustomFields;
