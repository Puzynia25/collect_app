import { Route, Routes, useNavigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { useContext } from "react";
import { Context } from "..";
import MainPage from "../pages/MainPage";
import { observer } from "mobx-react-lite";
import { MAIN_ROUTE } from "../utils/consts";

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({ path, Component }) => {
                    return <Route key={path} path={path} element={Component} />;
                })}
            {publicRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={Component} />;
            })}
            <Route path="/" element={<MainPage />} />

            {!user.isAuth ? navigate(MAIN_ROUTE) : null}
        </Routes>
    );
});

export default AppRouter;
