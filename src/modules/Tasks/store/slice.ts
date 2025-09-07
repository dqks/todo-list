import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TodoListsInitialState = {
    editedTodoList: TodoListType | null
    shownTasksFromList: TodoListType | null
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
        tasksAreShows: (state, action: PayloadAction<TodoListType | null>) => {
            state.editedTodoList = action.payload
        }
    },
})

export const {todoListIsEdited, tasksAreShows} = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer