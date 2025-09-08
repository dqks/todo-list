import type { RootState } from "../../../redux/store.ts";

export const getEditedTodoList = (state: RootState) => state.todoListReducer.editedTodoList

export const getShownTasksFromList = (state: RootState) => state.todoListReducer.shownTasksFromList