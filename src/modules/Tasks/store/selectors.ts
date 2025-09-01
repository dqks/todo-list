import type { RootState } from "../../../redux/store.ts";

export const getTasks = (state : RootState) => state.taskReducer.tasks

export const getDeletingTasksInProgress = (state: RootState) => state.taskReducer.deletingTaskInProgress