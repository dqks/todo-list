import classes from "./Modal.module.css"
import type { CSSProperties } from "react";

type ModalProps = {
    children: React.ReactNode
    wrapperStyle?: CSSProperties
    contentStyle?: CSSProperties
}

export const Modal = ({children, wrapperStyle, contentStyle}: ModalProps) => {
    return (
        <div style={wrapperStyle} className={classes.wrapper}>
            <div style={contentStyle} className={classes.content}>
                {children}
            </div>
        </div>
    )
}