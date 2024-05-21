import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import CommentsContainer from "../components/CommentsContainer";
import Badge from "../components/Badge";
import CreateItem from "../components/modals/CreateItem";
import { observer } from "mobx-react-lite";
import { fetchAllCategories } from "../http/collectionAPI";
import { fetchOneItem } from "../http/itemAPI";
import { useParams } from "react-router-dom";
import ItemBar from "../components/ItemBar";
import { fetchItemComments } from "../http/commentAPI";

const ItemPage = observer(() => {
    const { collection, comment } = useContext(Context);
    const { id } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        fetchAllCategories().then((data) => collection.setAllCategories(data));
        fetchOneItem(id).then((data) => setItem(data));
        fetchItemComments(id).then((data) => comment.setComments(data.rows));
    }, []);

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <ItemBar item={item} />
            <ContentWrapper>
                <Badge category={item.collection?.category.name} />
                <CommentsContainer item={item} />
            </ContentWrapper>
            <CreateItem />
        </div>
    );
});

export default ItemPage;
