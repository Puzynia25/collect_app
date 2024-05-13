import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._userData = {
            id: 1,
            name: "Elsa",
            email: "admin@gmail.com",
            role: "ADMIN",
        };
        this._users = [
            {
                id: 1,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "ADMIN",
            },
            {
                id: 2,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "blocked",
                role: "USER",
            },
            {
                id: 3,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "USER",
            },
            {
                id: 4,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "USER",
            },
            {
                id: 5,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "USER",
            },
            {
                id: 6,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "USER",
            },
            {
                id: 7,
                name: "Vitalina",
                email: "vitalina@gmail.com",
                password: "vitalina",
                status: "active",
                role: "USER",
            },
        ];

        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUserData(user) {
        this._userData = user;
    }
    setUsers(users) {
        this._users = users;
    }

    get isAuth() {
        return this._isAuth;
    }
    get userData() {
        return this._userData;
    }
    get users() {
        return this._users;
    }
}
