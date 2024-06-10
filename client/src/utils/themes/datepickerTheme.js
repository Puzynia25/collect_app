export const datepickerTheme = {
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
