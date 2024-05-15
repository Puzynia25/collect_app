import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._allCategories = [];
        this._selectedCategory = {};
        this._collection = {};
        this._allCollections = [];
        this._totalCollectionsCount = 0;
        this._userCollectionList = [];
        makeAutoObservable(this);
    }

    setAllCategories(categories) {
        this._allCategories = categories;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setCollection(collection) {
        this._collection = collection;
    }

    setAllCollections(collections) {
        this._allCollections = collections;
    }

    setTotalCollectionsCount(count) {
        this._totalCollectionsCount = count;
    }

    setUserCollectionList(list) {
        this._userCollectionList = list;
    }

    get allCategories() {
        return this._allCategories;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get collection() {
        return this._collection;
    }

    get allCollections() {
        return this._allCollections;
    }

    get totalCollectionsCount() {
        return this._totalCollectionsCount;
    }

    get userCollectionList() {
        return this._userCollectionList;
    }
}
