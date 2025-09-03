import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActionsTypes, ThunkActionType } from "../../../redux/store.ts";
import { getCaptchaUrl } from "../api/getCaptchaUrl.ts";

type InitialState = {
    captchaUrl: string | null
}

const initialState: InitialState = {
    captchaUrl: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        captchaUrlReceived: (state, action: PayloadAction<string>) => {
            state.captchaUrl = action.payload;
        }
    }
})

type AuthActions = ActionsTypes<typeof authSlice.actions>

type AuthThunk = ThunkActionType<AuthActions>

export const getCaptcha = () : AuthThunk => {
    return async (dispatch) => {
        const captchaUrl = await getCaptchaUrl();
        dispatch(captchaUrlReceived(captchaUrl.url));
    }
}

export const {captchaUrlReceived} = authSlice.actions;
export const authReducer = authSlice.reducer;