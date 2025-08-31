import { Task } from "../Task/Task.tsx";
import type { TaskType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";

export const Tasks = () => {
    const {data: tasks} = tasksAPI.useFetchAllTasksQuery()

    // const [createTask] = tasksAPI.useCreateTaskMutation()
    //
    // console.log(tasks);
    //
    // const handleCreate = async () => {
    //     const text = "NEW TASK TEXT"
    //     const task = await createTask({title: text});
    //     console.log(task);
    // }

    return (
        <div>
            {tasks?.map((task: TaskType) => <Task title={task.title} key={task.id}/>)}
        </div>
    )
}