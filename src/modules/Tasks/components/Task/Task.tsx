import classes from "./Task.module.css"

type TaskType = {
    id: string
    title: string
    description: string
}

export const Task = ({id, title, description} : TaskType) => {
    return (
        <div>
            <p>
                {description}
            </p>
        </div>
    )
}