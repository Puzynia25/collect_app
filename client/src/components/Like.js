import { useEffect, useState } from "react";
import { addLike, checkLike, removeLike } from "../http/itemAPI";
import { useParams } from "react-router-dom";
import ErrorMessage from "./modals/ErrorMessage";

const Like = ({ userId, like }) => {
    const [likes, setLikes] = useState(like);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    const { id } = useParams();

    useEffect(() => {
        setLikes(like);
    }, [like]);

    useEffect(() => {
        if (userId) {
            try {
                checkLike(id, userId).then((data) => setIsLiked(data));
            } catch (e) {
                console.log(e.response.data.message);
            }
        }
    }, []);

    const onLike = async () => {
        setLoading(true);
        try {
            let data;
            if (!isLiked) {
                data = await addLike(id, userId);
                setIsLiked(true);
            } else {
                data = await removeLike(id, userId);
                setIsLiked(false);
            }
            setLikes(data);
        } catch (e) {
            setErrorMessage(e.response.data.message);
            setError(true);
            // console.log(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <button onClick={onLike} disabled={loading}>
                <span className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill={isLiked ? "currentColor" : "white"}
                        viewBox="0 0 24 24">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={isLiked ? "0" : "1.5"}
                            fillRule="evenodd"
                            d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <p className="text-sm font-medium pr-2">{likes}</p>
                </span>
            </button>
            {errorModal}
        </>
    );
};

export default Like;
