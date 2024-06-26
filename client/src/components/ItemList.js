import { useContext, useState } from "react";
import { COLLECTION_ROUTE, USER_ROUTE } from "../utils/consts";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "./Badge";
import { removeOne } from "../http/itemAPI";
import EditItem from "./modals/EditItem";
import Pages from "./Pages";
import { useTranslation } from "react-i18next";
import { Context } from "../utils/context";
import { SortIcon } from "../assets/svg/SortIcon";
import { Trash } from "../assets/svg/Trash";

const ItemList = ({ fields, setFields, userId }) => {
    const { t } = useTranslation();
    const { user, item, page } = useContext(Context);
    const navigate = useNavigate();
    const [onShowEditModal, setOnShowEditModal] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const { collectionId, itemId } = useParams();

    const onDeleteItem = (itemId) => {
        removeOne(collectionId, itemId)
            .then(() => item.setItems(item.items.filter((el) => el.id !== itemId)))
            .catch((e) => console.log(e));
    };

    const formatDate = (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    const onShowEdit = (id) => {
        setOnShowEditModal(true);
        setCurrentItemId(id);
    };
    const onHideEdit = () => {
        setOnShowEditModal(false);
    };

    return (
        <div className="md:px-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 md:mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t("Name")}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Creator")}
                                    <a href="#">
                                        <SortIcon />
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Category")}
                                    <a href="#">
                                        <SortIcon />
                                    </a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    {t("Tags")}
                                    <a href="#">
                                        <SortIcon />
                                    </a>
                                </div>
                            </th>
                            {fields.map((field) => {
                                if (field.type === "string" || field.type === "date") {
                                    return (
                                        <th key={field.id} scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                {field.name}
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
                                    );
                                }
                            })}
                            {user.userData.id === userId || user.userData.role === "ADMIN" ? (
                                <>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {item.items.length > 0 ? (
                            item.items.map((el) => {
                                return (
                                    <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td
                                            scope="row"
                                            className="text-balance max-w-[140px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button
                                                className="hover:underline text-left"
                                                onClick={() =>
                                                    navigate(`${COLLECTION_ROUTE}/${el.collectionId}/item/` + el.id)
                                                }>
                                                {el.name.length > 15 ? el.name.slice(0, 15) + "..." : el.name}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-balance max-w-[140px]">
                                            <button
                                                className="hover:underline"
                                                onClick={() => navigate(USER_ROUTE + "/" + el.collection?.user.id)}>
                                                {el.collection?.user.name}
                                            </button>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Badge category={el.collection?.category.name} />
                                        </td>
                                        <td className="text-wrap px-6 py-4 max-w-36">
                                            {el.tags
                                                ? el.tags.map((tag, i) => {
                                                      return (
                                                          <button
                                                              key={i}
                                                              className="m-1 px-2 py-1 rounded bg-gray-200/50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300">
                                                              {tag.length > 15 ? tag.slice(0, 15) + "..." : tag}
                                                          </button>
                                                      );
                                                  })
                                                : ""}
                                        </td>
                                        {fields.map((field) => {
                                            if (field.type === "string" || field.type === "date") {
                                                return field.values
                                                    .filter((obj) => obj.itemId === el.id)
                                                    .map((item) => (
                                                        <td key={item.id} className="text-wrap px-6 py-4 max-w-36">
                                                            {field.type === "date"
                                                                ? item.value
                                                                    ? formatDate(item.value)
                                                                    : "No value"
                                                                : item.value === ""
                                                                ? "No value"
                                                                : null}
                                                        </td>
                                                    ));
                                            }
                                        })}

                                        {user.userData.id === userId || user.userData.role === "ADMIN" ? (
                                            <>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        onClick={() => onShowEdit(el.id)}>
                                                        {t("Edit")}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right content-center">
                                                    <button onClick={() => onDeleteItem(el.id)}>
                                                        <span className="sr-only">Delete</span>
                                                        <Trash />
                                                    </button>
                                                </td>
                                            </>
                                        ) : null}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="w-full">
                                <td className="p-5" colSpan={7}>
                                    There is no any items in this category...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pages page={page} />
            <EditItem
                show={onShowEditModal}
                onHide={() => onHideEdit()}
                itemId={currentItemId}
                fields={fields}
                setFields={setFields}
                collectionId={collectionId}
            />
        </div>
    );
};

export default ItemList;
