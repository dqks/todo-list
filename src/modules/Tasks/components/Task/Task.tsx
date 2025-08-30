import {Button} from "../../../../ui/Button/Button.tsx";
import classes from "./Task.module.css"

type TaskProps = {
    title: string
    id?: number
}

export const Task = ({title} : TaskProps) => {
    return (
        <div className={classes.taskWrapper}>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                {/*<input type="checkbox"/>*/}
                <Button>DONE</Button>
            </div>
        </div>
    )
}