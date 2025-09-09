import classes from "./Task.module.css"

type TaskType = {
    id: string
    title: string
}

export const Task = ({id, title} : TaskType) => {
    return (
        <div className={classes.taskWrapper}>
            <p className={classes.title}>
                {title}
            </p>
        </div>
    )
}