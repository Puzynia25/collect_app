import { USER_ROUTE } from "../utils/consts";
import Like from "./Like";

const ItemBar = ({ item, userId, fields }) => {
    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg">
                <div className=" dark:bg-gray-800 m-2">
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {item.name}
                        </h5>

                        <h5 className="mt-4 text-sm font-semibold tracking-tight text-gray-900 dark:text-white ">
                            Creator:{" "}
                            <a
                                href={USER_ROUTE + "/" + userId}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                {item.collection?.user.name}
                            </a>
                        </h5>

                        <div className="mt-9 w-1/3">
                            <Like like={item.like} userId={userId} />
                            {/* здесь будут кастомные поля */}
                            {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                5.0
                            </span> */}
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                $599
                            </span>
                            <a
                                href="#"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to cart
                            </a>
                        </div> */}
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
                    {fields.map((field) => {
                        return (
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
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default ItemBar;
