import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Main from "../pages/Main";
import { useContext } from "react";
import { Context } from "..";

const AppRouter = () => {
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

            <Route path="*" element={<Main />} />
        </Routes>
    );
};

export default AppRouter;
