import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container mx-auto">
                <NavBar />
                <AppRouter />
            </div>
        </BrowserRouter>
    );
};

export default App;
