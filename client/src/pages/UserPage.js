import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCollections } from "../http/collectionAPI";
import ContentWrapper from "../components/ContentWrapper";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";

const UserPage = observer(() => {
    const { collection, user } = useContext(Context);
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
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row my-2 md:my-9">
            <CategoryBar />
            <ContentWrapper>
                <div className="flex justify-between pb-2">
                    <div>
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            Collections
                        </h2>
                        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Author:{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {user.userData.name}
                            </span>
                        </p>
                        <p className="mt-9 text-sm text-gray-900 dark:text-gray-400">
                            A list of all the collections in your account including their name,
                            category and description.
                        </p>
                    </div>
                    {user.userData.id == id || user.userData.role === "ADMIN" ? (
                        <button
                            type="button"
                            className="flex justify-between place-items-center place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onShow}>
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
                            Add collection
                        </button>
                    ) : null}
                </div>
                <CollectionList loading={loading} />
            </ContentWrapper>
            <CreateCollection
                show={onShowModal}
                onHide={() => onHide()}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    );
});

export default UserPage;
