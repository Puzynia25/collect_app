import { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCollections } from "../http/collectionAPI";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Tabs } from "flowbite-react";
import TicketList from "../components/TicketList";
import { Jira } from "../assets/svg/Jira";
import { tabTheme } from "../utils/themes/tabTheme";
import { fetchTicketsByEmail } from "../http/jiraAPI";
import Spinner from "../components/Spinner";

const UserPage = observer(() => {
    const { t } = useTranslation();
    const { collection, user, page, ticketPage } = useContext(Context);
    const [collectionsByCategory, setCollectionsByCategory] = useState(collection.allCollections);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchAllCollections(null, id, null, 10)
            .then((data) => (collection.setAllCollections(data.rows), page.setTotalCount(data.count)))
            .finally(() => (setByCategory(), setLoading(false)));
    }, [isEdit, id, page.page]);

    useEffect(() => {
        setLoading(true);
        const startAt = (ticketPage.page - 1) * ticketPage.limit;
        fetchTicketsByEmail(user.userData.email, startAt, ticketPage.limit)
            .then((data) => (user.setTicketList(data.issues), ticketPage.setTotalCount(data.total)))
            .finally(() => setLoading(false));
    }, [ticketPage.page, user.ticketList]);

    const setByCategory = () => {
        collection.selectedCategory.name !== "All"
            ? setCollectionsByCategory(
                  collection.allCollections.filter((el) => el.categoryId === collection.selectedCategory.id)
              )
            : setCollectionsByCategory(collection.allCollections);
    };

    useEffect(() => {
        setByCategory();
    }, [collection.selectedCategory]);

    const onShow = () => {
        setShowModal(true);
    };
    const onHide = () => {
        setShowModal(false);
    };

    const tickets = loading ? <Spinner /> : <TicketList ticketList={user.ticketList} />;

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row my-2 md:my-9 bg-white border-gray-200 dark:bg-gray-900 dark:text-white">
            <CategoryBar />
            <Tabs style="pills" className="md:w-2/3 lg:w-3/4 w-full" theme={tabTheme}>
                <Tabs.Item active title="Collections">
                    <div className="mx-4 md:mx-0 p-4 md:p-7 rounded-3xl shadow-lg border md:w-full bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                                    {t("Collections")}
                                </h2>
                                <p className="mt-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {collection.allCollections.length > 0 ? (
                                        <>
                                            {t("Creator")}:{" "}
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {collection.allCollections[0]?.user?.name}
                                            </span>
                                        </>
                                    ) : null}
                                </p>
                                <p className="hidden md:block mt-9 text-sm max-w-md text-gray-900 dark:text-gray-400">
                                    {t(
                                        "A list of all the collections in your account including their name, category and description"
                                    )}
                                </p>
                            </div>
                            {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                                <>
                                    <button
                                        type="button"
                                        className="flex justify-between place-items-center place-self-end text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ps-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={onShow}>
                                        <PlusIcon className="me-1 -ms-1 w-4 h-4" />
                                        {t("Add")} {t("collection")}
                                    </button>
                                </>
                            ) : null}
                        </div>
                        <CollectionList loading={loading} setIsEdit={setIsEdit} collections={collectionsByCategory} />
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Jira" icon={Jira}>
                    <div className="mx-4 md:mx-0 p-4 md:p-7 rounded-3xl shadow-lg border md:w-full bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                        <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                            {t("Tickets")}
                        </h2>

                        <p className="hidden md:block mt-9 mb-4 text-sm max-w-md text-gray-900 dark:text-gray-400">
                            {t("A list of all your tickets")}
                        </p>

                        {user.userData.id === Number(id) || user.userData.role === "ADMIN" ? (
                            tickets
                        ) : (
                            <p className="mt-5 bg-gray-100 p-2 rounded-lg text-center">
                                You need to log in to see this information
                            </p>
                        )}
                    </div>
                </Tabs.Item>
            </Tabs>

            <CreateCollection show={showModal} onHide={() => onHide()} loading={loading} setLoading={setLoading} />
        </div>
    );
});

export default UserPage;
