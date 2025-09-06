import type { RootState } from "../../../redux/store.ts";

export const getDeletingTasksInProgress = (state: RootState) => state.taskReducer.deletingTaskInProgress

export const getSelectedTask = (state: RootState) => state.taskReducer.selectedTask