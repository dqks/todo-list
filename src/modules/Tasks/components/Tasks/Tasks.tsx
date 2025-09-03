import { Task } from "../Task/Task.tsx";
import { taskIsDeleting, type TaskType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getDeletingTasksInProgress } from "../../store/selectors.ts";

export const Tasks = () => {
    const {data: tasks, isFetching} = tasksAPI.useFetchAllTasksQuery()
    const [deleteTask] = tasksAPI.useDeleteTaskMutation()
    const deletingTaskInProgress = useAppSelector(getDeletingTasksInProgress)
    const dispatch = useAppDispatch();

    const deleteTaskHandler = useCallback((id: string) => {
        dispatch(taskIsDeleting(true, id))
        deleteTask(id).then(() => {
            dispatch(taskIsDeleting(false, id))
        })
    }, [deleteTask, dispatch])

    return (
        <div>
            {
                isFetching
                    ? <Preloader style={{width: "100px", height: "100px"}}/>
                    : tasks?.length !== 0
                        ? tasks?.map((task: TaskType) => <Task
                            order={task.order}
                            deletingTaskInProgress={deletingTaskInProgress}
                            id={task.id}
                            onClick={deleteTaskHandler} title={task.title}
                            key={task.id}/>)
                        : <h2> There are no tasks ... yet</h2>
            }
        </div>
    )
}