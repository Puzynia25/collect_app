import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import CollectionPage from "./pages/CollectionPage";
import ItemPage from "./pages/ItemPage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import {
    ADMIN_ROUTE,
    COLLECTION_ROUTE,
    ITEM_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTARTION_ROUTE,
    USER_ROUTE,
} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />,
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <MainPage />,
    },
    {
        path: USER_ROUTE + "/:id",
        Component: <UserPage />,
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />,
    },
    {
        path: REGISTARTION_ROUTE,
        Component: <Auth />,
    },
    {
        path: COLLECTION_ROUTE + "/:id",
        Component: <CollectionPage />,
    },
    {
        path: ITEM_ROUTE + "/:itemId",
        Component: <ItemPage />,
    },
];
