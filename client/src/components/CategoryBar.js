const CategoryBar = () => {
    const categoriesList = ["Books", "Signs", "Vinyl", "Other"];
    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg">
                <h2 className="font-bold text-xl md:text-2xl mb-4">Category</h2>
                {categoriesList.map((category) => {
                    return (
                        <a
                            key={category}
                            href="#"
                            className="p-3 font-semibold hover:bg-indigo-50 rounded-2xl">
                            {category}
                        </a>
                    );
                })}
            </div>
        </aside>
    );
};

export default CategoryBar;
