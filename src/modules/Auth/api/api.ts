import { baseApi } from "../../../api";

type AuthResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: string[]
}

export type LoginRequest = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginResponse = {
    data: {
        userId: number
    }
    resultCode: number
    messages: string[]
}

export const authAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        isAuth: build.query<AuthResponse, void>({
            query: () => ({
                url: "/auth/me"
            }),
            providesTags: () => ["Auth"]
        }),
        login: build.mutation<LoginResponse, LoginRequest>({
            query: ({
                email,
                password,
                rememberMe,
                captcha
            }) => ({
                url: "/auth/login",
                method: "POST",
                body: {
                    email,
                    password,
                    rememberMe,
                    captcha
                }
            }),
            //плохая практика, нужно не делать запрос при каждой попытки логина,
            // но за неимением других идей пока что так
            invalidatesTags: ["Auth", "Task"]
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["Auth"]
        })
    })
})