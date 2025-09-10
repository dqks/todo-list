import classes from "./Task.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";

type TaskType = {
    id: string
    title: string
}

export const Task = ({id, title} : TaskType) => {
    return (
        <div className={classes.taskWrapper}>
            <div>
                <input type="checkbox" onChange={(e) => {
                    console.log(e.currentTarget)
                }} />
            </div>
            <p className={classes.title}>
                {title}
            </p>
        </div>
    )
}