import classes from "./Footer.module.css"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm.tsx";

export const Footer = () => {
    return (
        <footer className={classes.footerWrapper}>
            <AddTaskForm/>
        </footer>
    )
}