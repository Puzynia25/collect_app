import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._userData = {};
        this._users = [];
        this._ticketList = [];

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
    setTicketList(ticketList) {
        this._ticketList = ticketList;
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
    get ticketList() {
        return this._ticketList;
    }
}
