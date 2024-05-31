import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTARTION_ROUTE, USER_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Button } from "flowbite-react";
import ErrorMessage from "../components/modals/ErrorMessage";

const Auth = observer(() => {
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
            return setErrorMessage(e.response.data.message), setError(true);
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
            setNameError("Name cannot be empty");
        } else setNameError("");
    };

    const onChangeEmail = (value) => {
        setEmail(value);
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
            setEmailError("Invalid email");
        } else setEmailError("");
    };

    const onChangePassword = (value) => {
        setPassword(value);

        if (value.length < 3) {
            setPasswordError("At least 3 characters");
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
                                Your Email
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
                                    placeholder="name@gmail.com"
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
                                Your password
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
                            <p className="inline-block dark:text-gray-400">Don't have an account? </p>

                            <button
                                type="submit"
                                onClick={() => navigate(REGISTARTION_ROUTE)}
                                className="ms-2 text-sm text-blue-600 dark:text-blue-500 hover:underline">
                                sign up
                            </button>
                        </div>
                        <Button color="blue" onClick={click} disabled={!formValid}>
                            Log in
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your name
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
                                Your Email
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
                                    placeholder="name@gmail.com"
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
                                Your password
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
                        <Button color="blue" onClick={click} disabled={!formValid}>
                            Sign up
                        </Button>
                    </>
                )}
            </form>
            {errorModal}
        </div>
    );
});

export default Auth;
