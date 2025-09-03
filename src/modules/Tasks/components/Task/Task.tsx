import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"

type TaskProps = {
    title: string
    id: string
    onClick: (id: string) => void
    deletingTaskInProgress: string[]
    order: number
}

export const Task = ({title, id, onClick, deletingTaskInProgress, order}: TaskProps) => {
    return (
        <div className={classes.taskWrapper}>
            <span>{order}</span>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button disabled={deletingTaskInProgress.some(userId => userId === id)} onClick={() => onClick(id)}>DONE</Button>
            </div>
        </div>
    )
}