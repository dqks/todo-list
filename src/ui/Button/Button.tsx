import classes from "./Button.module.css"
import type { CSSProperties } from "react";

type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    style?: CSSProperties
    disabled?: boolean
    type?: "submit" | "reset" | "button"
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({children, style, onClick, disabled, type, onSubmit}: ButtonProps) => {
    return (
        <button type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes.button}
            style={style}
            onScroll={onSubmit}
        >
            {children}
        </button>
    )
}