import { Modal } from "../../../../ui/Modal/Modal.tsx";
import classes from "./TasksModal.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { tasksAreShown } from "../../store/slice.ts";
import { type CSSProperties, useCallback } from "react";
import { tasksAPI } from "../../api/api.ts";
import { Task } from "../Task/Task.tsx";
import { AddElementForm } from "../../../../components/AddElementForm/AddElementForm.tsx";
import { getCheckedTasks } from "../../store/selectors.ts";

const TasksModalCSS = {
    justifyContent: "center",
} as CSSProperties

type TasksModalProps = {
    todoListId: string
}

export const TasksModal = ({todoListId}: TasksModalProps) => {
    const {data: tasks} = tasksAPI.useGetTasksPortionQuery(todoListId)
    const [createTask] = tasksAPI.useCreateTaskMutation()
    const [deleteTasks] = tasksAPI.useDeleteTaskMutation()
    const checkedTasks = useAppSelector(getCheckedTasks)

    const createTaskCb = useCallback((title: { title: string }) => {
        createTask({todoListId, ...title})
    }, [createTask, todoListId])

    const dispatch = useAppDispatch()
    const onButtonClick = () => {
        dispatch(tasksAreShown(null))
    }

    const onDeleteClick = () => {
        if (checkedTasks.length > 0) {
            for (const taskId of checkedTasks) {
                deleteTasks({todoListId, taskId})
            }
        }
    }

    return (
        <Modal contentStyle={TasksModalCSS}>
            <div className={classes.wrapper}>
                <Button style={{position: "relative", bottom: "40px", left: "420px"}}
                    onClick={onButtonClick}>
                    &#10006;
                </Button>
                <div className={classes.contentWrapper}>
                    <div className={classes.formWrapper}>
                        <AddElementForm createElement={createTaskCb}/>
                        <Button onClick={onDeleteClick} style={{margin: "5px 0"}}>Delete Chosen Tasks</Button>
                    </div>
                    <div>
                        <h2>Tasks</h2>
                        <div className={classes.tasksWrapper}>
                            {
                                tasks?.items && tasks.items.length > 0
                                    ? tasks.items.map((task) => <Task
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                    />)
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}