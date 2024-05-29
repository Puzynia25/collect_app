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

const CollectionPage = observer(() => {
    const { item, collection, user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [onShowModal, setOnShowModal] = useState(false);
    const [oneCollection, setOneCollection] = useState({});
    const [fields, setFields] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        Promise.race([
            fetchOneCollection(id).then((data) => setOneCollection(data)),
            fetchAllItems(id).then((data) => item.setItems(data.rows)),
            fetchAllCategories().then((data) => collection.setAllCategories(data)),
            fetchAllCustomFields(id).then((data) => setFields(data)),
        ]).finally(() => setLoading(false));
    }, [id]);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row mt-9 bg-white border-gray-200 dark:bg-gray-900 dark:text-white">
            <CollectionBar oneCollection={oneCollection} />
            <ContentWrapper>
                <Badge category={oneCollection.category?.name} />
                <div className="flex w-full mt-5">
                    <div className="ms-2">
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">Items</h2>

                        <p className="mt-9 text-sm text-gray-900 dark:text-gray-400">
                            A list of all the items in this collection including its name, category and description.
                        </p>
                    </div>
                    {user.userData.id == oneCollection.userId || user.userData.role === "ADMIN" ? (
                        <button
                            type="button"
                            className="mr-2 ml-auto flex justify-between place-items-center gap-2 place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => onShow()}>
                            <svg
                                className="w-[15px] h-[15px] text-white"
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
                            Add item
                        </button>
                    ) : null}
                </div>
                <ItemList items={item.items} fields={fields} />
                <CreateItem show={onShowModal} onHide={() => onHide()} oneCollection={oneCollection} />
            </ContentWrapper>
        </div>
    );
});

export default CollectionPage;
