import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./TodoList.module.css"
import { memo } from "react";
import { tasksAreShown, todoListIsEdited, type TodoListType } from "../../store/slice.ts";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { useNavigate } from "react-router";

type TodoListProps = {
    title: string
    id: string
    nextTodoListId: string
    previousTodoListId: string
    todoListIndex: number
    addedDate: Date
    onArrowClick: (todoListId: string,
        putAfterItemId: string,
        todoIndex: number,
        isUp: boolean) => void
}

export const TodoList = memo(({
    title,
    id,
    onArrowClick,
    nextTodoListId,
    previousTodoListId,
    todoListIndex,
    addedDate,
}: TodoListProps) => {
    const navigation = useNavigate()
    const dispatch = useAppDispatch()

    const editClickHandler = (todoList: TodoListType) => {
        dispatch(todoListIsEdited(todoList))
        navigation(`/todo/${todoList.id}`)

    }

    const todoListHandler = (todoListId: string) => {
        dispatch(tasksAreShown(todoListId))
    }

    return (
            <div onClick={() => todoListHandler(id)} className={classes.todoListWrapper}>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        onArrowClick(id, nextTodoListId, todoListIndex, true)
                    }}>
                        &uarr;
                    </Button>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        onArrowClick(id, previousTodoListId, todoListIndex, false)
                    }}>
                        &darr;
                    </Button>
                </div>
                <p>{title}</p>
                <div className={classes.actionWrapper}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            editClickHandler({id, addedDate, order: 1, title} as TodoListType)
                        }}>
                        Edit
                    </Button>
                </div>
            </div>
    )
})