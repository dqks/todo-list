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
    rememberMe?: boolean
    captcha?: string
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
            invalidatesTags: ["Auth"]
        }),
        getCaptchaUrl: build.query<string, void>({
            query: () => ({
                url: "/security/get-captcha-url"
            })
        })
    })
})