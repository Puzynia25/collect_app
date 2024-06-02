import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTARTION_ROUTE, USER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import ErrorMessage from "./modals/ErrorMessage";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const [colorTheme, setColorTheme] = useState(localStorage.getItem("color-theme") || "light");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [toggleMainMenu, setToggleMainMenu] = useState(false);

    const onHideError = () => {
        setError(false);
    };

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (document.documentElement.classList.contains(colorTheme)) {
            return;
        }
        const currentColorTheme = colorTheme === "dark" ? "light" : "dark";
        document.documentElement.classList.remove(currentColorTheme);
        document.documentElement.classList.add(colorTheme);
        localStorage.setItem("color-theme", colorTheme);
    }, [colorTheme]);

    const logOut = () => {
        localStorage.removeItem("token");
        user.setUserData({});
        user.setIsAuth(false);
        setToggleMainMenu(false);
        navigate(MAIN_ROUTE);
    };

    const onCheckLogIn = () => {
        if (!user.isAuth) {
            setErrorMessage("You need to log in");
            setError(true);
            setToggleMainMenu(false);
            navigate(LOGIN_ROUTE);
        } else {
            setToggleMainMenu(false);
            navigate(USER_ROUTE + "/" + user.userData.id);
        }
    };

    const toggleTheme = () => {
        setColorTheme(colorTheme === "light" ? "dark" : "light");
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <>
            <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 rounded-3xl shadow-lg border mx-4 md:mx-0">
                <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap text-nowrap items-center justify-between gap-3 mx-auto p-4">
                    <button
                        className="cursor-pointer ms-2 flex items-center space-x-3 rtl:space-x-reverse dark:text-white"
                        onClick={() => navigate(MAIN_ROUTE)}>
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
                    </button>

                    <div className="flex md:order-3">
                        {/* <button
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
                        </div> */}
                        <button
                            id="theme-toggle"
                            data-tooltip-target="tooltip-toggle"
                            type="button"
                            className="text-gray-500 inline-flex items-center justify-center dark:text-gray-400 hover:bg-gray-100 w-10 h-10 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                            onClick={toggleTheme}>
                            <svg
                                id="theme-toggle-dark-icon"
                                className={colorTheme === "light" ? "w-4 h-4 block" : "w-4 h-4 hidden"}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20">
                                <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                            </svg>
                            <svg
                                id="theme-toggle-light-icon"
                                className={colorTheme === "dark" ? "w-4 h-4 block" : "w-4 h-4 hidden"}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20">
                                <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                            </svg>
                            <span className="sr-only">Toggle dark mode</span>
                        </button>
                        <button
                            data-collapse-toggle="navbar-search"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search"
                            aria-expanded={toggleMainMenu}
                            onClick={() => setToggleMainMenu(!toggleMainMenu)}>
                            <span className="sr-only">Open main menu</span>
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

                    <div
                        className={`w-full flex md:order-2 ${toggleMainMenu ? "block" : "hidden md:block"}`}
                        id="navbar-search">
                        {/* <div className="relative mt-3 md:hidden">
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
                        </div> */}
                        <div className="w-full md:mx-auto flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <ul className="md:flex md:gap-8 md:justify-center md:w-full">
                                <li>
                                    <button
                                        onClick={() => {
                                            return setToggleMainMenu(false), navigate(MAIN_ROUTE);
                                        }}
                                        className={`block py-2 px-3 rounded md:p-0 ${
                                            location.pathname === MAIN_ROUTE
                                                ? "text-blue-600 dark:text-blue-500"
                                                : "text-gray-900 hover:text-blue-600 dark:text-white"
                                        }`}>
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`block py-2 px-3 rounded md:p-0 ${
                                            location.pathname === USER_ROUTE + "/" + user.userData?.id
                                                ? "text-blue-600 dark:text-blue-500"
                                                : "text-gray-900 hover:text-blue-600 dark:text-white"
                                        }`}
                                        onClick={() => onCheckLogIn()}>
                                        Account
                                    </button>
                                </li>
                            </ul>

                            <ul className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 md:gap-5 md:pr-5">
                                {user.isAuth ? (
                                    <>
                                        <li>
                                            {user.userData.role === "ADMIN" ? (
                                                <button
                                                    type="button"
                                                    className="my-2 mx-3 md:m-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        return setToggleMainMenu(false), navigate(ADMIN_ROUTE);
                                                    }}>
                                                    Admin panel
                                                </button>
                                            ) : null}
                                        </li>

                                        <li className="text-sm text-gray-500 dark:text-white hover:underline py-2 px-3 md:p-0">
                                            {user.userData?.email}
                                        </li>
                                        <li>
                                            <button
                                                className="text-sm text-blue-600 dark:text-blue-500 hover:underline py-2 px-3 md:p-0"
                                                onClick={() => logOut()}>
                                                Log out
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="dark:text-white">
                                        <button
                                            className="inline-flex text-sm text-blue-600 dark:text-blue-500 hover:underline py-2 px-3 md:p-0"
                                            onClick={() => {
                                                return setToggleMainMenu(false), navigate(LOGIN_ROUTE);
                                            }}>
                                            Login
                                        </button>
                                        /
                                        <button
                                            className="text-sm text-blue-600 dark:text-blue-500 hover:underline py-2 px-3 md:p-0"
                                            onClick={() => {
                                                return setToggleMainMenu(false), navigate(REGISTARTION_ROUTE);
                                            }}>
                                            Sign up
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {errorModal}
        </>
    );
});

export default NavBar;
