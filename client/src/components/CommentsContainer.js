import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import { createComment } from "../http/commentAPI";

const CommentsContainer = observer(({ item }) => {
    const { comment, user } = useContext(Context);
    const [content, setContent] = useState("");

    const addComment = (e) => {
        e.preventDefault();
        createComment({ itemId: item.id, userId: user.userData.id, content })
            .then((data) => comment.setComments([...comment.comments, data]))
            .catch((e) => console.log(e));
        setContent("");
    };

    return (
        <>
            <div className="mt-24 mb-8 w-full max-w-lg p-4 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ml-auto">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="pt-2 pl-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Latest Comments
                    </h5>
                    {/* <a
                        href="#"
                        className="px-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a> */}
                </div>
                <div className="px-2 flow-root overflow-auto ">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {comment.comments.length > 0 ? (
                            comment.comments.map((comment) => {
                                return (
                                    <li key={comment.id} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {comment.user?.name}
                                                </p>
                                                <p className="text-sm text-gray-500  dark:text-gray-400">
                                                    {comment.user?.email}
                                                </p>
                                                <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <li key={comment.id} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    "Be the first to leave a comment..."
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                {/* Add comment */}
                <form className="mt-2 ">
                    <label htmlFor="chat" className="sr-only">
                        Your message
                    </label>
                    <div className="flex items-center px-3 py-2 rounded-3xl bg-gray-50 dark:bg-gray-700">
                        <textarea
                            id="chat"
                            rows="1"
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}></textarea>
                        <button
                            type="submit"
                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                            onClick={addComment}>
                            <svg
                                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
});

export default CommentsContainer;
