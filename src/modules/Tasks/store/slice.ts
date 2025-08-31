import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    reducers: {
        taskAdded: (state,
            action: PayloadAction<TaskType>) => {
            state.tasks.push(action.payload);
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase("footer/newTaskTextAdded", (state,
    //         action: { type: "footer/newTaskTextAdded", payload: string }) => {
    //         // state.tasks.push(task)
    //     })
    // }
})

export const {taskAdded} = taskSlice.actions;
export const taskReducer = taskSlice.reducer