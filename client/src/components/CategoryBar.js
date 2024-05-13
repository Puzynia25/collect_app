import { useContext } from "react";
import { Context } from "..";
import { NavLink } from "react-router-dom";
import { MAIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const CategoryBar = observer(() => {
    const categoriesList = ["Books", "Signs", "Vinyl", "Other"];
    const { collection } = useContext(Context);

    return (
        <aside className="hidden md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky top-0 flex flex-col gap-2 p-5 border md:rounded-3xl md:shadow-lg">
                <h2 className="font-bold text-xl md:text-2xl mb-4">Category</h2>
                {categoriesList.map((category) => {
                    return (
                        <div
                            key={category}
                            className={
                                category === collection.selectedCategory
                                    ? "cursor-pointer p-3 font-bold text-lg hover:bg-indigo-50 rounded-2xl transition-all duration-300"
                                    : "cursor-pointer p-3 font-semibold hover:bg-indigo-50 rounded-2xl transition-all duration-300"
                            }
                            onClick={() => collection.setSelectedCategory(category)}>
                            {category}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
});

export default CategoryBar;
