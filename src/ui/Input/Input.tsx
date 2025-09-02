import classes from "./Input.module.css"
import type { CSSProperties } from "react";

type InputType = {
    type: string
    placeholder?: string
    name?: string
    style?: CSSProperties
    onChange? :  (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number | string | boolean
    id?: string
}

export const Input = ({type, placeholder, name, style, onChange, value, id}: InputType) => {
    return (
        <>
            <input className={classes.input}
                type={type}
                placeholder={placeholder}
                name={name}
                style={style}
                onChange={onChange}
                value={value}
                id={id}
            />
        </>
    )
}