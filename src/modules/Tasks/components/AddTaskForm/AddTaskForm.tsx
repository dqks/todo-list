import { AddElementForm } from "../../../../components/AddElementForm/AddElementForm.tsx";
import { Button } from "../../../../ui/Button/Button.tsx";
import { taskIsUnchecked } from "../../store/slice.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getCheckedTasks } from "../../store/selectors.ts";
import { tasksAPI } from "../../api/api.ts";
import { useCallback } from "react";

type AddTaskFormProps = {
    todoListId: string
    areThereAnyTasks: boolean | undefined
}

export const AddTaskForm = ({
    areThereAnyTasks,
    todoListId
}: AddTaskFormProps) => {
    const checkedTasks = useAppSelector(getCheckedTasks)
    const [deleteTasks] = tasksAPI.useDeleteTaskMutation()
    const [createTask] = tasksAPI.useCreateTaskMutation()
    const dispatch = useAppDispatch()

    const createTaskCb = useCallback((title: { title: string }) => {
        createTask({todoListId, ...title})
    }, [createTask, todoListId])

    const onDeleteClick = () => {
        if (checkedTasks.length > 0) {
            for (const taskId of checkedTasks) {
                deleteTasks({todoListId, taskId})
                dispatch(taskIsUnchecked(taskId))
            }
        }
    }

    return (
        <div>
            <AddElementForm buttonText={"Add Task"} createElement={createTaskCb}/>
            {
                areThereAnyTasks
                && <Button onClick={onDeleteClick} style={{margin: "5px 0"}}>Delete Chosen Tasks</Button>
            }
        </div>
    )
}