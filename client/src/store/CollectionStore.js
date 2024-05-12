import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._category = ["Books", "Signs", "Vinyl", "Other"];
        this._collections = [
            {
                id: 6,
                name: "business",
                description:
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRT8nTAwMcM0IJlyvBV1ruhY7VwThVdJLq7BBtYMqrSFKbNNR4U",
                userId: 1,
                category: "Books",
            },
            {
                id: 3,
                name: "Michael Jackson",
                description:
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg",
                userId: 1,
                category: "Signs",
            },
            {
                id: 2,
                name: "20s",
                description:
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                img: "https://i.discogs.com/eI4OnxVfgq-Vw71JUjOa7cFkOz-phqwgKjAfDSWqUU4/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgzMDcy/MjMtMTQ1OTA0MjE3/MS0yMjI4LmpwZWc.jpeg",
                userId: 1,
                category: "Vinyl",
            },
            {
                id: 9,
                name: "business",
                description:
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRT8nTAwMcM0IJlyvBV1ruhY7VwThVdJLq7BBtYMqrSFKbNNR4U",
                userId: 1,
                category: "Books",
            },
            {
                id: 1,
                name: "Michael Jackson",
                description:
                    "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg",
                userId: 1,
                category: "Signs",
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
