import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "..";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTARTION_ROUTE,
    USER_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = () => {
        localStorage.removeItem("token");
        user.setUserData({});
        user.setIsAuth(false);
    };

    const onCheckLogIn = () => {
        if (!user.isAuth) {
            alert("You need to log in");
            navigate(LOGIN_ROUTE);
        } else navigate(USER_ROUTE + "/" + user.userData.id);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 md:rounded-3xl md:shadow-lg border">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    className="cursor-pointer ms-2 flex items-center space-x-3 rtl:space-x-reverse"
                    href={MAIN_ROUTE}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6">
                        <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                    </svg>

                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Collections
                    </span>
                </a>

                <div className="flex md:order-2">
                    <button
                        type="button"
                        data-collapse-toggle="navbar-search"
                        aria-controls="navbar-search"
                        aria-expanded="false"
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-3xl text-sm p-2.5 me-1">
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            className="block w-full p-2 pl-10 pr-16 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                        />
                    </div>
                    <button
                        data-collapse-toggle="navbar-search"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-search"
                        aria-expanded="false">
                        <span className="sr-only">Search</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex md:order-3 items-center space-x-8 rtl:space-x-reverse mr-5">
                    {user.isAuth ? (
                        <>
                            {user.userData.role === "ADMIN" ? (
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => navigate(ADMIN_ROUTE)}>
                                    Admin panel
                                </button>
                            ) : null}

                            <span className="text-sm text-gray-500 dark:text-white hover:underline">
                                {user.userData?.email}
                            </span>
                            <div
                                className="cursor-pointer text-sm text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => logOut()}>
                                Log out
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => navigate(LOGIN_ROUTE)}>
                                Login
                            </button>
                            <button
                                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => navigate(REGISTARTION_ROUTE)}>
                                Sign up
                            </button>
                        </>
                    )}
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                        />
                    </div>

                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href={MAIN_ROUTE}
                                className={`block py-2 px-3 rounded md:p-0 ${
                                    location.pathname === MAIN_ROUTE
                                        ? "text-blue-600 dark:text-blue-500"
                                        : "text-gray-900 dark:text-white"
                                }`}>
                                Home
                            </a>
                        </li>
                        <li>
                            <button
                                className={`cursor-pointer block py-2 px-3 rounded md:p-0 ${
                                    location.pathname === USER_ROUTE + "/" + user.userData?.id
                                        ? "text-blue-600 dark:text-blue-500"
                                        : "text-gray-900 dark:text-white"
                                }`}
                                onClick={onCheckLogIn}>
                                Account
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
});

export default NavBar;
