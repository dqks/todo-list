import {Header} from "../../modules/Header";
import {Footer} from "../../modules/Footer";
import {Tasks} from "../../modules/Tasks";
import { Auth } from "../../modules/Auth";

export const TodoPage = () => {
    return (
        <Auth>
            <Header/>
            <Tasks />
            <Footer/>
        </Auth>
    )
}