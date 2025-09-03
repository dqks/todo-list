import type { RootState } from "../../../redux/store.ts";

export const getCaptchaUrl = (state : RootState) => state.authReducer.captchaUrl