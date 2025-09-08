import { Modal } from "../../../../ui/Modal/Modal.tsx";
import classes from "./TasksModal.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { tasksAreShown } from "../../store/slice.ts";
import type { CSSProperties } from "react";
import { tasksAPI } from "../../api/api.ts";
import { Task } from "../Task/Task.tsx";

const TasksModalCSS = {
    width: "700px",
    height: "300px",
    justifyContent: "center",
} as CSSProperties

type TasksModalProps = {
    todoListId: string
}

export const TasksModal = ({todoListId}: TasksModalProps) => {
    const {data: tasks} = tasksAPI.useGetTasksPortionQuery(todoListId)
    const dispatch = useAppDispatch()
    const onButtonClick = () => {
        dispatch(tasksAreShown(null))
    }

    return (
        <Modal contentStyle={TasksModalCSS}>
            <div className={classes.wrapper}>
                <Button style={{position: "relative", bottom: "40px", left: "350px"}}
                    onClick={onButtonClick}>
                    &#10006;
                </Button>
                <h2>Tasks</h2>
                <div className={classes.tasksWrapper}>
                    {
                        tasks && tasks.length > 0
                            ? tasks?.map((task) => <Task
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                            />)
                            : null
                    }
                </div>
            </div>
        </Modal>
    )
}