import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCollections } from "../http/collectionAPI";
import ContentWrapper from "../components/ContentWrapper";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";
import CreateCustomFields from "../components/modals/CreateCustomFields";

const UserPage = observer(() => {
    const { collection, user } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);
    const [onShowFieldsModal, setOnShowFieldsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customFields, setCustomFields] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchAllCollections(null, id, null, 10).then((data) => collection.setAllCollections(data.rows));
    }, []);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    const onShowFields = () => {
        setOnShowFieldsModal(true);
    };
    const onHideFields = () => {
        setOnShowFieldsModal(false);
    };

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row my-2 md:my-9 bg-white border-gray-200 dark:bg-gray-900 dark:text-white">
            <CategoryBar />
            <ContentWrapper>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            Collections
                        </h2>
                        <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Creator:{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {collection.allCollections[0]?.user?.name}
                            </span>
                        </p>
                        <p className="mt-9 text-sm max-w-md text-gray-900 dark:text-gray-400">
                            A list of all the collections in your account including their name, category and
                            description.
                        </p>
                    </div>
                    {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                        <div className="flex gap-3">
                            <button
                                className="flex justify-between place-items-center place-self-end p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={onShowFields}>
                                <span className="flex text-sm ps-4 pr-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
                                    Add new fields
                                </span>
                            </button>

                            <button
                                type="button"
                                className="flex justify-between place-items-center place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                        </div>
                    ) : null}
                </div>
                <CollectionList loading={loading} />
            </ContentWrapper>
            <CreateCollection show={onShowModal} onHide={() => onHide()} loading={loading} setLoading={setLoading} />
            <CreateCustomFields
                show={onShowFieldsModal}
                onHide={() => onHideFields()}
                loading={loading}
                setLoading={setLoading}
                customFields={customFields}
                setCustomFields={setCustomFields}
                collections={collection.allCollections}
            />
        </div>
    );
});

export default UserPage;
