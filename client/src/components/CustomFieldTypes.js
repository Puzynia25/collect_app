import { Datepicker } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { datepickerTheme } from "../utils/themes/datepickerTheme";

export const CustomFieldTypes = ({ type, name, value, onChange, isReadOnly }) => {
    const { t } = useTranslation();

    switch (type) {
        case "number": {
            return (
                <>
                    <label
                        htmlFor="number-input"
                        className="w-1/3 text-wrap truncate ... pr-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                    </label>
                    <input
                        type="number"
                        id="number-input"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123..."
                        value={value || 0}
                        onChange={(e) => onChange(+e.target.value)}
                        readOnly={isReadOnly}
                    />
                </>
            );
        }
        case "string": {
            return (
                <>
                    <label
                        htmlFor="string-input"
                        className="w-1/3 text-wrap truncate ... pr-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                    </label>
                    <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("content...")}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        readOnly={isReadOnly}
                    />
                </>
            );
        }
        case "text": {
            return (
                <>
                    <label
                        htmlFor="text-input"
                        className="w-1/3 text-wrap truncate ... pr-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                    </label>
                    <textarea
                        rows="3"
                        className="w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("Write your content here...")}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        readOnly={isReadOnly}
                    />
                </>
            );
        }
        case "checkbox": {
            return (
                <>
                    <input
                        type="checkbox"
                        checked={Boolean(value === "true" || value === true)}
                        onChange={(e) => onChange(e.target.checked)}
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor="checkbox-input"
                        className="text-wrap truncate ... ms-4 text-sm font-medium text-gray-900 dark:text-white">
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
                        className="w-1/3 text-wrap truncate ... pr-2 text-sm font-medium text-gray-900 dark:text-white">
                        {name}
                    </label>
                    <div className="w-full mt-2">
                        <Datepicker
                            weekStart={1}
                            defaultDate={value ? new Date(value) : new Date()}
                            theme={datepickerTheme}
                            disabled={isReadOnly}
                            onSelectedDateChanged={(e) => onChange(e)}
                        />
                    </div>
                </>
            );
        }
        default:
            return null;
    }
};

export default CustomFieldTypes;
