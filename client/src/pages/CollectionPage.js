import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "../utils/context";
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
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const CollectionPage = observer(() => {
    const { t } = useTranslation();
    const { item, collection, user, page } = useContext(Context);
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
            fetchAllItems(id).then((data) => (item.setItems(data.rows), page.setTotalCount(data.count))),
            fetchAllCustomFields(id).then((data) => setFields(data)),
        ]).finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchAllItems(id, page.page, page.limit).then(
            (data) => (item.setItems(data.rows), page.setTotalCount(data.count))
        );
    }, [page.page]);

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
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            {t("Items")}
                        </h2>

                        <p className="hidden md:block mt-9 text-sm max-w-sm text-gray-900 dark:text-gray-400">
                            {t(
                                "A list of all the items in this collection including its name, category and description"
                            )}
                        </p>
                    </div>
                    {user.userData.id == oneCollection.userId || user.userData.role === "ADMIN" ? (
                        <div className="flex justify-between gap-1 md:gap-3 text-nowrap mt-4 md:mt-0">
                            <button
                                className="flex justify-between place-items-center place-self-end p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={onShowEditFields}>
                                <span className="flex text-sm px-3 md:ps-4 md:pr-5 py-2 transition-all ease-in duration-75 place-items-center bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <PencilSquareIcon className="me-1 -ms-1 -mt-0.5 w-4 h-4 text-black dark:text-white" />
                                    {t("Edit")} {t("fields")}
                                </span>
                            </button>
                            <button
                                className="flex justify-between place-items-center place-self-end p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                onClick={onShowFields}>
                                <span className="flex text-sm px-3 md:ps-4 md:pr-5 py-2 place-items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    <PlusIcon className="me-1 -ms-1 w-4 h-4" />
                                    <span className="hidden md:block pr-1">{t("Add")}</span>
                                    {t("fields")}
                                </span>
                            </button>
                            <button
                                type="button"
                                className="md:mr-2 md:ml-auto flex justify-between overflow-hidden place-items-center place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 md:px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => onShow()}>
                                <PlusIcon className="me-1 -ms-2 w-4 h-4" />
                                <span className="hidden md:block pr-1">{t("Add")}</span> {t("item")}
                            </button>
                        </div>
                    ) : null}
                </div>
                <ItemList items={item.items} fields={fields} setFields={setFields} userId={oneCollection.userId} />
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
