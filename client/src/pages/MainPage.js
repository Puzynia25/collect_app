import { useContext, useEffect, useState } from "react";
import Tags from "../components/Tags";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import ContentWrapper from "../components/ContentWrapper";
import { fetchAllCollections, fetchBiggest } from "../http/collectionAPI";
import { observer } from "mobx-react-lite";
import ItemList from "../components/ItemList";
import CollectionCards from "../components/CollectionCards";
import { fetchAllItems, fetchAllTags } from "../http/itemAPI";
import Spinner from "../components/Spinner";

const MainPage = observer(() => {
    const { collection, item } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [biggestCollections, setBiggestCollections] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        Promise.race([
            fetchAllCollections().then((data) => collection.setAllCollections(data.rows)),
            fetchAllItems().then((data) => item.setItems(data.rows)),
            fetchAllTags().then((data) => setTags(data)),
            fetchBiggest().then((data) => setBiggestCollections(data)),
        ]).finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <h1 className="font-bold text-xl md:text-2xl my-4">Recently Added</h1>
                {loading ? <Spinner /> : <ItemList />}
                {/* 5 the biggest collections */}
                <CollectionCards collections={biggestCollections} />
                <Tags tags={tags} />
            </ContentWrapper>
        </div>
    );
});

export default MainPage;
