import { useContext } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import CommentsContainer from "../components/CommentsContainer";
import Badge from "../components/Badge";
import CreateItem from "../components/modals/CreateItem";

const ItemPage = () => {
    // const { item } = useContext(Context);
    const item = {
        id: 1,
        name: "A Song of Ice and Fire",
        tags: ["fantasy", "georgemartin", "books"],
        likes: 0,
        collectionId: 1,
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <Badge category={"Vinyl"} />
                <div className="flex justify-between gap-3 dark:bg-gray-800 mt-4">
                    <div className="w-1/3">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {item.name}
                            </h5>
                        </a>
                        <a href="#">
                            <h5 className="mt-4 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                                Author
                            </h5>
                        </a>

                        <div className="flex items-center  mt-9">
                            <div className="">
                                <span className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                    <p className="text-sm font-medium">{item.likes}</p>
                                </span>
                            </div>
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
                    <div className="w-1/3">
                        <h2 className="font-bold text-xl md:text-2xl mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2 max-w-sm mx-auto my-4 text-sm">
                            {item.tags.map((el, i) => {
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
                        </div>
                    </div>
                </div>

                <CommentsContainer />
            </ContentWrapper>
            <CreateItem />
        </div>
    );
};

export default ItemPage;
