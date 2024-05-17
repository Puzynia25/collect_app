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
import CollectionBar from "../components/CollectionBar";

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
            <CollectionBar />
            <ContentWrapper>
                <ItemList />
            </ContentWrapper>
        </div>
    );
});

export default CollectionPage;
