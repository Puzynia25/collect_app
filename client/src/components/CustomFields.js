import { useState } from "react";
import CustomFieldTypes from "./CustomFieldTypes";
import { updateCustomFields } from "../http/customFieldAPI";

const CustomFields = ({ fields, onUpdateValue, isButton, fieldValues, setFieldValues, isReadOnly }) => {
    const onChangeValue = (id, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div>
            {/* <h5 className="mt-4 text-md font-semibold tracking-tight text-gray-900 dark:text-white ">
                You can change the values below:
            </h5> */}
            <ul className="my-7">
                {fields.map((field) => {
                    return (
                        <li key={field.id} className="mt-4">
                            <CustomFieldTypes
                                type={field.type}
                                name={field.name}
                                isReadOnly={isReadOnly}
                                value={fieldValues[field.id]}
                                onChange={(value) => onChangeValue(field.id, value)}
                            />
                        </li>
                    );
                })}
            </ul>
            {isButton ? (
                <button
                    onClick={() => onUpdateValue(fieldValues)}
                    className="mt-9 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <p>Save</p>
                </button>
            ) : null}
        </div>
    );
};

export default CustomFields;
