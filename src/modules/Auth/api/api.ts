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
        getCaptcha: build.query<{ url: string }, void>({
            query: () => ({
                url: "/security/get-captcha-url"
            }),
            providesTags: () => ["CaptchaIsRequired"]
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
            invalidatesTags: (result) => {
                if (result?.resultCode === 0) {
                    return ["Auth", "Todo"]
                } else if (result?.resultCode === 10) {
                    return ["CaptchaIsRequired"]
                } else {
                    return [];
                }
            }
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