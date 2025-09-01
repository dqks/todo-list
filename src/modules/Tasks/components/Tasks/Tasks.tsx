import { Task } from "../Task/Task.tsx";
import { taskIsDeleting, type TaskType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getDeletingTasksInProgress } from "../../store/selectors.ts";

export const Tasks = () => {
    const {data: tasks, isLoading} = tasksAPI.useFetchAllTasksQuery()
    const [deleteTask] = tasksAPI.useDeleteTaskMutation()
    const deletingTaskInProgress = useAppSelector(getDeletingTasksInProgress)
    const dispatch = useAppDispatch();

    //TODO кнопка становится активной в самый последний момент перед удалением
    const deleteTaskHandler = useCallback((id: string) => {
        dispatch(taskIsDeleting(true, id))
        deleteTask(id).then(() => {
            dispatch(taskIsDeleting(false, id))
        })
    }, [deleteTask, dispatch])

    return (
        <div>
            {
                isLoading
                    ? <Preloader style={{width: "300px", height: "300px"}}/>
                    : tasks?.map((task: TaskType) => <Task
                        deletingTaskInProgress={deletingTaskInProgress}
                        id={task.id}
                        onClick={deleteTaskHandler} title={task.title}
                        key={task.id}
                    />)
            }
        </div>
    )
}