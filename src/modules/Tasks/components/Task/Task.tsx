import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"
import { memo } from "react";
import type { TaskType } from "../../store/slice.ts";

type TaskProps = {
    title: string
    id: string
    deletingTaskInProgress: string[]
    order: number
    onClick: (id: string) => void
    onArrowClick: (id: string, nextTask: TaskType | null) => void
    nextTask: TaskType
    previousTask: TaskType
    taskIndex: number
}

export const Task = memo(({
    title,
    id,
    onClick,
    deletingTaskInProgress,
    onArrowClick,
    nextTask,
    previousTask,
    taskIndex
}: TaskProps) => {
    return (
        <div className={classes.taskWrapper}>
            <div className={classes.buttonsWrapper}>
                <Button onClick={() => {
                    if (taskIndex !== 1) {
                        onArrowClick(id, nextTask)
                    } else {
                        onArrowClick(id, null)
                    }
                }}>&uarr;</Button>
                <Button onClick={() => {
                    onArrowClick(id, previousTask)
                }}>&darr;</Button>
            </div>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button disabled={deletingTaskInProgress.some(userId => userId === id)}
                    onClick={() => onClick(id)}>DONE</Button>
            </div>
        </div>
    )
})