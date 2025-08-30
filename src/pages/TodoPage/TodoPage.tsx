import {Header} from "../../modules/Header/components/Header/Header.tsx";
import {Footer} from "../../modules/Footer/components/Footer/Footer.tsx";
import {Tasks} from "../../modules/Tasks";

export const TodoPage = () => {
    return (
        <>
            <Header/>
            <Tasks />
            <Footer/>
        </>
    )
}