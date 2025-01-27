import { Task } from '@/types/Task';
import { MetaData } from '@/types/MetaData';

export interface TaskState {
    tasks: Task[];
    meta: MetaData;
}

export const initialState: TaskState = {
    tasks: [],
    meta: {
        current_page: 1,
        last_page: 1,
    },
};