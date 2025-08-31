import { Task } from "../Task/Task.tsx";
import type { TaskType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";

export const Tasks = () => {
    const {data: tasks, isLoading} = tasksAPI.useFetchAllTasksQuery()
    const [deleteTask] = tasksAPI.useDeleteTaskMutation()

    //TODO добавить индикацию, что сейчас удалится таска
    const deleteTaskHandler = useCallback((id: string) => {
        deleteTask(id)
    }, [deleteTask])

    return (
        <div>
            {
                isLoading
                    ? <Preloader style={{width: "300px", height: "300px"}}/>
                    : tasks?.map((task: TaskType) => <Task id={task.id} onClick={deleteTaskHandler} title={task.title} key={task.id}/>)
            }
        </div>
    )
}