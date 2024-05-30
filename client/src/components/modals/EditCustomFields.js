import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { removeCustomField, updateCustomFieldsNames } from "../../http/customFieldAPI";

const EditCustomFields = ({ show, onHide, collectionId, fields, setFields }) => {
    const initialCustomFields = (fields) => {
        return fields.reduce((obj, field) => {
            obj[field.id] = field.name;
            return obj;
        }, {});
    };

    useEffect(() => {
        setFieldNames(initialCustomFields(fields));
        setCustomFields(fields);
    }, [fields, show]);

    const [fieldNames, setFieldNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldsId, setFieldsId] = useState([]);
    const [customFields, setCustomFields] = useState([]);

    const onHideError = () => {
        setError(false);
    };

    const onChangeValue = (id, name) => {
        setFieldNames((prev) => ({
            ...prev,
            [id]: name,
        }));
    };

    const updateFieldNames = () => {
        setLoading(true);
        const formattedNames = Object.keys(fieldNames).map((id) => ({ id: parseInt(id, 10), value: fieldNames[id] }));
        updateCustomFieldsNames(collectionId, formattedNames)
            .then(() => (setFields(fields.map((field) => ({ ...field, name: fieldNames[field.id] }))), onHide()))
            .catch((e) => (setErrorMessage(e.response.data.message), setError(true)))
            .finally(() => setLoading(false), (setErrorMessage("Fields successfully updated"), setError(true)));

        if (fieldsId.length > 0) {
            removeCustomField(fieldsId)
                .then(() => setFields(fields.filter((field) => !fieldsId.includes(field.id))))
                .catch((e) => (setErrorMessage("The field hasn't been deleted"), setError(true), console.log(e)));
        }
    };

    const removeField = (id) => {
        setFieldsId([...fieldsId, Number(id)]);
        setCustomFields(customFields.filter((field) => field.id !== id));
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                    show ? "block bg-black bg-opacity-50 duration-300" : "hidden"
                }`}>
                <div className="relative p-5 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Custom Fields
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onHide}>
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
                        {/* <!-- Modal body --> */}
                        <form className="p-4 md:p-7">
                            <ul>
                                {customFields?.map((field) => {
                                    return (
                                        <li key={field.id}>
                                            <label
                                                htmlFor="string-input"
                                                className="w-1/3  text-wrap truncate ... pr-2 block text-sm font-medium text-gray-600 dark:text-white">
                                                {field.type}
                                            </label>
                                            <div className="flex gap-4 items-center mt-1 mb-4">
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={fieldNames[field.id]}
                                                    onChange={(e) => onChangeValue(field.id, e.target.value)}
                                                />

                                                <div className="grow flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="px-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                        onClick={() => removeField(field.id)}>
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
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </form>
                        <div className="text-right border-t p-4 md:p-5 dark:border-gray-600">
                            <button
                                className="relative text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={updateFieldNames}
                                disabled={loading}>
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {errorModal}
        </>
    );
};

export default EditCustomFields;
