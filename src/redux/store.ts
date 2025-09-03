import { type Action, combineReducers, configureStore, type ThunkAction } from "@reduxjs/toolkit";
import { footerReducer } from "../modules/Footer";
import { taskReducer } from "../modules/Tasks";
import { baseApi } from "../api"
import { authReducer } from "../modules/Auth";

const reducers = combineReducers({
    footerReducer,
    taskReducer,
    authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export type ActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U } ? U : never

export type ThunkActionType<A extends Action> = ThunkAction<Promise<void>, RootState, unknown, A>

// @ts-expect-error to not be complicated
window.store = store;