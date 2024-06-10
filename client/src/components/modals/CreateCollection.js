import { useContext, useState } from "react";
import { createCollection } from "../../http/collectionAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import { Context } from "../../utils/context";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Spinner } from "flowbite-react";

const CreateCollection = observer(({ show, onHide, loading, setLoading }) => {
    const { t } = useTranslation();
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

        if (description.length > 255) {
            return setErrorMessage(t("Description must not exceed 255 characters")), setError(true);
        }

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
            .catch(
                (e) => (
                    setErrorMessage(t("The collection has not been created, please try again")),
                    setError(true),
                    console.log(e)
                )
            )
            .finally(() => setLoading(false));
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                    show ? "block bg-black min-h-screen bg-opacity-50 duration-300" : "hidden"
                }`}>
                <div className="relative p-5 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">
                                {t("Create New Collection")}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onHide}>
                                <XMarkIcon className="h-6 w-6" />
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
                                        {t("Name")}
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
                                        {t("Category")}
                                    </label>
                                    <select
                                        id="category"
                                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setCategoryId(Number(e.target.value))}>
                                        {collection.allCategories.map((el) => {
                                            if (el.id !== 0) {
                                                return (
                                                    <option key={el.id} value={el.id}>
                                                        {t(el.name)}
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
                                        {t("Upload cover")}
                                    </label>
                                    <input
                                        className="overflow-hidden block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        onChange={selectFile}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Description")}
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={t("Write a description of your collection here")}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            {!loading ? (
                                <button
                                    type="submit"
                                    className="relative text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <PlusIcon className="me-1 -ms-1 w-4 h-4" />
                                    <p>{t("Add new collection")}</p>
                                </button>
                            ) : (
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                    <Spinner size="sm" className="me-3" />
                                    {t("Loading")}...
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
