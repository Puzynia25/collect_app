import { makeAutoObservable } from "mobx";

export default class ItemStore {
    constructor() {
        // this._category = ["Books", "Signs", "Vinyl", "Other"];
        this._items = [];
        makeAutoObservable(this);
    }

    setItems(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }
}
