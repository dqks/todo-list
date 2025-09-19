import './App.css'
import { TodoPage } from "./pages/TodoPage/TodoPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router";

function App() {

    return (
        <div className="app-wrapper">
            <Provider store={store}>
                <BrowserRouter>
                    <TodoPage/>
                </BrowserRouter>
            </Provider>
        </div>
    )
}

export default App
