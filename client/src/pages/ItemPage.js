import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import CommentsContainer from "../components/CommentsContainer";
import Badge from "../components/Badge";
import CreateItem from "../components/modals/CreateItem";
import { observer } from "mobx-react-lite";
import { fetchAllCategories } from "../http/collectionAPI";
import { fetchAllCustomFields } from "../http/customFieldAPI";
import { fetchOneItem } from "../http/itemAPI";
import { useParams } from "react-router-dom";
import ItemBar from "../components/ItemBar";
import { fetchItemComments } from "../http/commentAPI";
import CustomFields from "../components/CustomFields";
import Spinner from "../components/Spinner";

const ItemPage = observer(() => {
    const { collection, comment, user } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [fields, setFields] = useState([]);

    useEffect(() => {
        Promise.race([
            fetchAllCategories().then((data) => collection.setAllCategories(data)),
            fetchOneItem(id).then((data) => setItem(data)),
            fetchItemComments(id).then((data) => comment.setComments(data.rows)),
            fetchAllCustomFields(id).then((data) => setFields(data)),
        ]).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <ItemBar item={item} userId={user.userData.id} />
            <div className="md:w-2/3 lg:w-3/4 w-full">
                <div className="p-4 md:p-7 md:rounded-3xl md:shadow-lg border w-full">
                    <Badge category={item.collection?.category.name} />
                    {fields.length > 0 ? <CustomFields fields={fields} collectionId={item.collectionId} /> : null}
                </div>
                <CommentsContainer item={item} />
            </div>
            <CreateItem />
        </div>
    );
});

export default ItemPage;
