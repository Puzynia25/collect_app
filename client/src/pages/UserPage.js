import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCollections } from "../http/collectionAPI";
import ContentWrapper from "../components/ContentWrapper";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";
import { useTranslation } from "react-i18next";
import { Context } from "../utils/context";

const UserPage = observer(() => {
    const { t } = useTranslation();
    const { collection, user, page } = useContext(Context);
    const [collectionsByCategory, setCollectionsByCategory] = useState(collection.allCollections);
    const [onShowModal, setOnShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchAllCollections(null, id, null, 10)
            .then((data) => (collection.setAllCollections(data.rows), page.setTotalCount(data.count)))
            .finally(() => setLoading(false));
    }, [isEdit, id, page.page]);

    const setByCategory = () => {
        collection.selectedCategory.name !== "All"
            ? setCollectionsByCategory(
                  collection.allCollections.filter((el) => el.categoryId === collection.selectedCategory.id)
              )
            : setCollectionsByCategory(collection.allCollections);
    };

    useEffect(() => {
        setByCategory();
    }, [collection.selectedCategory]);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row my-2 md:my-9 bg-white border-gray-200 dark:bg-gray-900 dark:text-white">
            <CategoryBar />
            <ContentWrapper>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            {t("Collections")}
                        </h2>
                        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {collection.allCollections.length > 0 ? (
                                <>
                                    {t("Creator")}:{" "}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {collection.allCollections[0]?.user?.name}
                                    </span>
                                </>
                            ) : null}
                        </p>
                        <p className="hidden md:block mt-9 text-sm max-w-md text-gray-900 dark:text-gray-400">
                            {t(
                                "A list of all the collections in your account including their name, category and description"
                            )}
                        </p>
                    </div>
                    {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                        <button
                            type="button"
                            className="flex justify-between place-items-center place-self-end text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onShow}>
                            <svg
                                className="me-1 -ms-1 w-5 h-5 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                            {t("Add")} {t("collection")}
                        </button>
                    ) : null}
                </div>
                <CollectionList loading={loading} setIsEdit={setIsEdit} collections={collectionsByCategory} />
            </ContentWrapper>
            <CreateCollection show={onShowModal} onHide={() => onHide()} loading={loading} setLoading={setLoading} />
        </div>
    );
});

export default UserPage;
