// src/types/Task.ts
// Defining the Task interface and TaskPayload type
export type TaskPayload = Omit<Task, 'id'>; // For creating a new task (no ID)
export interface Task {
    id: number;
    name: string;
    is_completed?: boolean;
    created_at?: string;
    updated_at?: string;
}