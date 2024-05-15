import { useContext } from "react";
import { Context } from "..";
import { COLLECTION_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const CollectionCards = observer(() => {
    const { collection } = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            <h2 className="font-bold text-xl md:text-2xl mt-24">The biggest collections</h2>
            <div className="flex flex-row gap-3 flex-nowrap w-full overflow-auto">
                {collection.allCollections.map((col) => {
                    return (
                        <div
                            key={col.id}
                            className="cursor-pointer min-w-[280px] bg-white border border-gray-200 rounded-3xl mt-2 md:mt-9 dark:bg-gray-800 dark:border-gray-700"
                            onClick={() => navigate(COLLECTION_ROUTE + "/" + col.id)}>
                            <img
                                className="rounded-t-3xl p-10 h-80 object-cover object-center mx-auto"
                                src={process.env.REACT_APP_API_URL + col.img}
                                alt={col.name}
                            />

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
        </>
    );
});

export default CollectionCards;
