import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TaskType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TaskInitialState = {
    deletingTaskInProgress: string[]
    selectedTask: TaskType | null
}

const initialState: TaskInitialState = {
    deletingTaskInProgress: [],
    selectedTask: null
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
        },
        setSelectedTask: (state, action: PayloadAction<TaskType | null>) => {
            state.selectedTask = action.payload
        }
    },
})

export const {taskIsDeleting, setSelectedTask} = taskSlice.actions;
export const taskReducer = taskSlice.reducer