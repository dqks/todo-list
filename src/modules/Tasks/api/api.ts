import type { TaskType } from "../store/slice.ts";
import { baseApi } from "../../../api";

type ReorderType = {
    todoListId: string;
    putAfterItemId: string | null
}

type EditTaskType = {
    todoListId: string
    title: string
}

export const tasksAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllTasks: build.query<TaskType[], void>({
            query: () => ({
                url: "/todo-lists",
            }),
            providesTags: () => ["Task"]
        }),
        deleteTask: build.mutation<void, string>({
            query: (id: string) => ({
                url: `/todo-lists/${id}` ,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        }),
        reorderTasks: build.mutation<void, ReorderType>({
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
        editTask: build.mutation<void, EditTaskType>({
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
        })
    })
})