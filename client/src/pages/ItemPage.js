import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import CommentsContainer from "../components/CommentsContainer";
import Badge from "../components/Badge";
import CreateItem from "../components/modals/CreateItem";
import { observer } from "mobx-react-lite";
import { fetchAllCategories } from "../http/collectionAPI";
import { fetchAllCustomFields, updateCustomFieldsValues } from "../http/customFieldAPI";
import { fetchOneItem } from "../http/itemAPI";
import { useParams } from "react-router-dom";
import ItemBar from "../components/ItemBar";
import { fetchItemComments } from "../http/commentAPI";
import CustomFields from "../components/CustomFields";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/modals/ErrorMessage";

const ItemPage = observer(() => {
    const { collection, comment, user } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [fields, setFields] = useState([]);
    const [fieldValues, setFieldValues] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    useEffect(() => {
        setLoading(true);

        fetchOneItem(id)
            .then((data) => {
                setItem(data);
                Promise.all([
                    fetchAllCategories().then((data) => collection.setAllCategories(data)),
                    fetchItemComments(id).then((data) => comment.setComments(data.rows)),
                    fetchAllCustomFields(data.collectionId, id).then((data) => setFields(data)),
                ]).finally(() => setLoading(false));
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, [id]);

    useEffect(() => {
        if (fields.length > 0) {
            setFieldValues(initialCustomFields(fields));
        }
    }, [fields]);

    const onUpdateValue = (fieldValues) => {
        const formattedValues = Object.keys(fieldValues).map((id) => ({
            id: parseInt(id, 10),
            value: fieldValues[id],
        }));

        updateCustomFieldsValues(item.collectionId, { itemId: id, customFields: formattedValues })
            .then(() => (setErrorMessage("Сhanges successfully saved"), setError(true)))
            .catch((e) => console.log(e.response.data.message));
    };

    const initialCustomFields = (fields) => {
        return fields.reduce((obj, field) => {
            obj[field.id] = field.values[0]?.value;
            return obj;
        }, {});
    };

    if (loading) {
        return <Spinner />;
    }

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <div className="w-full flex flex-col gap-5 md:flex-row mt-9 dark:bg-gray-900 dark:text-white">
            <ItemBar item={item} userId={user.userData.id} />
            <div className="md:w-2/3 lg:w-3/4 w-full">
                <div className="p-4 md:p-7 rounded-3xl mx-4 md:mx-0 shadow-lg border md:w-full dark:border-gray-600">
                    <div className="m-4">
                        <Badge category={item.collection?.category.name} />

                        {fields.length > 0 ? (
                            <CustomFields
                                fields={fields}
                                collectionId={item.collectionId}
                                onUpdateValue={onUpdateValue}
                                isButton={true}
                                fieldValues={fieldValues}
                                setFieldValues={setFieldValues}
                                userId={item.collection?.userId}
                            />
                        ) : (
                            <div key={comment.id} className="mt-9">
                                <p className="flex items-center text-sm text-gray-600">
                                    There are no additional fields yet...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <CommentsContainer item={item} />
            </div>
            <CreateItem />
            {errorModal}
        </div>
    );
});

export default ItemPage;
