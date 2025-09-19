import type { TodoListType } from "../store/slice.ts";
import { baseApi } from "../../../api";

type ReorderType = {
    todoListId: string;
    putAfterItemId: string | null
}

type TodoAndTaskActionType = {
    todoListId: string
    title: string
}

type Task = {
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

type TasksPortionResponse = {
    items: Task[]
    totalCount: number
    error: string
}

type CreateTaskResponse = {
    data: { item: Task }
    resultCode: number
    messages: string[]
}

type DeleteTaskQuery = {
    todoListId: string
    taskId: string
}

type DeleteReorderTaskResponse = {
    data: object
    resultCode: number
    messages: string[]
}

type ReorderTaskQuery = {
    todoListId: string,
    taskId: string,
    putAfterItemId: string | null
}

type GetTaskPortionQuery = {
    todoListId: string
    count: number
    page: number
}

export const tasksAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllTodoLists: build.query<TodoListType[], void>({
            query: () => ({
                url: "/todo-lists",
            }),
            providesTags: () => ["Todo"]
        }),
        deleteTodoList: build.mutation<void, string>({
            query: (id: string) => ({
                url: `/todo-lists/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todo"]
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
            invalidatesTags: ["Todo"]
        }),
        editTodoListTitle: build.mutation<void, TodoAndTaskActionType>({
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
            invalidatesTags: ["Todo"]
        }),
        getTasksPortion: build.query<TasksPortionResponse, GetTaskPortionQuery>({
            query: ({todoListId, count, page}) => ({
                url: `/todo-lists/${todoListId}/tasks?count=${count}&page=${page}`
            }),
            providesTags: () => ["Task"]
        }),
        createTask: build.mutation<CreateTaskResponse, TodoAndTaskActionType>({
            query: ({
                title,
                todoListId
            }) => ({
                url: `/todo-lists/${todoListId}/tasks`,
                method: "POST",
                body: {
                    title
                }
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: build.mutation<DeleteReorderTaskResponse, DeleteTaskQuery>({
            query: ({
                todoListId,
                taskId
            }) => ({
                url: `/todo-lists/${todoListId}/tasks/${taskId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        }),
        reorderTasks: build.mutation<DeleteReorderTaskResponse, ReorderTaskQuery>({
            query: ({
                todoListId,
                taskId,
                putAfterItemId
            }) => ({
                url: `/todo-lists/${todoListId}/tasks/${taskId}/reorder`,
                method: "PUT",
                body: {putAfterItemId}
            }),
            invalidatesTags: ["Task"]
        })
    })
})