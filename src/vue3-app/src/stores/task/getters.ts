import {TaskState} from "./state";
import {Task} from "@/types/Task";

export const getters = {
    getTasks: (state: TaskState): Task[] => state.tasks,
    getTaskById: (state: TaskState) => (id: number): Task | undefined => state.tasks.find(task => task.id === id),
    getUncompletedTasks: (state: TaskState): Task[] => state.tasks.filter(task => !task.is_completed),
    getCompletedTasks: (state: TaskState): Task[] => state.tasks.filter(task => task.is_completed),
} as const;