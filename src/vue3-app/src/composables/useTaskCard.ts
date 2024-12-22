import { Ref, ref } from 'vue';
import type { Task } from '../types/Task';
import TaskService from '../services/TaskService';

interface ApiResponse {
    data?: Task[];
}

export default function useTaskCard(tasks: Ref<Task[]>) {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const retryCount = ref(0);

    const toggleTaskCompletion = async (task: Task): Promise<void> => {
        const originalState = task.is_completed;  // Store original state
        try {
            loading.value = true;  // Start loading
            tasks.value = tasks.value.map((t) =>
                t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
            );  // Update tasks array locally
            await TaskService.changeTaskStatus(task.id);  // Update status on backend
        } catch (err: any) {
            console.error('Failed to toggle task:', err);
            error.value = 'Failed to toggle task completion';  // Set error message
            tasks.value = tasks.value.map((t) =>
                t.id === task.id ? { ...t, is_completed: originalState } : t
            );  // Reset tasks array locally
        } finally {
            loading.value = false;  // End loading
        }
    };

    const handleDeleteTask = async (task: Task): Promise<void> => {
        try {
            loading.value = true;  // Start loading
            await TaskService.delete(task.id);  // Delete task from backend
            tasks.value = tasks.value.filter((t) => t.id !== task.id);  // Update tasks array locally
        } catch (err: any) {
            console.error('Failed to delete task:', err);
            error.value = 'Failed to delete task';  // Set error message
        } finally {
            loading.value = false;  // End loading
        }
    };

    const getTasks = async () => {
        try {
            loading.value = true;  // Start loading
            const response = await TaskService.all() as ApiResponse;  // Fetch tasks
            let taskData: Task[] = [];
            if (Array.isArray(response.data)) {
                taskData = response.data;
            } else if (Array.isArray(response)) {
                taskData = response;
            }
            tasks.value = taskData;
        } catch (err: any) {
            console.error('Failed to fetch tasks:', err);
            error.value = 'Failed to load tasks';  // Set error message
            // Retry fetching tasks up to 3 times if failed 
            if (!retryCount.value || retryCount.value < 3) {
                setTimeout(() => {
                    retryCount.value++;
                    getTasks();
                }, 3000);
            }
        } finally {
            loading.value = false;  // End loading
        }
    };

    return {
        toggleTaskCompletion,
        handleDeleteTask,
        getTasks,
        tasks,
        loading,
        error,
    };
}
