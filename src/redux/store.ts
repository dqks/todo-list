import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { footerReducer } from "../modules/Footer";
import { taskReducer } from "../modules/Tasks";
import { baseApi } from "../api"

const reducers = combineReducers({
    footerReducer,
    taskReducer,
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

// @ts-expect-error to not be complicated
window.store = store;