import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import CollectionStore from "./store/CollectionStore";
import ItemStore from "./store/ItemStore";
import ModalStore from "./store/ModalStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            collection: new CollectionStore(),
            item: new ItemStore(),
            modal: new ModalStore(),
        }}>
        <App />
    </Context.Provider>
);
