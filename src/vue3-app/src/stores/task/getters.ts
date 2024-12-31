import {TaskState} from "./state";

export const getters = {
    getTasks: (state: TaskState) => state.tasks,
} as const;