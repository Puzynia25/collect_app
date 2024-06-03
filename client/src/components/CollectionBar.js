import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../utils/consts";
import { renderMarkdown } from "../utils/renderMarkdown";
import { useTranslation } from "react-i18next";

const CollectionBar = ({ oneCollection }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <aside className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border dark:border-gray-600 rounded-3xl shadow-lg mx-4 md:mx-0">
                <div className="mt-2 px-2">
                    <img className="h-64 object-cover mx-auto" src={oneCollection.img} alt="collection-img" />
                    <div className="py-4 max-w-lg place-content-center">
                        <p className=" text-sm font-medium text-gray-900 dark:text-gray-300">
                            {t("Creator")}:{" "}
                            <button
                                className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
                                onClick={() => navigate(USER_ROUTE + "/" + oneCollection?.userId)}>
                                {oneCollection.user?.name}
                            </button>
                        </p>
                        <p className="mt-4 text-sm font-medium content-end text-gray-500 dark:text-gray-400">
                            {t("Collection")}:
                        </p>

                        <h2 className="font-bold text-xl uppercase tracking-wide md:text-2xl text-center mt-2 ">
                            "{oneCollection.name}"
                        </h2>
                        <div className="mt-6 text-sm text-gray-900 dark:text-gray-400 markdownContent">
                            <div dangerouslySetInnerHTML={renderMarkdown(oneCollection.description)} />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CollectionBar;
