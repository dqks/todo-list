import classes from "./Button.module.css"
import type { CSSProperties } from "react";

type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    style?: CSSProperties
}

export const Button = ({children, style, onClick} : ButtonProps) => {
    return (
        <button onClick={onClick} className={classes.button} style={style}>
            {children}
        </button>
    )
}