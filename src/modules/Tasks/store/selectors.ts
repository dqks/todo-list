import type { RootState } from "../../../redux/store.ts";

export const getTasks = (state : RootState) => state.taskReducer.tasks