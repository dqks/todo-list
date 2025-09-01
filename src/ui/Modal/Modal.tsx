import classes from "./Modal.module.css"

type ModalProps = {
    children: React.ReactNode
}

export const Modal = ({children}: ModalProps) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}