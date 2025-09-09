import classes from "./Footer.module.css"
import { footerApi } from "../../api/api.ts";
import { AddElementForm } from "../../../../components/AddElementForm/AddElementForm.tsx";

export const Footer = () => {
    const [createTodo] = footerApi.useCreateTodoMutation()

    return (
        <footer className={classes.footerWrapper}>
            <AddElementForm createElement={createTodo}/>
        </footer>
    )
}