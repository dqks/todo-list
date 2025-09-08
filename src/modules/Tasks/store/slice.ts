import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TodoListsInitialState = {
    editedTodoList: TodoListType | null
    shownTasksFromList: string | null
}

const initialState: TodoListsInitialState = {
    editedTodoList: null,
    shownTasksFromList: null
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
        }
    },
})

export const {todoListIsEdited, tasksAreShown} = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer