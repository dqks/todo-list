import { Task } from "../Task/Task.tsx";
import { setSelectedTask, taskIsDeleting, type TaskType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getDeletingTasksInProgress, getSelectedTask } from "../../store/selectors.ts";
import { TaskModal } from "../TaskModal/TaskModal.tsx";

export const Tasks = () => {
    const {data: tasks, isFetching} = tasksAPI.useFetchAllTasksQuery()
    const [deleteTask] = tasksAPI.useDeleteTaskMutation()
    const [reorderTasks] = tasksAPI.useReorderTasksMutation()
    const deletingTaskInProgress = useAppSelector(getDeletingTasksInProgress)
    const selectedTask = useAppSelector(getSelectedTask)
    const dispatch = useAppDispatch();

    const deleteTaskHandler = useCallback((id: string) => {
        dispatch(taskIsDeleting(true, id))
        deleteTask(id).then(() => {
            dispatch(taskIsDeleting(false, id))
        })
    }, [deleteTask, dispatch])

    const reorderTaskHandler = useCallback((id: string,
        task: TaskType | null,
        taskIndex: number) => {
        if (taskIndex !== 1 && task) {
            console.log(task)
            reorderTasks({
                todoListId: id,
                putAfterItemId: task.id
            });
        } else if (taskIndex === 1) {
            reorderTasks({
                todoListId: id,
                putAfterItemId: null
            });
        }
    }, [reorderTasks])

    const taskClickHandler = useCallback((task: TaskType) => {
        dispatch(setSelectedTask(task))
    }, [dispatch])

    //nextTask - стрелка вверх
    //previousTask - стрелка вниз
    return (
        <div>
            {
                isFetching
                    ? <Preloader style={{width: "100px", height: "100px"}}/>
                    : tasks?.length !== 0 && tasks
                        ? <>
                            {selectedTask && <TaskModal taskText={selectedTask.title}/>}
                            {tasks?.map((task: TaskType,
                                index: number) => <Task
                                onTaskClick={taskClickHandler}
                                taskIndex={index}
                                previousTask={tasks[index + 1]}
                                nextTask={tasks[index - 2]}
                                deletingTaskInProgress={deletingTaskInProgress}
                                id={task.id}
                                onDoneClick={deleteTaskHandler} title={task.title}
                                key={task.id}
                                addedDate={task.addedDate}
                                onArrowClick={reorderTaskHandler}
                            />)}
                        </>
                        : <h2> There are no tasks ... yet</h2>
            }
        </div>
    )
}