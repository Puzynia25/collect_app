import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._userData = {};
        this._users = [];

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
