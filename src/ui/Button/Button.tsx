import classes from "./Button.module.css"

type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    style?: object
}

export const Button = ({children, style, onClick} : ButtonProps) => {
    return (
        <button onClick={onClick} className={classes.button} style={style}>
            {children}
        </button>
    )
}