import { Modal } from "../../../../ui/Modal/Modal.tsx";
import classes from "./TasksModal.module.css"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { pageIsChanged, tasksAreShown } from "../../store/slice.ts";
import { type CSSProperties, memo, useCallback } from "react";
import { tasksAPI } from "../../api/api.ts";
import { Task } from "../Task/Task.tsx";
import { getCurrentPage } from "../../store/selectors.ts";
import { useCloseModal } from "../../hooks/useCloseModal.ts";
import { PreloaderWrapper } from "../../../../components/PreloaderWrapper/PreloaderWrapper.tsx";
import { Paginator } from "../../../../components/Paginator/Paginator.tsx";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm.tsx";

const TasksModalCSS = {
    justifyContent: "center",
} as CSSProperties

type TasksModalProps = {
    todoListId: string
}

export const TasksModal = memo(({todoListId}: TasksModalProps) => {
    const currentPage = useAppSelector(getCurrentPage)
    const {data: tasks, isLoading} = tasksAPI.useGetTasksPortionQuery({
        todoListId,
        count: 10,
        page: currentPage
    })

    const [reorderTasks] = tasksAPI.useReorderTasksMutation()
    const dispatch = useAppDispatch()
    useCloseModal(() => tasksAreShown(null))

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

    const setCurrentPage = useCallback((page: number) => {
        dispatch(pageIsChanged(page))
    }, [dispatch])

    const areThereAnyTasks = tasks?.items && tasks.items.length > 0;

    return (
        <Modal onOutsideClick={closeModalHandler} contentStyle={TasksModalCSS}>
            <div className={classes.wrapper}>
                <h2>Tasks</h2>
                <div className={classes.contentWrapper}>
                    <AddTaskForm todoListId={todoListId} areThereAnyTasks={areThereAnyTasks}/>
                    <PreloaderWrapper preloaderStyle={{width: "200px", height: "200px"}} isFetching={isLoading}>
                        {
                            areThereAnyTasks &&
                            <div className={classes.tasksWrapper}>
                                {
                                    tasks.items.map((task,
                                        index: number) => <Task
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        reorderTasksHandler={reorderTasksHandler}
                                        previousTaskId={tasks.items[index + 1]?.id}
                                        nextTodoTaskId={tasks.items[index - 2]?.id}
                                        taskIndex={index}
                                    />)
                                }
                                {
                                    tasks.totalCount > 10 && <Paginator
                                        portionSize={5}
                                        pageSize={10}
                                        totalTasksCount={tasks.totalCount}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                }
                            </div>
                        }
                    </PreloaderWrapper>
                </div>
            </div>
        </Modal>
    )
})