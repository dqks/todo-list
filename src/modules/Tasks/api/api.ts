import type { TodoListType } from "../store/slice.ts";
import { baseApi } from "../../../api";

type ReorderType = {
    todoListId: string;
    putAfterItemId: string | null
}

type EditTodoListType = {
    todoListId: string
    title: string
}

export const tasksAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllTodoLists: build.query<TodoListType[], void>({
            query: () => ({
                url: "/todo-lists",
            }),
            providesTags: () => ["Task"]
        }),
        deleteTodoList: build.mutation<void, string>({
            query: (id: string) => ({
                url: `/todo-lists/${id}` ,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        }),
        reorderTodoList: build.mutation<void, ReorderType>({
            query: ({
                todoListId,
                putAfterItemId
            }) => ({
                url: `/todo-lists/${todoListId}/reorder`,
                method: "PUT",
                body: {
                    putAfterItemId: putAfterItemId
                }
            }),
            invalidatesTags: ["Task"]
        }),
        editTodoListTitle: build.mutation<void, EditTodoListType>({
            query: ({
                todoListId,
                title,
            }) => ({
                url: `/todo-lists/${todoListId}`,
                method: "PUT",
                body: {
                    title,
                }
            }),
            invalidatesTags: ["Task"]
        }),
        getTasksPortions: build.query<void, string>({
            query: (todoListId) => ({
                url: `/todo-lists/${todoListId}/tasks`
            })
        })
    })
})