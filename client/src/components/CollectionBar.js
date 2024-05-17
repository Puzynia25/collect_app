import { Badge } from "react-bootstrap";

const CollectionBar = ({ collection, user }) => {
    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <Badge category={collection.oneCollection.category?.name} />

            <div className="flex mt-7">
                <img
                    className="h-80 object-cover rounded-lg"
                    src={process.env.REACT_APP_API_URL + collection.oneCollection.img}
                    alt=""
                />
                <div className="max-w-lg ml-9 place-content-center">
                    <p className="inline-block text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                        Collection:
                    </p>
                    <h2 className="ml-2 inline-block font-bold text-xl md:text-2xl ">
                        "{collection.oneCollection.name}"
                    </h2>

                    <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Author:{" "}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {user.userData.name}
                        </span>
                    </p>

                    <p className="mt-6 text-sm text-gray-900 dark:text-gray-400">
                        {collection.oneCollection.description}
                    </p>
                </div>
            </div>

            <div className="flex w-full mt-12">
                <div className="ms-2">
                    <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                        My items:
                    </h2>
                    <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                        A list of all the items in this collection including its name, category and
                        description.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default CollectionBar;
