import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Footer.module.css"
import { useState } from "react";
import { footerApi } from "../../api/api.ts";

export const Footer = () => {
    const [inputValue, setInputValue] = useState("");
    const [createTask] = footerApi.useCreateTaskMutation()

    return (
        <footer className={classes.footerWrapper}>
            <div>
                <input onChange={e => setInputValue(e.target.value)} className={classes.input} value={inputValue}
                    type="text"/>
            </div>
            <Button onClick={() => {
                if (inputValue !== "") {
                    createTask({title: inputValue})
                    setInputValue("")
                }
            }}>Add</Button>
        </footer>
    )
}