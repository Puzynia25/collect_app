import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._userData = {};
        this._users = [];
        this._page = 1;
        this._totalCount = 0;
        this._limit = 10;

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

    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    setLimit(limit) {
        this._limit = limit;
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

    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
