import classes from "./Task.module.css"
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { taskIsChecked, taskIsUnchecked } from "../../store/slice.ts";
import { Button } from "../../../../ui/Button/Button.tsx";

type TaskType = {
    id: string
    title: string
    previousTaskId: string
    nextTodoTaskId: string
    taskIndex: number
    reorderTasksHandler: (putAfterItemId: string | null,
        taskIndex: number,
        taskId: string,
        isUp: boolean) => void
}

export const Task = ({id, title, reorderTasksHandler, previousTaskId, nextTodoTaskId, taskIndex}: TaskType) => {
    const dispatch = useAppDispatch();
    return (
        <div className={classes.taskWrapper}>
            <div>
                <input className={classes.checkbox} type="checkbox" onChange={(e) => {
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
            <div>
                <Button
                    onClick={() => reorderTasksHandler(nextTodoTaskId,
                        taskIndex,
                        id,
                        true)}
                    style={{margin: "0 5px"}}>
                    &uarr;
                </Button>
                <Button
                    onClick={() => reorderTasksHandler(previousTaskId,
                        taskIndex,
                        id,
                        false)}>
                    &darr;
                </Button>
            </div>
        </div>
    )
}