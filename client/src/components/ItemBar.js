import { useNavigate } from "react-router-dom";
import { COLLECTION_ROUTE, USER_ROUTE } from "../utils/consts";
import Like from "./Like";

const ItemBar = ({ item, userId }) => {
    const navigate = useNavigate();

    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg">
                <div className="dark:bg-gray-800 m-2">
                    <div>
                        <button onClick={() => navigate(COLLECTION_ROUTE + "/" + item.collectionId)}>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
                                {item.name}
                            </h5>
                        </button>

                        <h5 className="mt-4 text-sm font-semibold tracking-tight text-gray-900 dark:text-white ">
                            Creator:{" "}
                            <button
                                onClick={() => navigate(USER_ROUTE + "/" + userId)}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                {item.collection?.user.name}
                            </button>
                        </h5>

                        <div className="mt-9 w-1/3">
                            <Like like={item.like} userId={userId} />
                            {/* Badges: */}
                            {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                       5.0
                                    </span> */}
                        </div>
                    </div>
                    <div className="mt-9">
                        <h2 className="font-bold text-xl md:text-2xl mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2 max-w-sm mx-auto my-4 text-sm">
                            {item.tags?.map((el, i) => {
                                return (
                                    <button
                                        key={i}
                                        className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                                        {el}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ItemBar;
