import { TaskState } from "./state";
import { Task } from "@/types/Task";

export const actions = {
    setTasks(this: TaskState, tasks: Task[]) {
        this.tasks = tasks;
    },
    updateTask(this: TaskState, task: Task) {
        const taskToUpdate = this.tasks.find(t => t.id === task.id);
        if (taskToUpdate) {
            Object.assign(taskToUpdate, task);
        }
    },

} as const;
