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
    })
})


//query for me
// me: build.query({
//     query: () => ({
//         url: "/auth/me",
//         withCredentials: true,
//         headers: {
//             "API-KEY": `23a2012c-916a-4a64-8feb-cd271c4f8c68`
//         }
//     })
// })