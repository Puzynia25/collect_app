import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import Badge from "../components/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { ITEM_ROUTE } from "../utils/consts";

import { observer } from "mobx-react-lite";
import { fetchAllCategories, fetchOneCollection } from "../http/collectionAPI";
import ItemList from "../components/ItemList";
import { fetchAllItems } from "../http/itemAPI";

const CollectionPage = observer(() => {
    const { user, item, collection } = useContext(Context);

    const { id } = useParams();

    const navigate = useNavigate();
    const customFields = [];

    useEffect(() => {
        fetchOneCollection(id).then((data) => collection.setOneCollection(data));
        fetchAllItems(id).then((data) => item.setItems(data.rows));
        fetchAllCategories().then((data) => collection.setAllCategories(data));
    }, []);

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <div className="w-full min-h-screen p-4 md:p-8 md:rounded-3xl md:shadow-lg border">
                <div className="px-2">
                    <Badge category={collection.oneCollection.category?.name} />

                    <div className="flex mt-7">
                        <img
                            className="h-80 object-cover rounded-lg"
                            src={process.env.REACT_APP_API_URL + collection.oneCollection.img}
                            alt=""
                        />
                        <div className="max-w-lg ml-9 place-content-center">
                            <p className="inline-block text-lg font-semibold content-end text-gray-900 dark:text-gray-400">
                                Collection:
                            </p>
                            <h2 className="ml-2 inline-block font-bold text-xl md:text-2xl ">
                                "{collection.oneCollection.name}"
                            </h2>

                            <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Author:{" "}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.userData.name}
                                </span>
                            </p>

                            <p className="mt-6 text-sm text-gray-900 dark:text-gray-400">
                                {collection.oneCollection.description}
                            </p>
                        </div>
                    </div>

                    <ItemList />
                </div>
            </div>
        </div>
    );
});

export default CollectionPage;
