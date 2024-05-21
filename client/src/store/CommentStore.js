import { makeAutoObservable } from "mobx";

export default class CommentStore {
    constructor() {
        this._comments = [
            {
                id: 1,
                author: "Angelina Jolie",
                email: "a.jolie@gmail.com",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem nulla. Donec consequat urna a tortor sagittis lobortis.",
            },
            {
                id: 2,
                author: "Lady Gaga",
                email: "l.gaga@gmail.com",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem nulla. Donec consequat urna a tortor sagittis lobortis.",
            },
            {
                id: 3,
                author: "Eva Mendes",
                email: "e.mendes@gmail.com",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem nulla. Donec consequat urna a tortor sagittis lobortis.",
            },
        ];
        makeAutoObservable(this);
    }

    setComments(comments) {
        this._comments = comments;
    }

    get comments() {
        return this._comments;
    }
}
