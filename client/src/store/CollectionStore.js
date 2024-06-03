import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._allCategories = [];
        this._selectedCategory = {};
        this._allCollections = [];
        makeAutoObservable(this);
    }

    setAllCategories(categories) {
        this._allCategories = categories;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setAllCollections(collections) {
        this._allCollections = collections;
    }

    get allCategories() {
        return this._allCategories;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get allCollections() {
        return this._allCollections;
    }
}
