import { useContext, useEffect, useState } from "react";
import Tags from "../components/Tags";
import { Context } from "../utils/context";
import CategoryBar from "../components/CategoryBar";
import ContentWrapper from "../components/ContentWrapper";
import { fetchAllCollections, fetchBiggest } from "../http/collectionAPI";
import { observer } from "mobx-react-lite";
import CollectionCards from "../components/CollectionCards";
import { fetchAllItems, fetchPopularTags } from "../http/itemAPI";
import Spinner from "../components/Spinner";
import { COLLECTION_ROUTE, USER_ROUTE } from "../utils/consts";
import Badge from "../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import CollectionList from "../components/CollectionList";
import Pages from "../components/Pages";
import { useTranslation } from "react-i18next";

const MainPage = observer(() => {
    const { t } = useTranslation();
    const { collection, item, page } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [biggestCollections, setBiggestCollections] = useState([]);
    const [itemsByCategory, setItemsByCategory] = useState(item.items);
    const [tags, setTags] = useState([]);
    const [toggleTable, setToggleTable] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllItems(null, page.page, page.limit)
            .then((data) => (item.setItems(data.rows), page.setTotalCount(data.count)))
            .then(() => setByCategory());
    }, [page.page]);

    useEffect(() => {
        Promise.race([
            fetchAllCollections().then((data) => collection.setAllCollections(data.rows)),
            fetchPopularTags().then((data) => setTags(data)),
            fetchAllItems(null, page.page, page.limit).then(
                (data) => (item.setItems(data.rows), page.setTotalCount(data.count))
            ),
            fetchBiggest().then((data) => setBiggestCollections(data)),
        ]).finally(() => setLoading(false));
    }, []);

    const setByCategory = () => {
        collection.selectedCategory.name !== "All"
            ? setItemsByCategory(item.items.filter((el) => el.collection.categoryId === collection.selectedCategory.id))
            : setItemsByCategory(item.items);
    };

    useEffect(() => {
        setByCategory();
    }, [collection.selectedCategory]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row mt-4 md:mt-9 bg-white dark:bg-gray-900 dark:text-white">
            <CategoryBar />
            <ContentWrapper>
                <h1 className="font-bold text-xl md:text-2xl mt-4 mb-7">{t("Recently Added")}</h1>
                {/* the latest items */}
                <div className="px-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 md:my-4 md:mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        {t("Name")}
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            {t("Category")}
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            {t("Collection")}
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            {t("Creator")}
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsByCategory.length > 0 ? (
                                    itemsByCategory.map((el) => {
                                        return (
                                            <tr
                                                key={el.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="text-balance px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <button
                                                        className="hover:underline text-left"
                                                        onClick={() =>
                                                            navigate(
                                                                `${COLLECTION_ROUTE}/${el.collectionId}/item/` + el.id
                                                            )
                                                        }>
                                                        {el.name.length > 35 ? el.name.slice(0, 35) + "..." : el.name}
                                                    </button>
                                                </th>
                                                <td className="px-6 py-4">
                                                    <Badge category={el.collection?.category.name} />
                                                </td>
                                                <td className="text-balance px-6 py-4 ">
                                                    <button
                                                        className="hover:underline"
                                                        onClick={() =>
                                                            navigate(COLLECTION_ROUTE + "/" + el.collection?.id)
                                                        }>
                                                        {el.collection?.name.length > 20
                                                            ? el.collection?.name.slice(0, 20) + "..."
                                                            : el.collection?.name}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-balance">
                                                    <button
                                                        className="hover:underline"
                                                        onClick={() =>
                                                            navigate(USER_ROUTE + "/" + el.collection?.user.id)
                                                        }>
                                                        {el.collection?.user.name}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="w-full">
                                        <td className="p-5" colSpan={7}>
                                            {t("There is no any items in this category")}...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pages page={page} />

                {/* 5 the biggest collections */}
                <div className="flex justify-between mt-24 mb-4 md:mb-9">
                    <h2 className="font-bold text-xl md:text-2xl">{t("The biggest collections")}</h2>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setToggleTable(!toggleTable)}>
                        {t("Table view")}
                    </button>
                </div>
                {toggleTable ? (
                    <CollectionList collections={biggestCollections} />
                ) : (
                    <CollectionCards collections={biggestCollections} />
                )}
                <Tags tags={tags} />
            </ContentWrapper>
        </div>
    );
});

export default MainPage;
