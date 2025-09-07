import { TodoList } from "../TodoList/TodoList.tsx";
import { todoListIsEdited, type TodoListType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { Preloader } from "../../../../ui/Preloader/Preloader.tsx";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getEditedTodoList } from "../../store/selectors.ts";
import { TodoListModal } from "../TodoListModal/TodoListModal.tsx";

export const TodoLists = () => {
    const {data: todoLists, isFetching} = tasksAPI.useFetchAllTodoListsQuery()
    const [reorderTodoLists] = tasksAPI.useReorderTodoListMutation()
    const selectedTodoList = useAppSelector(getEditedTodoList)
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
                            {selectedTodoList &&
                                <TodoListModal todoListTitle={selectedTodoList.title} todoListId={selectedTodoList.id}/>}
                            {todoLists?.map((list: TodoListType,
                                index: number) => <TodoList
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