import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TaskType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TaskInitialState = {
    tasks: TaskType[],
    deletingTaskInProgress: string[]
}

const initialState: TaskInitialState = {
    tasks: [],
    deletingTaskInProgress: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        taskIsDeleting: {
            reducer: (state,
                action: PayloadAction<{ isFetching: boolean, userId: string }>) => {
                state.deletingTaskInProgress = action.payload.isFetching
                    ? [...state.deletingTaskInProgress, action.payload.userId]
                    : state.deletingTaskInProgress.filter(id => id !== action.payload.userId)
            },
            prepare: (isFetching: boolean,
                userId: string) => {
                return {payload: {isFetching, userId}}
            }
        }
    },
})

export const {taskIsDeleting} = taskSlice.actions;
export const taskReducer = taskSlice.reducer