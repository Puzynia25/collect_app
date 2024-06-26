import React, { useContext, useEffect, useState } from "react";
import { Context } from "../utils/context";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTARTION_ROUTE, USER_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Button } from "flowbite-react";
import ErrorMessage from "../components/modals/ErrorMessage";
import { useTranslation } from "react-i18next";

const Auth = observer(() => {
    const { t } = useTranslation();
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("Name cannot be empty");
    const [nameDirty, setNameDirty] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [emailDirty, setEmailDirty] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onHideError = () => {
        setError(false);
    };

    useEffect(() => {
        if (passwordError || emailError) {
            setFormValid(false);
        } else setFormValid(true);
    }, [nameError, passwordError, emailError]);

    const click = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, email, password);
            }

            user.setUserData(data);
            user.setIsAuth(true);
            navigate(USER_ROUTE + "/" + user.userData.id);
        } catch (e) {
            return setErrorMessage(t(e.response.data.message)), setError(true);
        } finally {
            setLoading(false);
        }
    };

    const onBlur = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true);
                break;
            case "email":
                setEmailDirty(true);
                break;
            case "password":
                setPasswordDirty(true);
                break;
        }
    };

    const onChangeName = (value) => {
        setName(value);

        if (value.length === 0) {
            setNameError(t("Name cannot be empty"));
        } else setNameError("");
    };

    const onChangeEmail = (value) => {
        setEmail(value);
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
            setEmailError(t("Invalid email"));
        } else setEmailError("");
    };

    const onChangePassword = (value) => {
        setPassword(value);

        if (value.length < 3) {
            setPasswordError(t("At least 3 characters"));
        } else setPasswordError("");
    };

    const errorModal = error ? <ErrorMessage message={errorMessage} show={error} onHide={() => onHideError()} /> : null;

    return (
        <div className="mt-8">
            <form className="max-w-sm mx-auto border border-gray-300 dark:border-gray-600 rounded-3xl p-5">
                {isLogin ? (
                    <>
                        <div className="mb-5">
                            <label
                                htmlFor="email-address-icon"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={
                                        emailDirty && emailError
                                            ? "bg-red-50 border border-red-500 text-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
                                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    }
                                    placeholder={`${t("name")}@gmail.com`}
                                    value={email}
                                    onChange={(e) => onChangeEmail(e.target.value)}
                                    onBlur={(e) => onBlur(e)}
                                    required
                                />
                            </div>
                            {emailDirty && emailError ? (
                                <p className=" mt-2 text-sm text-red-600 dark:text-red-500">{emailError}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {t("Password")}
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={
                                    passwordDirty && passwordError
                                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                }
                                value={password}
                                onChange={(e) => onChangePassword(e.target.value)}
                                onBlur={(e) => onBlur(e)}
                                required
                            />
                            {passwordDirty && passwordError ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{passwordError}</p>
                            ) : null}
                        </div>
                        <div className="my-4" style={{ fontSize: "small" }}>
                            <p className="inline-block dark:text-gray-400">{t("Don't have an account?")} </p>

                            <button
                                type="submit"
                                onClick={() => navigate(REGISTARTION_ROUTE)}
                                className="ms-2 text-sm text-blue-600 dark:text-blue-500 hover:underline">
                                {t("Sign up")}
                            </button>
                        </div>
                        {!loading ? (
                            <Button color="blue" onClick={click} disabled={!formValid}>
                                {t("Log in")}
                            </Button>
                        ) : (
                            <button
                                disabled
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Loading...
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {t("Name")}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={
                                    nameDirty && nameError
                                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                }
                                value={name}
                                onBlur={(e) => onBlur(e)}
                                onChange={(e) => onChangeName(e.target.value)}
                                required
                            />
                            {nameDirty && nameError ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{nameError}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email-address-icon"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email-address-icon"
                                    name="email"
                                    className={
                                        emailDirty && emailError
                                            ? "bg-red-50 border border-red-500 text-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
                                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    }
                                    placeholder={`${t("name")}@gmail.com`}
                                    value={email}
                                    onChange={(e) => onChangeEmail(e.target.value)}
                                    onBlur={(e) => onBlur(e)}
                                    required
                                />
                            </div>
                            {emailDirty && emailError ? (
                                <p className=" mt-2 text-sm text-red-600 dark:text-red-500">{emailError}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {t("Password")}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={
                                    passwordDirty && passwordError
                                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full ps-10 p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                }
                                value={password}
                                onChange={(e) => onChangePassword(e.target.value)}
                                onBlur={(e) => onBlur(e)}
                                required
                            />
                            {passwordDirty && passwordError ? (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{passwordError}</p>
                            ) : null}
                        </div>
                        {!loading ? (
                            <Button color="blue" onClick={click} disabled={!formValid}>
                                {t("Sign up")}
                            </Button>
                        ) : (
                            <button
                                disabled
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                {t("Loading")}...
                            </button>
                        )}
                    </>
                )}
            </form>
            {errorModal}
        </div>
    );
});

export default Auth;
