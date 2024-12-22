import { Ref, ref } from 'vue';
import type { Task } from '../types/Task';
import TaskService from '../services/TaskService';

export default function useTaskCard(tasks: Ref<Task[]>) {
    const loading = ref(false);
    const error = ref<string | null>(null);

    const toggleTaskCompletion = async (task: Task): Promise<void> => {
        try {
            loading.value = true;  // Start loading
            await TaskService.changeTaskStatus(task.id);  // Update status on backend
            tasks.value = tasks.value.map((t) =>
                t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
            );
        } catch (err: any) {
            console.error('Failed to toggle task:', err);
            error.value = 'Failed to toggle task completion';  // Set error message
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
            const response = await TaskService.all();  // Fetch tasks
            tasks.value = response.data || response;  // Ensure data is in expected format
        } catch (err: any) {
            console.error('Failed to fetch tasks:', err);
            error.value = 'Failed to load tasks';  // Set error message
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
