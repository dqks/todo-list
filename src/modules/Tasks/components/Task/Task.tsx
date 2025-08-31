import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"

type TaskProps = {
    title: string
    id: string
    onClick: (id: string) => void
}

export const Task = ({title, id, onClick}: TaskProps) => {
    return (
        <div className={classes.taskWrapper}>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button onClick={() => onClick(id)}>DONE</Button>
            </div>
        </div>
    )
}