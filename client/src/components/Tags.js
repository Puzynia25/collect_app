import { useTranslation } from "react-i18next";

const Tags = ({ tags }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="flex flex-row flex-nowrap items-center mt-24">
                <span className="flex-grow block border-t border-black dark:border-gray-600" />
                <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-3xl leading-none font-medium bg-black text-white dark:bg-gray-100 dark:text-black">
                    {t("Popular Tags")}
                </span>
                <span className="flex-grow block border-t border-black dark:border-gray-600" />
            </h2>

            <div className="flex justify-center flex-wrap gap-2 p-4 max-w-sm mx-auto m-4 text-sm">
                {tags.length > 0
                    ? tags.map((el, i) => {
                          return (
                              <button
                                  key={i}
                                  className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300">
                                  {el}
                              </button>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Tags;
