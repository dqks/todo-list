import classes from "./Footer.module.css"
import { AddTodoListForm } from "../AddTodoListForm/AddTodoListForm.tsx";

export const Footer = () => {
    return (
        <footer className={classes.footerWrapper}>
            <AddTodoListForm/>
        </footer>
    )
}