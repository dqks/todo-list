import {Task} from "../Task/Task.tsx";
import { useAppSelector } from "../../../../hooks/redux.ts";
import { getTasks } from "../../store/selectors.ts";
import type { TaskType } from "../../store/slice.ts";

export const Tasks = () => {
    const tasks = useAppSelector(getTasks)

    return (
        <div>
            {tasks?.map((task : TaskType) => <Task title={task.title} key={task.id} />)}
        </div>
    )
}