import { TaskState } from "./state";
import { Task } from "@/types/Task";

export const actions = {
    setTasks(this: TaskState, tasks: Task[]) {
        this.tasks = tasks;
    },
} as const;
