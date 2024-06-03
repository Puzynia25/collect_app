import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { COLLECTION_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import Badge from "./Badge";
import { fetchAllCollections, removeOneCollection } from "../http/collectionAPI";
import Spinner from "./Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditCollection from "./modals/EditCollection";
import { renderMarkdown } from "../utils/renderMarkdown";
import Pages from "./Pages";
import { useTranslation } from "react-i18next";

const CollectionList = observer(({ collections, loading, setIsEdit }) => {
    const { t } = useTranslation();
    const { collection, user, page } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [onShowEditModal, setOnShowEditModal] = useState(false);
    const [currentCollectionId, setCurrentCollectionId] = useState(null);

    console.log(collections);

    useEffect(() => {
        fetchAllCollections(null, id, page.page, page.limit)
            .then((data) => (collection.setAllCollections(data.rows), page.setTotalCount(data.count)))
            .catch((e) => console.log(e));
    }, [page.page]);

    const onDelete = (id) => {
        removeOneCollection(id)
            .then(() => collection.setAllCollections(collection.allCollections.filter((el) => el.id !== id)))
            .catch((err) => console.log(err));
    };

    const onShowEdit = (id) => {
        setOnShowEditModal(true);
        setCurrentCollectionId(id);
    };
    const onHideEdit = () => {
        setOnShowEditModal(false);
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 md:mb-4 mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t("name")}
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Category")}
                                    <svg
                                        className="w-3 h-3 ms-1.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Description")}
                                    <svg
                                        className="w-3 h-3 ms-1.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg>
                                </div>
                            </th>
                            {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5">
                                    <Spinner />
                                </td>
                            </tr>
                        ) : collections.length > 0 ? (
                            collections.map((el) => {
                                return (
                                    <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-14 w-14">
                                                    <img
                                                        className="h-14 w-14 rounded-lg object-cover"
                                                        src={el.img}
                                                        alt="img-collection"
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <button
                                                        className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-400"
                                                        onClick={() => navigate(COLLECTION_ROUTE + "/" + el.id)}>
                                                        {el.name.length > 25 ? el.name.slice(0, 25) + "..." : el.name}
                                                    </button>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge category={el.category?.name} />
                                        </td>
                                        <td className="px-6 py-4 max-w-sm markdownContent">
                                            {el.description.length > 0 ? (
                                                <div
                                                    dangerouslySetInnerHTML={renderMarkdown(
                                                        el.description.length > 55
                                                            ? el.description.slice(0, 55) + "..."
                                                            : el.description
                                                    )}
                                                />
                                            ) : (
                                                "There is no description..."
                                            )}
                                        </td>
                                        {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                                            <>
                                                <td className="px-3 py-4 text-right">
                                                    <button
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        onClick={() => onShowEdit(el.id)}>
                                                        {t("Edit")}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right content-center">
                                                    <button onClick={() => onDelete(el.id)}>
                                                        <svg
                                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="none"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.3"
                                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </>
                                        ) : null}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="w-full">
                                <td className="p-5" colSpan={5}>
                                    There is no any collection in this category...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {location.pathname !== MAIN_ROUTE ? <Pages /> : null}

            <EditCollection
                show={onShowEditModal}
                onHide={() => onHideEdit()}
                collectionId={currentCollectionId}
                setIsEdit={setIsEdit}
            />
        </>
    );
});

export default CollectionList;
