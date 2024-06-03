import { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const Pages = observer(() => {
    const { t } = useTranslation();
    const { page } = useContext(Context);
    const pageCount = Math.ceil(page.totalCount / page.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const onNext = () => {
        if (page.page < pageCount) {
            page.incrementPage();
        }
    };

    const onPrev = () => {
        if (page.page > 1) {
            page.decrementPage();
        }
    };

    return (
        <nav
            className="ms-4 flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 md:mb-2"
            aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                {t("Showing")} <span className="font-semibold text-gray-900 dark:text-white">1-{page.limit}</span>{" "}
                {t("of")} <span className="font-semibold text-gray-900 dark:text-white">{page.totalCount}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={onPrev}>
                        {t("Previous")}
                    </button>
                </li>
                {pages.map((el) => (
                    <li key={el} onClick={() => page.setPage(el)}>
                        <button
                            className={
                                page.page === el
                                    ? "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }>
                            {el}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={onNext}>
                        {t("Next")}
                    </button>
                </li>
            </ul>
        </nav>
    );
});

export default Pages;
