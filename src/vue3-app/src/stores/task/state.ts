import { Task } from '@/types/Task';

export interface TaskState {
    tasks: Task[];
}

export const state = () : TaskState => ({
    tasks: [],
});