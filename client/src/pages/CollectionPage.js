import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import Badge from "../components/Badge";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ITEM_ROUTE } from "../utils/consts";
import CreateItem from "../components/modals/CreateItem";
import { observer } from "mobx-react-lite";
import { fetchOneCollection } from "../http/collectionAPI";

const CollectionPage = observer(() => {
    const { user, collection, item } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState({});
    const params = useParams();

    const navigate = useNavigate();
    const customFields = [];

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    useEffect(() => {
        fetchOneCollection(params.id).then((data) => setSelectedCollection(data));
    }, []);

    return (
        <div className=" bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <div>
                    <Badge category={"Vinyl"} />

                    <div className="flex mt-9">
                        <img
                            className="h-40 object-cover rounded-lg"
                            src={process.env.REACT_APP_API_URL + selectedCollection.img}
                            alt=""
                        />
                        <div className="max-w-lg ml-9 place-content-center">
                            <p className="inline-block text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                                Collection:
                            </p>
                            <h2 className="ml-2 inline-block font-bold text-xl md:text-2xl ">
                                "{selectedCollection.name}"
                            </h2>

                            <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Author:{" "}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.userData.name}
                                </span>
                            </p>

                            <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                                {selectedCollection.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full mt-9">
                        <div className="ms-2">
                            <h2 className="text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                                My items:
                            </h2>
                            <p className="mt-2 text-sm text-gray-900 dark:text-gray-400">
                                A list of all the items in this collection including its name,
                                category and description.
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

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 md:mb-24 md:mt-9">
                        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Category
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            ???
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Tags
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.items.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:underline">
                                                <a
                                                    href={ITEM_ROUTE + "/" + item.id}
                                                    className="hover:underline">
                                                    {item.name}
                                                </a>
                                            </th>
                                            <td className="px-6 py-4">Silver</td>
                                            <td className="px-6 py-4">Laptop</td>
                                            <td className="px-6 py-4">
                                                {item.tags.map((tag, i) => {
                                                    return (
                                                        <button
                                                            key={i}
                                                            className="m-1 px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300">
                                                            {tag}
                                                        </button>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    Edit
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ContentWrapper>

            <CreateItem show={onShowModal} onHide={() => onHide()} />
        </div>
    );
});

export default CollectionPage;
