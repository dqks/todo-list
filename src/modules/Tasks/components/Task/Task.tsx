import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"
import { memo } from "react";
import type { TaskType } from "../../store/slice.ts";

type TaskProps = {
    title: string
    id: string
    deletingTaskInProgress: string[]
    nextTask: TaskType
    previousTask: TaskType
    taskIndex: number
    addedDate: Date
    onDoneClick: (id: string) => void
    onArrowClick: (id: string,
        nextTask: TaskType | null,
        taskIndex: number) => void
    onTaskClick: (taskText: TaskType) => void
}

export const Task = memo(({
    title,
    id,
    onDoneClick,
    deletingTaskInProgress,
    onArrowClick,
    nextTask,
    previousTask,
    taskIndex,
    onTaskClick,
    addedDate
}: TaskProps) => {
    return (
        <div onClick={() => onTaskClick({id, addedDate, order: 1, title} as TaskType)}
            className={classes.taskWrapper}>
            <div className={classes.buttonsWrapper}>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onArrowClick(id, nextTask, taskIndex)
                }}>
                    &uarr;
                </Button>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onArrowClick(id, previousTask, taskIndex)
                }}>
                    &darr;
                </Button>
            </div>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button disabled={deletingTaskInProgress.some(userId => userId === id)}
                    onClick={(e) => {
                        e.stopPropagation()
                        onDoneClick(id)
                    }}>DONE</Button>
            </div>
        </div>
    )
})