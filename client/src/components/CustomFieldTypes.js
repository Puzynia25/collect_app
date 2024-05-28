import { Datepicker } from "flowbite-react";

export const CustomFieldTypes = ({ type, name, value, onChange, isReadOnly }) => {
    const customTheme = {
        popup: {
            footer: {
                button: {
                    base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300",
                    today: "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
                },
            },
        },
        views: {
            days: {
                items: {
                    item: {
                        selected: "bg-blue-700 text-white hover:bg-blue-600",
                    },
                },
            },
            months: {
                items: {
                    item: {
                        selected: "bg-blue-700 text-white hover:bg-blue-600",
                    },
                },
            },
            years: {
                items: {
                    base: "grid w-64 grid-cols-4",
                    item: {
                        selected: "bg-blue-700 text-white hover:bg-blue-600",
                    },
                },
            },
            decades: {
                items: {
                    item: {
                        selected: "bg-blue-700 text-white hover:bg-blue-600",
                    },
                },
            },
        },
    };

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
                        value={value}
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
                        placeholder="content..."
                        value={value}
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
                        placeholder="Write your content here..."
                        value={value}
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
                        checked={value === "true" ? true : false}
                        onChange={(e) => onChange(e.target.checked)}
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                        htmlFor="checkbox-input"
                        className="text-wrap truncate ... ms-4 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                        className="w-1/3 text-wrap truncate ... pr-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {name}
                    </label>

                    <div className="w-full">
                        <Datepicker
                            weekStart={1}
                            defaultDate={value ? new Date(value) : new Date()}
                            theme={customTheme}
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
