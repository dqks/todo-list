import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TodoListsInitialState = {
    editedTodoList: TodoListType | null
    //id from todolist
    shownTasksFromList: string | null
    checkedTasks: string[]
}

const initialState: TodoListsInitialState = {
    editedTodoList: null,
    shownTasksFromList: null,
    checkedTasks: []
}

export const todoListSlice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        todoListIsEdited: (state, action: PayloadAction<TodoListType | null>) => {
            state.editedTodoList = action.payload
        },
        tasksAreShown: (state, action: PayloadAction<string | null>) => {
            state.shownTasksFromList = action.payload
        },
        taskIsChecked: (state, action: PayloadAction<string>) => {
            state.checkedTasks.push(action.payload)
        },
        taskIsUnchecked: (state, action: PayloadAction<string>) => {
            state.checkedTasks = state.checkedTasks.filter(id => id !== action.payload)
        }
    },
})

export const {todoListIsEdited, tasksAreShown, taskIsChecked, taskIsUnchecked} = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer