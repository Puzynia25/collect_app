import { useContext } from "react";
import { Context } from "..";
import { COLLECTION_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import Badge from "./Badge";

const CollectionCards = ({ collections }) => {
    return (
        <>
            <h2 className="font-bold text-xl md:text-2xl mt-24">The biggest collections</h2>
            <div className="flex flex-row gap-3 flex-nowrap w-full overflow-auto">
                {collections.map((col) => {
                    return (
                        <div
                            key={col.id}
                            className="cursor-pointer flex flex-col justify-between min-w-[280px] bg-white border border-gray-200 rounded-3xl mt-2 md:mt-9 dark:bg-gray-800 dark:border-gray-700">
                            <a href={COLLECTION_ROUTE + "/" + col.id}>
                                <img
                                    className="rounded-t-3xl p-10 h-80 object-cover object-center mx-auto"
                                    src={col.img}
                                    alt={col.name}
                                />

                                <div className="pb-5 px-5">
                                    <h5 className="mb-3 font-semibold text-gray-900 dark:text-gray-400">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            <Badge category={col.category.name} />
                                        </span>
                                    </h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {col.name.length > 60
                                            ? col.name.slice(0, 20) + "..."
                                            : col.name}
                                    </h5>
                                    <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Author:{" "}
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {col.user.name}
                                        </span>
                                    </p>
                                    <p className="mt-7 mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {col.description
                                            ? col.description.slice(0, 115) + "..."
                                            : "There is no description about this collection..."}
                                    </p>
                                </div>
                            </a>
                            <div className="pb-5 px-5">
                                <div
                                    className="inline-flex items-center px-3 py-2 text-sm
                                    font-medium text-center text-white bg-blue-700 rounded-lg
                                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                                    dark:focus:ring-blue-800">
                                    {" "}
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
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CollectionCards;
