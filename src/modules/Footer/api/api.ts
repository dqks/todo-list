import { baseApi } from "../../../api";
import type { TaskType } from "../../Tasks/store/slice.ts";

export const footerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation<TaskType, { title: string }>({
            query: (string) => ({
                url: "/todo-lists",
                method: "POST",
                body: string
            }),
            invalidatesTags: ['Task']
        })
    })
})