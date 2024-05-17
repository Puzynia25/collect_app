import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._allCategories = [];
        this._selectedCategory = {};
        this._oneCollection = {};
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

    setOneCollection(collection) {
        this._oneCollection = collection;
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

    get oneCollection() {
        return this._oneCollection;
    }

    get allCollections() {
        return this._allCollections;
    }

    get totalCollectionsCount() {
        return this._totalCollectionsCount;
    }
}
