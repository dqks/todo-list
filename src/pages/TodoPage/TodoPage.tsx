import {Header} from "../../modules/Header";
import {Footer} from "../../modules/Footer";
import {Tasks} from "../../modules/Tasks";
import { Auth } from "../../modules/Auth/components/Auth/Auth.tsx";

export const TodoPage = () => {
    return (
        <Auth>
            <Header/>
            <Tasks />
            <Footer/>
        </Auth>
    )
}