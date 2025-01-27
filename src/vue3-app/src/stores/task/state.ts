import { Task } from '@/types/Task';
import { MetaData } from '@/types/MetaData';

export interface TaskState {
    tasks: Task[];
    meta: MetaData;
    task: Task | null;
}

export const initialState: TaskState = {
    tasks: [],
    task: null,
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,  // Add default per_page
        total: 0       // Initialize total to 0
    },
};