import { Button } from "../../../../ui/Button/Button.tsx";
import classes from "./TodoList.module.css"
import { memo } from "react";
import type { TodoListType } from "../../store/slice.ts";

type TodoListProps = {
    title: string
    id: string
    nextTodoList: TodoListType
    previousTodoList: TodoListType
    todoListIndex: number
    addedDate: Date
    onArrowClick: (id: string,
        nextTask: TodoListType | null,
        taskIndex: number) => void
    onEditClick: (taskText: TodoListType) => void
    onTodoListClick: (todoListId: string) => void
}

export const TodoList = memo(({
    title,
    id,
    onArrowClick,
    nextTodoList,
    previousTodoList,
    todoListIndex,
    onEditClick,
    addedDate,
    onTodoListClick
}: TodoListProps) => {
    return (
        <div onClick={() => onTodoListClick(id)} className={classes.todoListWrapper}>
            <div className={classes.buttonsWrapper}>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onArrowClick(id, nextTodoList, todoListIndex)
                }}>
                    &uarr;
                </Button>
                <Button onClick={(e) => {
                    e.stopPropagation()
                    onArrowClick(id, previousTodoList, todoListIndex)
                }}>
                    &darr;
                </Button>
            </div>
            <p>{title}</p>
            <div className={classes.actionWrapper}>
                <Button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEditClick({id, addedDate, order: 1, title} as TodoListType)
                    }}>
                    Edit
                </Button>
            </div>
        </div>
    )
})