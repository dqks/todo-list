import { Modal } from "../../../../ui/Modal/Modal.tsx";
import classes from "./TasksModal.module.css"
import { Button } from "../../../../ui/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { taskIsUnchecked, tasksAreShown } from "../../store/slice.ts";
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
    const [reorderTasks] = tasksAPI.useReorderTasksMutation()
    const checkedTasks = useAppSelector(getCheckedTasks)
    const dispatch = useAppDispatch()
    useCloseModal(() => tasksAreShown(null))

    const createTaskCb = useCallback((title: { title: string }) => {
        createTask({todoListId, ...title})
    }, [createTask, todoListId])

    const reorderTasksHandler = useCallback((
        putAfterItemId: string | null,
        taskIndex: number,
        taskId: string,
        isUp: boolean) => {
        if (taskIndex !== 1 && putAfterItemId) {
            reorderTasks({
                todoListId,
                taskId,
                putAfterItemId
            });
        } else if (taskIndex === 1 && isUp) {
            reorderTasks({
                todoListId,
                taskId,
                putAfterItemId: null
            })
        } else if (taskIndex === 1 && !isUp && tasks?.items.length !== 2) {
            reorderTasks({
                todoListId,
                taskId,
                putAfterItemId
            })
        }
    }, [reorderTasks, todoListId, tasks?.items.length])

    const closeModalHandler = () => {
        dispatch(tasksAreShown(null))
    }

    const onDeleteClick = () => {
        if (checkedTasks.length > 0) {
            for (const taskId of checkedTasks) {
                deleteTasks({todoListId, taskId})
                dispatch(taskIsUnchecked(taskId))
            }
        }
    }

    const areThereAnyTasks = tasks?.items && tasks.items.length > 0;

    return (
        <Modal onOutsideClick={closeModalHandler} contentStyle={TasksModalCSS}>
            <div className={classes.wrapper}>
                <div className={classes.buttonWrapper}>
                    <Button style={{float: "right"}} onClick={closeModalHandler}>
                        &#10006;
                    </Button>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.formWrapper}>
                        <AddElementForm buttonText={"Add Task"} createElement={createTaskCb}/>
                        {
                            areThereAnyTasks
                                && <Button onClick={onDeleteClick} style={{margin: "5px 0"}}>Delete Chosen Tasks</Button>
                        }
                    </div>
                    {
                        areThereAnyTasks &&
                            <div className={classes.tasksWrapper}>
                                {
                                    tasks.items.map((task,
                                        index: number) => <Task
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        // todoListId={todoListId}
                                        reorderTasksHandler={reorderTasksHandler}
                                        // tasksLength={tasks.items.length}
                                        previousTaskId={tasks.items[index + 1]?.id}
                                        nextTodoTaskId={tasks.items[index - 2]?.id}
                                        taskIndex={index}
                                    />)
                                }
                            </div>
                    }
                </div>
            </div>
        </Modal>
    )
})