import { useContext, useEffect, useState } from "react";
import Tags from "../components/Tags";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import ContentWrapper from "../components/ContentWrapper";
import { NavLink, useNavigate } from "react-router-dom";
import { COLLECTION_ROUTE, ITEM_ROUTE } from "../utils/consts";
import { fetchCategoriesList, fetchCollectionsList } from "../http/collectionAPI";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
    const { item, collection } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoriesList().then((data) => collection.setCategoriesList(data));
        fetchCollectionsList().then((data) => collection.setCollectionsList(data.rows));
    }, []);

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            {/* <!-- sticky sidebar --> */}
            <CategoryBar />
            <ContentWrapper>
                {/* <!-- content --> */}
                <h1 className="font-bold text-xl md:text-2xl my-4">Recently Added</h1>
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 md:my-9">
                        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Author
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
                                            Collection
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
                                            Tags
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
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.items.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <NavLink
                                                    to={ITEM_ROUTE + "/" + item.id}
                                                    className="hover:underline">
                                                    {item.name}
                                                </NavLink>
                                            </th>
                                            <td className="px-6 py-4">Silver</td>
                                            <td className="px-6 py-4">Laptop</td>
                                            <td className="px-6 py-4">
                                                {item.tags.map((tag, i) => {
                                                    return (
                                                        <button
                                                            key={i}
                                                            className="m-1 px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                                                            {tag}
                                                        </button>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5 the biggest collections */}
                <h2 className="font-bold text-xl md:text-2xl mt-24">The biggest collections</h2>
                <div className="flex flex-row gap-3 flex-nowrap w-full overflow-auto">
                    {collection.collectionsList.map((col) => {
                        return (
                            <div
                                key={col.id}
                                className=" min-w-[280px] bg-white border border-gray-200 rounded-3xl mt-2 md:mt-9 dark:bg-gray-800 dark:border-gray-700"
                                onClick={() => navigate(COLLECTION_ROUTE + "/" + col.id)}>
                                <a href={process.env.REACT_APP_API_URL + col.img}>
                                    <img
                                        className="rounded-t-3xl p-10 h-80 object-cover mx-auto"
                                        src={col.img}
                                        alt={col.name}
                                    />
                                </a>
                                <div className="pb-5 px-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {col.name}
                                        </h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {col.description}
                                    </p>
                                    <a href="#">
                                        <h5 className="mb-3 font-semibold text-gray-900 dark:text-gray-400">
                                            Category:{" "}
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {col.categoryId}
                                            </span>
                                        </h5>
                                    </a>
                                    <a
                                        href={COLLECTION_ROUTE + "/" + col.id}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg
                                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Tags />
            </ContentWrapper>
        </div>
    );
});

export default MainPage;
