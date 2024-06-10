import { useContext, useState } from "react";
import CreateTicket from "./modals/CreateTicket";
import { Context } from "../utils/context";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";

const Help = () => {
    const { user } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onShowTicket = () => {
        setShowModal(true);
    };
    const onHideTicket = () => {
        setShowModal(false);
    };
    return (
        <>
            <button className="fixed bottom-0 right-2 m-4" onClick={onShowTicket} title="Create support ticket">
                <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
            </button>
            <CreateTicket
                show={showModal}
                onHide={() => onHideTicket()}
                loading={loading}
                setLoading={setLoading}
                user={user.userData}
                link={window.location.href}
            />
        </>
    );
};

export default Help;
