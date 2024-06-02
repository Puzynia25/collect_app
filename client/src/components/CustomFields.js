import { useContext } from "react";
import CustomFieldTypes from "./CustomFieldTypes";
import { Context } from "..";

const CustomFields = ({ fields, onUpdateValue, isButton, fieldValues, setFieldValues, isReadOnly, userId }) => {
    const { user } = useContext(Context);

    const onChangeValue = (id, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div>
            <ul className="my-7">
                {fields.map((field) => {
                    return (
                        <li key={field.id} className="mt-4 md:w-1/3">
                            <CustomFieldTypes
                                type={field.type}
                                name={field.name}
                                isReadOnly={isReadOnly}
                                value={fieldValues ? fieldValues[field.id] : ""}
                                onChange={(value) => onChangeValue(field.id, value)}
                            />
                        </li>
                    );
                })}
            </ul>
            {isButton && (user.userData.id === userId || user.userData.role === "ADMIN") ? (
                <button
                    onClick={() => onUpdateValue(fieldValues)}
                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <p>Save</p>
                </button>
            ) : null}
        </div>
    );
};

export default CustomFields;
