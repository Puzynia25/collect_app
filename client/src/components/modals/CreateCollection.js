import { useContext, useState } from "react";
import { Context } from "../..";
import { createCollection } from "../../http/collectionAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ErrorMessage from "./ErrorMessage";

const CreateCollection = observer(({ show, onHide, loading, setLoading }) => {
    const { collection } = useContext(Context);
    const { id } = useParams();

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addCollection = (e) => {
        e.preventDefault();
        setLoading(true);
        const userId = Number(id);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("img", file);
        formData.append("userId", userId);
        formData.append("categoryId", categoryId);
        // formData.append('info', JSON.stringify(info))

        createCollection(formData)
            .then(
                (data) => (
                    collection.setAllCollections([...collection.allCollections, data]),
                    setName(""),
                    setFile(null),
                    setDescription(""),
                    onHide()
                )
            )
            .catch((e) => (setErrorMessage("The collection has not been created, please try again"), setError(true)))
            .finally(() => setLoading(false));
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                    show ? "block bg-black bg-opacity-50 duration-300" : "hidden"
                }`}>
                <div className="relative p-5 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Collection
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onHide}>
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form className="p-4 md:p-7" onSubmit={addCollection}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type collection name"
                                        required=""
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setCategoryId(Number(e.target.value))}>
                                        {collection.allCategories.map((el) => {
                                            if (el.id !== 0) {
                                                return (
                                                    <option key={el.id} value={el.id}>
                                                        {el.name}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="file_input">
                                        Upload cover
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        onChange={selectFile}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write a description of your collection here"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            {!loading ? (
                                <button
                                    type="submit"
                                    className="relative text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5 "
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                    <p>Add new collection</p>
                                </button>
                            ) : (
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 me-3 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Loading...
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {errorModal}
        </>
    );
});

export default CreateCollection;
