import { Task } from '@/types/Task';

export interface TaskState {
    tasks: Task[];
}

export const initialState: TaskState = {
    tasks: [],
};