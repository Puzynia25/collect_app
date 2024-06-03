import { makeAutoObservable } from "mobx";

export default class PagesStore {
    constructor() {
        this._page = 1;
        this._totalCount = 0;
        this._limit = 10;
        makeAutoObservable(this);
    }

    setPage(page) {
        this._page = page;
    }
    incrementPage() {
        this._page += 1;
    }
    decrementPage() {
        this._page -= 1;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    setLimit = (limit) => {
        this._limit = limit;
    };

    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
