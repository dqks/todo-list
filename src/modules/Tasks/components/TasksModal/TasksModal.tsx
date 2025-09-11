import { Modal } from "../../../../ui/Modal/Modal.tsx";
import classes from "./TasksModal.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { tasksAreShown } from "../../store/slice.ts";
import { type CSSProperties, memo, useCallback } from "react";
import { tasksAPI } from "../../api/api.ts";
import { Task } from "../Task/Task.tsx";
import { AddElementForm } from "../../../../components/AddElementForm/AddElementForm.tsx";
import { getCheckedTasks } from "../../store/selectors.ts";
import { useCloseModal } from "../../hooks/useCloseModal.ts";

const TasksModalCSS = {
    justifyContent: "center",
} as CSSProperties

type TasksModalProps = {
    todoListId: string
}

export const TasksModal = memo(({todoListId}: TasksModalProps) => {
    const {data: tasks} = tasksAPI.useGetTasksPortionQuery(todoListId)
    const [createTask] = tasksAPI.useCreateTaskMutation()
    const [deleteTasks] = tasksAPI.useDeleteTaskMutation()
    const checkedTasks = useAppSelector(getCheckedTasks)
    const dispatch = useAppDispatch()

    useCloseModal(() => tasksAreShown(null))

    const createTaskCb = useCallback((title: { title: string }) => {
        createTask({todoListId, ...title})
    }, [createTask, todoListId])

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
                <div className={classes.buttonWrapper}>
                    <Button style={{float: "right"}} onClick={onButtonClick}>
                        &#10006;
                    </Button>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.formWrapper}>
                        <AddElementForm createElement={createTaskCb}/>
                        <Button onClick={onDeleteClick} style={{margin: "5px 0"}}>Delete Chosen Tasks</Button>
                    </div>
                    {
                        tasks?.items && tasks.items.length > 0
                            ?
                            <div className={classes.tasksWrapper}>
                                {
                                    tasks.items.map((task) => <Task
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}/>)
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </Modal>
    )
})