import type { TaskType } from "../store/slice.ts";
import { baseApi } from "../../../api";

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
        })
    })
})