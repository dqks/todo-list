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

export const authAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        isAuth: build.query<AuthResponse, void>({
            query: () => ({
                url: "/auth/me"
            }),
        }),
    })
})