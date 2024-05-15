import { makeAutoObservable } from "mobx";

export default class CollectionStore {
    constructor() {
        this._categoriesList = [];
        this._category = "";
        this._selectedCategory = "";
        this._collection = {};
        this._userCollectionsList = [];
        this._selectedCollection = {};
        this._collectionsList = [];
        makeAutoObservable(this);
    }

    setCategory(value) {
        this._category = value;
    }

    setCategoriesList(categoriesList) {
        this._categoriesList = categoriesList;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
    }

    setSelectedCollection(collection) {
        this._selectedCollection = collection;
    }

    setCollectionsList(collectionsList) {
        this._collectionsList = collectionsList;
    }

    setUserCollectionsList(userCollectionsList) {
        this._userCollectionsList = userCollectionsList;
    }

    setCollection(collection) {
        this._collection = collection;
    }

    get category() {
        return this._category;
    }

    get categoriesList() {
        return this._categoriesList;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedCollection() {
        return this._selectedCollection;
    }

    get collectionsList() {
        return this._collectionsList;
    }

    get userCollectionsList() {
        return this._userCollectionsList;
    }

    get collection() {
        return this._collection;
    }
}
