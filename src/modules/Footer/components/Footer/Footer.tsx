import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Footer.module.css"
import { useState } from "react";
import { footerApi } from "../../api/api.ts";
import { Input } from "../../../../ui/Input/Input.tsx";

export const Footer = () => {
    const [inputValue, setInputValue] = useState("");
    const [createTask] = footerApi.useCreateTaskMutation()

    return (
        <footer className={classes.footerWrapper}>
            <div>
                <Input onChange={e => setInputValue(e.target.value)} value={inputValue}
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