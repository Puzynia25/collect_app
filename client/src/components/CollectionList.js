import { useContext } from "react";
import { Context } from "..";
import { COLLECTION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const CollectionList = observer(({ onShow }) => {
    const { collection } = useContext(Context);

    return (
        <>
            <div className="mt-4">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            My collections:
                        </h2>
                        <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                            A list of all the collections in your account including their name,
                            category and description.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex justify-between place-items-center gap-2 place-self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={onShow}>
                        <svg
                            className="w-[15px] h-[15px] text-white dark:text-gray-800"
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
                                strokeWidth="3"
                                d="M5 12h14m-7 7V5"
                            />
                        </svg>
                        Add collection
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 md:mb-24 md:mt-9">
                    <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    name
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
                                        description
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
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {collection.userCollectionList.map((el) => {
                                return (
                                    <tr
                                        key={el.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-14 w-14">
                                                    <img
                                                        className="h-14 w-14 rounded-lg object-cover"
                                                        src={process.env.REACT_APP_API_URL + el.img}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    {/* prettier-ignore */}
                                                    <a
                                                            href={COLLECTION_ROUTE + '/' + el.id}
                                                            className="text-sm font-medium text-gray-900 hover:underline"
                                                            >
                                                            {el.name}
                                                        </a>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">books</td>
                                        <td className="px-6 py-4  max-w-md">{el.description}</td>
                                        <td className="px-3 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right content-center">
                                            <button>
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
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
});

export default CollectionList;
