export const tabTheme = {
    tablist: {
        tabitem: {
            base: "flex items-center justify-center rounded-t-3xl p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
            styles: {
                default: {
                    base: "rounded-t-3xl",
                    active: {
                        on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-600",
                        off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
                    },
                },

                pills: {
                    base: "",
                    active: {
                        on: "rounded-3xl bg-blue-100 text-gray-900",
                        off: "rounded-3xl hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
                    },
                },
            },
        },
    },
};
