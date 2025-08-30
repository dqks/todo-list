import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Footer.module.css"
import { useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { newTaskTextAdded } from "../../store/slice.ts";

export const Footer = () => {
    const [inputValue, setInputValue] = useState("");

    const dispatch = useAppDispatch();

    return (
        <footer className={classes.footerWrapper}>
            <div>
                <input onChange={e => setInputValue(e.target.value)} className={classes.input} value={inputValue}
                    type="text"/>
            </div>
            <Button onClick={() => {
                if (inputValue !== "") {
                    dispatch(newTaskTextAdded(inputValue))
                    setInputValue("")
                }
            }}>Add</Button>
        </footer>
    )
}