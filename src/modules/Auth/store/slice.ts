import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    captchaUrl: string | null
}

const initialState: InitialState = {
    captchaUrl: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {}
})

export const authReducer = authSlice.reducer;