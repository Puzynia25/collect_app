import { useContext, useState } from "react";
import Badge from "../Badge";
import { createItem, fetchAllItems } from "../../http/itemAPI";
import { useParams } from "react-router-dom";
import CustomFieldTypes from "../CustomFieldTypes";
import { fetchAllCustomFields } from "../../http/customFieldAPI";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Context } from "../../utils/context";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/16/solid";

const CreateItem = observer(({ show, onHide, oneCollection, fields, setFields }) => {
    const { t } = useTranslation();
    const { item } = useContext(Context);
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [fieldValues, setFieldValues] = useState([]);
    const { id } = useParams();

    const addItem = (e) => {
        e.preventDefault();

        const formattedTags = tags[0] ? tags[0].toLowerCase().replace(/\s/g, "").split(",") : tags[0];
        const formattedValues = Object.keys(fieldValues).map((id) => ({
            id: parseInt(id, 10),
            value: fieldValues[id],
        }));

        createItem({ name, tags: formattedTags, collectionId: id, fieldValues: formattedValues })
            .then((data) => {
                return setName(""), setTags([]);
            })
            .then(
                () =>
                    fetchAllCustomFields(id)
                        .then((data) => setFields(data))
                        .then(() => fetchAllItems(id).then((data) => item.setItems(data.rows))),
                onHide()
            );
    };

    const onChangeValue = (id, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div
            tabIndex="-1"
            aria-hidden="true"
            className={`transition-opacity overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full  ${
                show ? "block bg-black bg-opacity-50 duration-300 min-h-screen" : "hidden"
            }`}>
            <div className="relative p-5 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-800">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="ps-2 text-lg font-semibold text-gray-900 dark:text-white">
                            {t("Create New Item")}
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
                    <form className="py-2 md:py-4 px-2 md:px-7" onSubmit={addItem}>
                        <div className="w-auto">
                            <Badge category={oneCollection?.category?.name} />
                        </div>
                        <div className="py-2 md:py-4">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Name")}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={t("Type item name")}
                                        required=""
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("Tags")}
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={t("Write, your, tags, here")}
                                        value={tags}
                                        onChange={(e) => setTags([e.target.value])}
                                    />
                                </div>
                                {fields?.length > 0
                                    ? fields.map((field) => {
                                          return (
                                              <div key={field.id} className="col-span-2">
                                                  <div className="grow">
                                                      <CustomFieldTypes
                                                          type={field.type}
                                                          name={field.name}
                                                          isReadOnly={false}
                                                          value={fieldValues[field.id]}
                                                          onChange={(e) => onChangeValue(field.id, e)}
                                                      />
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : null}
                            </div>
                            <button
                                type="submit"
                                className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <PlusIcon className="me-1 -ms-1 w-4 h-4" />
                                {t("Add new item")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default CreateItem;
