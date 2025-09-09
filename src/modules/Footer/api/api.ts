import { baseApi } from "../../../api";

type CreateTodoResponse = {
    data: {
        item: {
            id: string
            addedDate: Date
            order: number
            title: string
        }
    }
    resultCode: number
    messages: string[]
}

export const footerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTodo: build.mutation<CreateTodoResponse, { title: string }>({
            query: (string) => ({
                url: "/todo-lists",
                method: "POST",
                body: string
            }),
            invalidatesTags: ['Todo']
        })
    })
})