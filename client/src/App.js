import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";
import ErrorMessage from "./components/modals/ErrorMessage";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Context } from "./utils/context";
import Help from "./components/Help";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onHideError = () => {
        setError(false);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoading(true);
            check()
                .then((data) => {
                    user.setIsAuth(true);
                    user.setUserData(data);
                })
                .catch((e) => (setErrorMessage("You need to log in"), setError(true)))
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <div className="container mx-auto my-9">
                    <NavBar />
                    <AppRouter />
                    <Help />
                    {errorModal}
                </div>
            </BrowserRouter>
        </I18nextProvider>
    );
});

export default App;
