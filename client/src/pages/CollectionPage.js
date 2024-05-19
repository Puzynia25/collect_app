import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import Badge from "../components/Badge";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCategories, fetchOneCollection } from "../http/collectionAPI";
import ItemList from "../components/ItemList";
import { fetchAllItems } from "../http/itemAPI";
import CollectionBar from "../components/CollectionBar";
import CreateItem from "../components/modals/CreateItem";

const CollectionPage = observer(() => {
    const { item, collection } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);
    const { id } = useParams();

    const customFields = [];

    useEffect(() => {
        fetchOneCollection(id).then((data) => collection.setOneCollection(data));
        fetchAllItems(id).then((data) => item.setItems(data.rows));
        fetchAllCategories().then((data) => collection.setAllCategories(data));
    }, []);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CollectionBar />
            <ContentWrapper>
                <Badge category={collection.oneCollection.category?.name} />
                <div className="flex w-full mt-7">
                    <div className="ms-2">
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            Items:
                        </h2>
                        <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                            A list of all the items in this collection including its name, category
                            and description.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="ml-auto flex justify-between place-items-center gap-2 place-self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => onShow()}>
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
                        Add item
                    </button>
                </div>
                <ItemList />
                <CreateItem show={onShowModal} onHide={() => onHide()} />
            </ContentWrapper>
        </div>
    );
});

export default CollectionPage;
