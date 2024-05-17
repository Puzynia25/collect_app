import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllCategories, fetchAllCollections } from "../http/collectionAPI";
import ContentWrapper from "../components/ContentWrapper";
import CategoryBar from "../components/CategoryBar";
import CreateCollection from "../components/modals/CreateCollection";
import CollectionList from "../components/CollectionList";

const UserPage = observer(() => {
    const { collection, user } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);
    const { id } = useParams();

    // const customFields = [];

    useEffect(() => {
        //загрузка всех коллекций юзера
        fetchAllCollections(null, id).then((data) => collection.setAllCollections(data.rows));
        fetchAllCategories().then((data) => collection.setAllCategories(data));
    }, []);

    const onShow = () => {
        setOnShowModal(true);
    };
    const onHide = () => {
        setOnShowModal(false);
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 md:flex-row mt-9">
            <CategoryBar />
            <ContentWrapper>
                <CollectionList onShow={() => onShow()} />
            </ContentWrapper>
            <CreateCollection show={onShowModal} onHide={() => onHide()} />
        </div>
    );
});

export default UserPage;
