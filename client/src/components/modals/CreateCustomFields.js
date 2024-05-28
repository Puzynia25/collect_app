import { useState } from "react";
import { createCustomFields } from "../../http/collectionAPI";

const CreateCustomFields = ({ show, onHide, loading, setLoading, customFields, setCustomFields, collections }) => {
    const availableTypes = [
        { value: "number", label: "Number", max: 3 },
        { value: "string", label: "String", max: 3 },
        { value: "text", label: "Text", max: 3 },
        { value: "checkbox", label: "Checkbox", max: 3 },
        { value: "date", label: "Date", max: 3 },
    ];

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [collectionId, setCollectionId] = useState("");

    const addField = () => {
        const currentTypeCount = customFields.filter((field) => field.type === type).length;
        const selectedType = availableTypes.find((el) => el.value === type);
        console.log();
        if (!selectedType) return alert("Please choose a type");
        if (selectedType && currentTypeCount < selectedType.max) {
            setCustomFields(() => [...customFields, { name, type, number: Date.now() }]);
            setName("");
            setType("");
        } else {
            alert(`You can only add up to ${selectedType.max} fields of type ${selectedType.label}`);
        }
    };

    const removeField = (number) => {
        setCustomFields(customFields.filter((el) => el.number !== number));
    };

    const addedTypes = (type, name) => {
        switch (type) {
            case "number": {
                return (
                    <>
                        <label
                            htmlFor="number-input"
                            className="text-wrap truncate ... w-1/3 pr-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {name}
                        </label>
                        <input
                            type="number"
                            id="number-input"
                            className="w-[208px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123..."
                            readOnly
                        />
                    </>
                );
            }
            case "string": {
                return (
                    <>
                        <label
                            htmlFor="string-input"
                            className="text-wrap truncate ... w-1/3 pr-2 block text-sm font-medium text-gray-900 dark:text-white">
                            {name}
                        </label>
                        <input
                            type="text"
                            className="w-[208px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="content"
                            readOnly
                        />
                    </>
                );
            }
            case "text": {
                return (
                    <>
                        <label
                            htmlFor="text-input"
                            className="text-wrap truncate ... w-1/3 pr-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {name}
                        </label>
                        <textarea
                            rows="3"
                            className="w-[208px] block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your content here..."
                            readOnly
                        />
                    </>
                );
            }
            case "checkbox": {
                return (
                    <>
                        <input
                            htmlFor="checkbox-input"
                            type="checkbox"
                            value=""
                            className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="w-full text-wrap truncate ... ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {name}
                        </label>
                    </>
                );
            }
            case "date": {
                return (
                    <>
                        <label
                            htmlFor="date-input"
                            className="text-wrap truncate ... w-1/3 pr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {name}
                        </label>
                        <div className="w-[208px] relative max-w-sm">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input
                                datepicker="true"
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Select date"
                                readOnly
                            />
                        </div>
                    </>
                );
            }
        }
    };

    const submitCustomFields = () => {
        setLoading(true);
        createCustomFields({ collectionId, customFields })
            .then((data) => setCustomFields([]), onHide())
            .finally(() => setLoading(false));
    };

    return (
        <div
            tabIndex="-1"
            aria-hidden="true"
            className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                show ? "block bg-black bg-opacity-50 duration-300" : "hidden"
            }`}>
            <div className="relative p-5 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">Create New Fields</h3>
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
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label
                                    htmlFor="field-type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Collection
                                </label>
                                <select
                                    id="field-type"
                                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={collectionId}
                                    onChange={(e) => setCollectionId(e.target.value)}>
                                    <option>Choose collection</option>
                                    {collections.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label
                                    htmlFor="field-type"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Field Type
                                </label>
                                <select
                                    id="field-type"
                                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}>
                                    <option>Select field type</option>
                                    {availableTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Field Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type collection name"
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
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"></path>
                                </svg>
                                Add field
                            </span>
                        </button>
                        {/* List of fields */}
                        <ul>
                            {customFields.map((field) => {
                                return (
                                    <li key={field.number} className="flex items-center my-4">
                                        {addedTypes(field.type, field.name)}
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
                                    </li>
                                );
                            })}
                        </ul>
                    </form>

                    <div className="text-right border-t p-4 md:p-5">
                        <button
                            onClick={submitCustomFields}
                            className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomFields;
