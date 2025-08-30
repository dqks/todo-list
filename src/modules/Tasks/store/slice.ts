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

const initialState : TaskInitialState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase("footer/newTaskTextAdded", (state, action : {type: "footer/newTaskTextAdded", payload : string}) => {
            const task = {
                id: state.tasks.length !== 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1,
                text: action.payload,
                isDone: false
            }
            // state.tasks.push(task)
        })
    }
})

export const {} = taskSlice.actions;
export const taskReducer = taskSlice.reducer