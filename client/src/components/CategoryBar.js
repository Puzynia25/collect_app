import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { fetchAllCategories } from "../http/collectionAPI";
import { useTranslation } from "react-i18next";
import { Context } from "../utils/context";

const CategoryBar = observer(() => {
    const { t } = useTranslation();
    const { collection } = useContext(Context);

    useEffect(() => {
        fetchAllCategories().then((categories) => {
            collection.setAllCategories([{ id: 0, name: "All" }, ...categories]);
            collection.setSelectedCategory(collection.allCategories[0]);
        });
    }, []);

    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                <h2 className="font-bold text-xl md:text-2xl ms-2 mb-4">{t("Category")}</h2>
                {collection.allCategories.length > 0
                    ? collection.allCategories.map((category) => {
                          return (
                              <div
                                  key={category.id}
                                  className={
                                      category.name === collection.selectedCategory.name
                                          ? "cursor-pointer p-3 font-bold text-lg hover:bg-indigo-50 rounded-2xl transition-all duration-300 dark:hover:bg-indigo-500"
                                          : "cursor-pointer p-3 font-semibold hover:bg-indigo-50 rounded-2xl transition-all duration-300 dark:hover:bg-indigo-500"
                                  }
                                  onClick={() => collection.setSelectedCategory(category)}>
                                  {t(category.name)}
                              </div>
                          );
                      })
                    : null}
            </div>
        </aside>
    );
});

export default CategoryBar;
