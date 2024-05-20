import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._allCategories = [];
        this._selectedCategory = {};
        this._allCollections = [];
        this._totalCollectionsCount = 0;
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

    setTotalCollectionsCount(count) {
        this._totalCollectionsCount = count;
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

    get totalCollectionsCount() {
        return this._totalCollectionsCount;
    }
}
