import { TodoList } from "../TodoList/TodoList.tsx";
import { tasksAreShown, todoListIsEdited, type TodoListType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getEditedTodoList, getShownTasksFromList } from "../../store/selectors.ts";
import { TodoListModal } from "../TodoListModal/TodoListModal.tsx";
import { TasksModal } from "../TasksModal/TasksModal.tsx";

export const TodoLists = () => {
    const {data: todoLists, isFetching} = tasksAPI.useFetchAllTodoListsQuery()
    const [reorderTodoLists] = tasksAPI.useReorderTodoListMutation()
    const editedTodoList = useAppSelector(getEditedTodoList)
    const shownTasks = useAppSelector(getShownTasksFromList)
    const dispatch = useAppDispatch();

    //TODO починить
    const reorderTaskHandler = useCallback((id: string,
        task: TodoListType | null,
        taskIndex: number) => {
        if (taskIndex !== 1 && task) {
            reorderTodoLists({
                todoListId: id,
                putAfterItemId: task.id
            });
        } else if (taskIndex === 1) {
            reorderTodoLists({
                todoListId: id,
                putAfterItemId: null
            });
        }
    }, [reorderTodoLists])

    const editClickHandler = useCallback((task: TodoListType) => {
        dispatch(todoListIsEdited(task))
    }, [dispatch])

    const todoListHandler = useCallback((todoListId: string) => {
        dispatch(tasksAreShown(todoListId))
    }, [dispatch])

    //nextTodoList - стрелка вверх
    //previousTodoList - стрелка вниз
    return (
        <div>
            {
                isFetching
                    ? <Preloader style={{width: "100px", height: "100px"}}/>
                    : todoLists?.length !== 0 && todoLists
                        ?
                        <>
                            {editedTodoList &&
                                <TodoListModal todoListTitle={editedTodoList.title} todoListId={editedTodoList.id}/>}
                            {shownTasks && <TasksModal todoListId={shownTasks} />}
                            {todoLists.map((list: TodoListType,
                                index: number) => <TodoList
                                onTodoListClick={todoListHandler}
                                onEditClick={editClickHandler}
                                todoListIndex={index}
                                previousTodoList={todoLists[index + 1]}
                                nextTodoList={todoLists[index - 2]}
                                id={list.id}
                                title={list.title}
                                key={list.id}
                                addedDate={list.addedDate}
                                onArrowClick={reorderTaskHandler}
                            />)}
                        </>
                        : <h2> There are no TODO lists ... yet</h2>
            }
        </div>
    )
}