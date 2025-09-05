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
    const [reorderTasks] = tasksAPI.useReorderTasksMutation()
    const deletingTaskInProgress = useAppSelector(getDeletingTasksInProgress)
    const dispatch = useAppDispatch();

    const deleteTaskHandler = useCallback((id: string) => {
        dispatch(taskIsDeleting(true, id))
        deleteTask(id).then(() => {
            dispatch(taskIsDeleting(false, id))
        })
    }, [deleteTask, dispatch])

    const reorderTaskHandler = useCallback((id: string, task : TaskType) => {
        if (task) {
            console.log(task)
            reorderTasks({
                todoListId: id,
                putAfterItemId: task.id
            });
        } else {
            console.log("Task is undefined")
        }

    }, [reorderTasks])

    //previousTask - стрелка вниз
    //nextTask - стрелка вверх

    return (
        <div>
            {
                isFetching
                    ? <Preloader style={{width: "100px", height: "100px"}}/>
                    : tasks?.length !== 0 && tasks
                        ? tasks?.map((task: TaskType, index : number) => <Task
                            previousTask={tasks[index + 1]}
                            nextTask={tasks[index - 2]}
                            order={task.order}
                            deletingTaskInProgress={deletingTaskInProgress}
                            id={task.id}
                            onClick={deleteTaskHandler} title={task.title}
                            key={task.id}
                            onArrowClick={reorderTaskHandler}

                        />)
                        : <h2> There are no tasks ... yet</h2>
            }
        </div>
    )
}