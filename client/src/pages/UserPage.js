import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCategories, fetchAllCollections } from "../http/collectionAPI";
import ContentWrapper from "../components/ContentWrapper";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";

const UserPage = observer(() => {
    const { collection } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    // const customFields = [];

    useEffect(() => {
        //загрузка всех коллекций юзера
        fetchAllCollections(null, id, null, 10).then((data) =>
            collection.setAllCollections(data.rows)
        );
    }, []);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            Collections:
                        </h2>
                        <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                            A list of all the collections in your account including their name,
                            category and description.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex justify-between place-items-center gap-2 place-self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={onShow}>
                        <svg
                            className="w-[15px] h-[15px] text-white dark:text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 12h14m-7 7V5"
                            />
                        </svg>
                        Add collection
                    </button>
                </div>
                <CollectionList loading={loading} />
            </ContentWrapper>
            <CreateCollection show={onShowModal} onHide={() => onHide()} setLoading={setLoading} />
        </div>
    );
});

export default UserPage;
