import './App.css'
import { TodoPage } from "./pages/TodoPage/TodoPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

function App() {

    return (
        <div className="app-wrapper">
            <Provider store={store}>
                <TodoPage/>
            </Provider>
        </div>
    )
}

export default App
