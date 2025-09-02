import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://social-network.samuraijs.com/api/1.1",
        prepareHeaders: (headers) => {
            headers.set("API-KEY", `23a2012c-916a-4a64-8feb-cd271c4f8c68`)
            headers.set('Accept', 'application/json');
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ['Task', 'Auth'],
    endpoints: () => ({})
})