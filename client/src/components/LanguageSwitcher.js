import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "en");

    const changeLanguage = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng.toLowerCase());
        setLang(lng.toLowerCase());
    };

    useEffect(() => {
        setLang(localStorage.getItem("i18nextLng") || "en");
    }, []);

    return (
        <form className="max-w-sm mr-5">
            <select
                id="countries_disabled"
                value={lang}
                className="mr-4 mx-2 mt-4 md:mt-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => changeLanguage(e)}>
                <option value="en">EN</option>
                <option value="pl">PL</option>
            </select>
        </form>
    );
};

export default LanguageSwitcher;
