import { useContext, useEffect, useState } from "react";
import { COLLECTION_ROUTE, ITEM_ROUTE, MAIN_ROUTE, USER_ROUTE } from "../utils/consts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import Badge from "./Badge";
import { observer } from "mobx-react-lite";
import { removeOne } from "../http/itemAPI";
import { fetchAllCustomFields } from "../http/collectionAPI";

const ItemList = observer(() => {
    const { collection, item } = useContext(Context);
    const { pathname } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemsByCategory, setItemsByCategory] = useState(item.items);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (pathname !== MAIN_ROUTE) {
            fetchAllCustomFields(id)
                .then((data) => setFields(data))
                .finally(() => console.log(fields));
        }
    }, []);

    useEffect(() => {
        if (pathname === MAIN_ROUTE) {
            collection.selectedCategory.name !== "All"
                ? setItemsByCategory(
                      item.items.filter((el) => el.collection.categoryId === collection.selectedCategory.id)
                  )
                : setItemsByCategory(item.items);
        }
    }, [collection.selectedCategory]);

    const onDeleteItem = (itemId) => {
        removeOne(itemId)
            .then(() => setItemsByCategory(itemsByCategory.filter((el) => el.id !== itemId)))
            .catch((err) => console.log(err));
    };

    return (
        <div className="px-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 md:my-4 md:mb-12">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
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
                                    Creator
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
                                    Category
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
                            {fields.map((field) => {
                                if (field.type === "string" || field.type === "date") {
                                    return (
                                        <th key={field.id} scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                {field.name}
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
                                    );
                                }
                            })}
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsByCategory.length > 0 ? (
                            itemsByCategory.map((el) => {
                                return (
                                    <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="text-balance max-w-[140px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button
                                                className="hover:underline text-left"
                                                onClick={() => navigate(ITEM_ROUTE + "/" + el.id)}>
                                                {el.name.length > 25 ? el.name.slice(0, 25) + "..." : el.name}
                                            </button>
                                        </th>
                                        <td className="text-balance max-w-[140px] px-6 py-4 ">
                                            <button
                                                className="hover:underline"
                                                onClick={() => navigate(COLLECTION_ROUTE + "/" + el.collection?.id)}>
                                                {el.collection?.name.length > 20
                                                    ? el.collection?.name.slice(0, 20) + "..."
                                                    : el.collection?.name}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-balance max-w-[140px]">
                                            <button
                                                className="hover:underline"
                                                onClick={() => navigate(USER_ROUTE + "/" + el.collection?.user.id)}>
                                                {el.collection?.user.name}
                                            </button>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge category={el.collection?.category.name} />
                                        </td>
                                        <td className=" text-wrap  px-6 py-4 max-w-36">
                                            {el.tags
                                                ? el.tags.map((tag, i) => {
                                                      return (
                                                          <button
                                                              key={i}
                                                              className="m-1 px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                                                              {tag.length > 15 ? tag.slice(0, 15) + "..." : tag}
                                                          </button>
                                                      );
                                                  })
                                                : ""}
                                        </td>
                                        {fields.map((field) => {
                                            if (field.type === "string" || field.type === "date") {
                                                return (
                                                    <td key={field.id} className=" text-wrap  px-6 py-4 max-w-36">
                                                        {field.name}
                                                    </td>
                                                );
                                            }
                                        })}
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right content-center">
                                            <button onClick={() => onDeleteItem(el.id)}>
                                                <span className="sr-only">Delete</span>
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
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="w-full">
                                <td className="p-5" colSpan={7}>
                                    There is no any items in this category...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default ItemList;
