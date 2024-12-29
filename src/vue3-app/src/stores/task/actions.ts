import { TaskState } from "./state";
import { Task } from "@/types/Task";

export const actions = {
    setTasks(state: TaskState, tasks: Task[]) {
        state.tasks = tasks;
    },
};
