import {Header} from "../../modules/Header";
import {Footer} from "../../modules/Footer";
import {TodoLists} from "../../modules/Tasks";
import { Auth } from "../../modules/Auth";

export const TodoPage = () => {
    return (
        <Auth>
            <Header/>
            <TodoLists />
            <Footer/>
        </Auth>
    )
}