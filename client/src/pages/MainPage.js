import { useContext, useEffect } from "react";
import Tags from "../components/Tags";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import ContentWrapper from "../components/ContentWrapper";
import { fetchAllCollections, fetchAllCategories } from "../http/collectionAPI";
import { observer } from "mobx-react-lite";
import ItemList from "../components/ItemList";
import CollectionCards from "../components/CollectionCards";

const MainPage = observer(() => {
    const { collection } = useContext(Context);

    useEffect(() => {
        fetchAllCategories().then((data) => collection.setAllCategories(data));
        fetchAllCollections().then((data) => collection.setAllCollections(data.rows));
    }, []);

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <ItemList />
                {/* 5 the biggest collections */}
                <CollectionCards />
                <Tags />
            </ContentWrapper>
        </div>
    );
});

export default MainPage;
