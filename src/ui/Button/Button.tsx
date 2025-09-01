import classes from "./Button.module.css"
import type { CSSProperties } from "react";

type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    style?: CSSProperties
    disabled?: boolean
}

export const Button = ({children, style, onClick, disabled} : ButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={classes.button} style={style}>
            {children}
        </button>
    )
}