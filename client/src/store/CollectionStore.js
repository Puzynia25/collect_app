import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._category = ["Books", "Signs", "Vinyl", "Other"];
        this._collections = [
            {
                id: 6,
                name: "business",
                img: "ad2f4306-9cd1-4d7d-b065-7accd53c3110.jpg",
                userId: 1,
                category: "Books",
            },
            {
                id: 3,
                name: "Michael Jackson",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg",
                userId: 1,
                category: "Signs",
            },
            {
                id: 2,
                name: "20s",
                img: "https://i.discogs.com/eI4OnxVfgq-Vw71JUjOa7cFkOz-phqwgKjAfDSWqUU4/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgzMDcy/MjMtMTQ1OTA0MjE3/MS0yMjI4LmpwZWc.jpeg",
                userId: 1,
                category: "Vinyl",
            },
        ];
        makeAutoObservable(this);
    }

    setCategory(value) {
        this._category = value;
    }
    setCollections(collections) {
        this._collections = collections;
    }

    get category() {
        return this._category;
    }
    get collections() {
        return this._collections;
    }
}
