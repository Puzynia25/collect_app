import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { useContext } from "react";
import MainPage from "../pages/MainPage";
import { observer } from "mobx-react-lite";
import { Context } from "../utils/context";

const AppRouter = observer(() => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({ path, Component }) => {
                    return <Route key={path} path={path} element={Component} />;
                })}
            {publicRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={Component} />;
            })}
            <Route path="*" element={<MainPage />} />
        </Routes>
    );
});

export default AppRouter;
