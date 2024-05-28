const CollectionBar = ({ oneCollection }) => {
    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg">
                <div className="mt-2 px-2">
                    <img className="h-64 object-cover mx-auto" src={oneCollection.img} alt="" />
                    <div className="py-4 max-w-lg place-content-center">
                        <p className=" text-sm font-medium text-gray-900 dark:text-gray-300">
                            Creator:{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400">{oneCollection.user?.name}</span>
                        </p>
                        <p className="mt-4 text-sm font-medium content-end text-gray-500 dark:text-gray-400">
                            Collection:
                        </p>

                        <h2 className="font-bold text-xl uppercase tracking-wide md:text-2xl text-center mt-2 ">
                            "{oneCollection.name}"
                        </h2>
                        <p className="mt-6 text-sm text-gray-900 dark:text-gray-400">{oneCollection.description}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CollectionBar;
