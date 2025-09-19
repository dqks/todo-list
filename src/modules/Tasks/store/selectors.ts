import type { RootState } from "../../../redux/store.ts";

export const getEditedTodoList = (state: RootState) => state.todoListReducer.editedTodoList

export const getShownTasksFromList = (state: RootState) => state.todoListReducer.shownTasksFromList

export const getCheckedTasks = (state: RootState) => state.todoListReducer.checkedTasks

export const getCurrentPage = (state: RootState) => state.todoListReducer.currentPage