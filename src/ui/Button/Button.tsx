import classes from "./Button.module.css"
import type { CSSProperties } from "react";

type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    style?: CSSProperties
    disabled?: boolean
    type?: "submit" | "reset" | "button"
}

export const Button = ({children, style, onClick, disabled, type}: ButtonProps) => {
    console.log("BUTTON RENDEr")
    return (
        <button type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes.button}
            style={style}
        >
            {children}
        </button>
    )
}