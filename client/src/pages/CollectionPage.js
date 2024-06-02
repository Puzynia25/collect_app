import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import Badge from "../components/Badge";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCategories, fetchOneCollection } from "../http/collectionAPI";
import { fetchAllCustomFields } from "../http/customFieldAPI";
import ItemList from "../components/ItemList";
import { fetchAllItems } from "../http/itemAPI";
import CollectionBar from "../components/CollectionBar";
import CreateItem from "../components/modals/CreateItem";
import Spinner from "../components/Spinner";
import CreateCustomFields from "../components/modals/CreateCustomFields";
import EditCustomFields from "../components/modals/EditCustomFields";

const CollectionPage = observer(() => {
    const { item, collection, user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [onShowModal, setOnShowModal] = useState(false);
    const [onShowFieldsModal, setOnShowFieldsModal] = useState(false);
    const [onShowEditFieldsModal, setOnShowEditFieldsModal] = useState(false);
    const [oneCollection, setOneCollection] = useState({});
    const [fields, setFields] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        Promise.race([
            fetchOneCollection(id).then((data) => setOneCollection(data)),
            fetchAllCategories().then((data) => collection.setAllCategories(data)),
            fetchAllItems(id).then((data) => item.setItems(data.rows)),
            fetchAllCustomFields(id).then((data) => setFields(data)),
        ]).finally(() => setLoading(false));
    }, [id]);

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

    const onShowEditFields = () => {
        setOnShowEditFieldsModal(true);
    };
    const onHideEditFields = () => {
        setOnShowEditFieldsModal(false);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row mt-9 bg-white border-gray-200 dark:bg-gray-900 dark:text-white">
            <CollectionBar oneCollection={oneCollection} />
            <ContentWrapper>
                <Badge category={oneCollection.category?.name} />
                <div className="md:flex w-full mt-5 justify-between">
                    <div className="ms-2">
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">Items</h2>

                        <p className="hidden md:block mt-9 text-sm max-w-sm text-gray-900 dark:text-gray-400">
                            A list of all the items in this collection including its name, category and description.
                        </p>
                    </div>
                    {user.userData.id == oneCollection.userId || user.userData.role === "ADMIN" ? (
                        <div className="flex justify-between gap-3 text-nowrap mt-4 md:mt-0">
                            <button
                                className="flex justify-between place-items-center place-self-end p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={onShowEditFields}>
                                <span className="flex text-sm px-3 md:ps-4 md:pr-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg
                                        className="me-1 -ms-1 -mt-0.5 w-5 h-5 text-black dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Edit fields
                                </span>
                            </button>
                            <button
                                className="flex justify-between place-items-center place-self-end p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={onShowFields}>
                                <span className="flex text-sm px-3 md:ps-4 md:pr-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                    Add fields
                                </span>
                            </button>
                            <button
                                type="button"
                                className="md:mr-2 md:ml-auto flex justify-between overflow-hidden place-items-center place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => onShow()}>
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"></path>
                                </svg>
                                Add item
                            </button>
                        </div>
                    ) : null}
                </div>
                <ItemList items={item.items} fields={fields} setFields={setFields} />
                <CreateItem
                    show={onShowModal}
                    onHide={() => onHide()}
                    oneCollection={oneCollection}
                    fields={fields}
                    setFields={setFields}
                />
                <CreateCustomFields
                    show={onShowFieldsModal}
                    onHide={() => onHideFields()}
                    collectionId={id}
                    setFields={setFields}
                />
                <EditCustomFields
                    show={onShowEditFieldsModal}
                    onHide={() => onHideEditFields()}
                    collectionId={id}
                    fields={fields}
                    setFields={setFields}
                />
            </ContentWrapper>
        </div>
    );
});

export default CollectionPage;
