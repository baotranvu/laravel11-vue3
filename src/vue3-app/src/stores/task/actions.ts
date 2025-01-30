import { TaskState } from "./state";
import { Task } from "@/types/Task";
import { MetaData } from "@/types/MetaData";
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
    setMetaData(this: TaskState, metaData: MetaData) {
        this.meta = metaData;
    },
    setTask(this: TaskState, task: Task | null) {
        this.task = task;
    }

} as const;
