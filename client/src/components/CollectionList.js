import { useContext, useEffect, useState } from "react";
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
import { Context } from "../utils/context";
import { SortIcon } from "../assets/svg/SortIcon";
import { Trash } from "../assets/svg/Trash";

const CollectionList = observer(({ collections, loading, setIsEdit }) => {
    const { t } = useTranslation();
    const { collection, user, page } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [onShowEditModal, setOnShowEditModal] = useState(false);
    const [currentCollectionId, setCurrentCollectionId] = useState(null);

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
                                    <SortIcon />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Description")}
                                    <SortIcon />
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
                                                        <Trash />
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
            {location.pathname !== MAIN_ROUTE ? <Pages page={page} /> : null}

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
