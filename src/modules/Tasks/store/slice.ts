import { createSlice } from "@reduxjs/toolkit";

export type TaskType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TaskInitialState = {
    tasks: TaskType[]
}

const initialState: TaskInitialState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
})

// export const {} = taskSlice.actions;
export const taskReducer = taskSlice.reducer