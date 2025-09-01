import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"

type TaskProps = {
    title: string
    id: string
    onClick: (id: string) => void
    deletingTaskInProgress: string[]
}

export const Task = ({title, id, onClick, deletingTaskInProgress}: TaskProps) => {
    return (
        <div className={classes.taskWrapper}>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button disabled={deletingTaskInProgress.some(userId => userId === id)} onClick={() => onClick(id)}>DONE</Button>
            </div>
        </div>
    )
}