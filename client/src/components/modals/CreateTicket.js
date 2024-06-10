import { useState } from "react";
import { observer } from "mobx-react-lite";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Spinner } from "flowbite-react";
import { createTicket } from "../../http/jiraAPI";
import { useLocation, useParams } from "react-router-dom";

const CreateTicket = observer(({ show, onHide, loading, setLoading, user, link }) => {
    const { t } = useTranslation();

    const url = useLocation();
    console.log(useParams());

    const [priority, setPriority] = useState("Low");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    const onCreateTicket = (newTicket) => {
        user.setTicketList((prev) => [newTicket, ...prev]);
    };

    const extractCollectionIdFromUrl = (url) => {
        const match = url.match(/collection\/(\d+)(\/|$)/);
        return match ? match[1] : null;
    };

    const addTicket = (e) => {
        e.preventDefault();
        setLoading(true);

        const collectionId = extractCollectionIdFromUrl(url.pathname);
        console.log(collectionId);

        const ticket = {
            user,
            collectionId,
            link,
            priority,
            description,
        };

        createTicket(ticket)
            .then((data) => {
                const issueUrl = `https://vitalinapuzynia.atlassian.net/browse/${data.key}`;
                console.log(issueUrl, "issueUrl");
                return (
                    setMessage(
                        <span className="flex flex-col gap-3 text-md">
                            Ticket created!{" "}
                            <a
                                href={issueUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-wrap w-full text-gray-900 underline">
                                check out my ticket in JIRA
                            </a>
                        </span>
                    ),
                    setError(true),
                    onHide(),
                    onCreateTicket()
                );
            })
            .catch((e) => (setMessage("Failed to create a ticket"), setError(true), console.log(e)))
            .finally(() => setLoading(false));
    };

    const errorModal = error ? <ErrorMessage message={message} show={error} onHide={() => onHideError()} /> : null;

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
                                {t("Create New Ticket")}
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
                        <form className="p-4 md:p-7" onSubmit={addTicket}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="priority"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Priority")}
                                    </label>
                                    <select
                                        id="priority"
                                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setPriority(e.target.value)}>
                                        <option value="Low">{t("Low")}</option>
                                        <option value="Medium">{t("Medium")}</option>
                                        <option value="High">{t("High")}</option>
                                    </select>
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
                                        placeholder={t("Write a description of your ticket here")}
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
                                    <p>{t("Add new ticket")}</p>
                                </button>
                            ) : (
                                <button
                                    disabled
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
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

export default CreateTicket;
