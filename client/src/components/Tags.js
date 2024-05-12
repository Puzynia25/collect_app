import { useContext } from "react";
import { Context } from "..";

const Tags = () => {
    const { item } = useContext(Context);
    return (
        <div>
            <div>
                <h2 className="flex flex-row flex-nowrap items-center mt-24">
                    <span className="flex-grow block border-t border-black"></span>
                    <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded-3xl leading-none font-medium bg-black text-white">
                        Popular Tags
                    </span>
                    <span className="flex-grow block border-t border-black"></span>
                </h2>

                <div className="flex justify-center flex-wrap gap-2 p-4 max-w-sm mx-auto my-4 text-sm">
                    {item.items[0].tags.map((el, i) => {
                        return (
                            <button
                                key={i}
                                className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                                {el}
                            </button>
                        );
                    })}
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Travel
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Food
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Art
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Music
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Technology
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Photography
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Sports
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Fashion
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        History
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Nature
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Health
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Nurition
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Education
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Fitness
                    </button>
                    <button className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                        Business
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tags;
