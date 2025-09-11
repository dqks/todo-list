import classes from "./Task.module.css"
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { taskIsChecked, taskIsUnchecked } from "../../store/slice.ts";

type TaskType = {
    id: string
    title: string
}

export const Task = ({id, title}: TaskType) => {
    const dispatch = useAppDispatch();
    return (
        <div className={classes.taskWrapper}>
            <div>
                <input type="checkbox" onChange={(e) => {
                    if (e.currentTarget.checked) {
                        dispatch(taskIsChecked(id))
                    } else {
                        dispatch(taskIsUnchecked(id))
                    }
                }}/>
            </div>
            <p className={classes.title}>
                {title}
            </p>
        </div>
    )
}