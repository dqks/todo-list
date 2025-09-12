import { TodoList } from "../TodoList/TodoList.tsx";
import { tasksAreShown, todoListIsEdited, type TodoListType } from "../../store/slice.ts";
import { tasksAPI } from "../../api/api.ts";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux.ts";
import { getEditedTodoList, getShownTasksFromList } from "../../store/selectors.ts";
import { TodoListModal } from "../TodoListModal/TodoListModal.tsx";
import { TasksModal } from "../TasksModal/TasksModal.tsx";
import { PreloaderWrapper } from "../../../../components/PreloaderWrapper/PreloaderWrapper.tsx";

export const TodoLists = () => {
    const {data: todoLists, isFetching} = tasksAPI.useFetchAllTodoListsQuery()
    const [reorderTodoLists] = tasksAPI.useReorderTodoListMutation()
    const editedTodoList = useAppSelector(getEditedTodoList)
    const shownTasks = useAppSelector(getShownTasksFromList)
    const dispatch = useAppDispatch();

    const reorderTodoHandler = useCallback((todoListId: string,
        putAfterItemId: string | null,
        todoIndex: number,
        isUp: boolean) => {
        if (todoIndex !== 1 && putAfterItemId) {
            reorderTodoLists({
                todoListId,
                putAfterItemId
            });
        } else if (todoIndex === 1 && isUp) {
            reorderTodoLists({
                todoListId,
                putAfterItemId: null
            })
        } else if (todoIndex === 1 && !isUp && todoLists?.length !== 2) {
            reorderTodoLists({
                todoListId,
                putAfterItemId
            })
        }
    }, [reorderTodoLists, todoLists])

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
            <PreloaderWrapper preloaderStyle={{width: "100px", height: "100px"}} isFetching={isFetching}>
                {
                    todoLists && todoLists.length !== 0
                        ? <>
                            {editedTodoList &&
                                <TodoListModal todoListTitle={editedTodoList.title} todoListId={editedTodoList.id}/>}
                            {shownTasks && <TasksModal todoListId={shownTasks}/>}
                            {todoLists.map((list: TodoListType,
                                index: number) => <TodoList
                                onTodoListClick={todoListHandler}
                                onEditClick={editClickHandler}
                                todoListIndex={index}
                                previousTodoListId={todoLists[index + 1]?.id}
                                nextTodoListId={todoLists[index - 2]?.id}
                                id={list.id}
                                title={list.title}
                                key={list.id}
                                addedDate={list.addedDate}
                                onArrowClick={reorderTodoHandler}
                            />)}
                        </>
                        : <h2> There are no TODO lists ... yet</h2>
                }
            </PreloaderWrapper>
        </div>
    )
}