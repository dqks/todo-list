import classes from "./Modal.module.css"
import { type CSSProperties, useEffect, useRef } from "react";

type ModalProps = {
    children: React.ReactNode
    wrapperStyle?: CSSProperties
    contentStyle?: CSSProperties
    onOutsideClick?: () => void;
}

export const Modal = ({children, wrapperStyle, contentStyle, onOutsideClick}: ModalProps) => {
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (onOutsideClick) {
            const clickHandler = (event: MouseEvent) => {
                if (componentRef.current && componentRef.current === event.target) {
                    onOutsideClick()
                }
            }
            document.addEventListener("click", clickHandler)
            return () => {
                document.removeEventListener("click", clickHandler)
            }
        }
    }, [onOutsideClick]);

    return (
        <div ref={componentRef} style={wrapperStyle} className={classes.wrapper}>
            <div style={contentStyle} className={classes.content}>
                {children}
            </div>
        </div>
    )
}