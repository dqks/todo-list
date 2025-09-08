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

type TasksPortionResponse = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
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
        getTasksPortion: build.query<TasksPortionResponse[], string>({
            query: (todoListId) => ({
                url: `/todo-lists/${todoListId}/tasks`
            })
        })
    })
})