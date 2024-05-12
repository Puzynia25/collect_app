import { makeAutoObservable } from "mobx";

export default class ItemStore {
    constructor() {
        // this._category = ["Books", "Signs", "Vinyl", "Other"];
        this._items = [
            {
                id: 1,
                name: "A Song of Ice and Fire",
                tags: ["fantasy", "georgemartin", "books"],
                likes: 0,
                collectionId: 1,
            },
            {
                id: 2,
                name: "A Dance with Dragons",
                tags: ["fantasy", "georgemartin", "dragons"],
                likes: 8,
                collectionId: 1,
            },
            {
                id: 3,
                name: "The Winds of Winter",
                tags: ["fantasy", "georgemartin", "winter"],
                likes: 76,
                collectionId: 1,
            },
        ];
        makeAutoObservable(this);
    }

    setItem(items) {
        this._items = items;
    }

    get items() {
        return this._items;
    }
}
