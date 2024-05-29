import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import { Context } from ".";
import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoading(true);
            check()
                .then((data) => {
                    user.setIsAuth(true);
                    user.setUserData(data);
                })
                .finally(() => setLoading(false));
        }
    }, []);

    if (loading) {
        return (
            <div className="mt-5">
                <Spinner />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="container mx-auto my-9">
                <NavBar />
                <AppRouter />
            </div>
        </BrowserRouter>
    );
});

export default App;
