import { useContext, useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { Context } from "..";
import CategoryBar from "../components/CategoryBar";
import { useParams } from "react-router-dom";
import CreateCollection from "../components/modals/CreateCollection";
import { observer } from "mobx-react-lite";
import { fetchAllCollections } from "../http/collectionAPI";
import CollectionList from "../components/CollectionList";

const UserPage = observer(() => {
    const { collection, user } = useContext(Context);
    const [onShowModal, setOnShowModal] = useState(false);

    // const customFields = [];

    useEffect(() => {
        //загрузка коллекции юзера
        fetchAllCollections().then((data) => collection.setAllCollections(data.rows));
        const userCollections = collection.allCollections.filter(
            (el) => el.userId === user.userData.id
        );
        collection.setUserCollectionList(userCollections);
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
