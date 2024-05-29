import { useState } from "react";
import CustomFieldTypes from "./CustomFieldTypes";
import { updateCustomFields } from "../http/customFieldAPI";

const CustomFields = ({ fields, collectionId }) => {
    const initialValues = () => {
        return fields.reduce((obj, field) => {
            obj[field.id] =
                field.values[0].value ?? (field.type === "checkbox" ? false : field.type === "date" ? new Date() : "");
            return obj;
        }, {});
    };
    const [fieldValues, setFieldValues] = useState(initialValues);

    const onChangeValue = (id, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const onUpdateValue = () => {
        const validateData = Object.keys(fieldValues).map((id) => ({ id: parseInt(id, 10), value: fieldValues[id] }));
        updateCustomFields(collectionId, validateData)
            .then(() => alert("Fields updated successfully"))
            .catch((e) => alert(e.response.data.message));
    };

    return (
        <div className="mt-9 mx-4">
            {/* <h5 className="mt-4 text-md font-semibold tracking-tight text-gray-900 dark:text-white ">
                You can change the values below:
            </h5> */}
            <ul className="mt-9">
                {fields.map((field) => {
                    return (
                        <li key={field.id} className="mt-4 w-1/3">
                            <CustomFieldTypes
                                type={field.type}
                                name={field.name}
                                isReadOnly={false}
                                value={fieldValues[field.id]}
                                onChange={(value) => onChangeValue(field.id, value)}
                            />
                        </li>
                    );
                })}
            </ul>
            <button
                onClick={onUpdateValue}
                className="mt-9 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <p>Save</p>
            </button>
        </div>
    );
};

export default CustomFields;
