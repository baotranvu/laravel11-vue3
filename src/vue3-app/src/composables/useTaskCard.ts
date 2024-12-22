import { Ref, ref } from 'vue';
import type { Task } from '../types/Task';
import TaskService from '../services/TaskService';
import { debounce } from 'lodash-es';

interface ApiResponse {
    data?: Task[];
}

export default function useTaskCard(tasks: Ref<Task[]>) {
    if (!tasks.value) {
        tasks.value = [];
    }
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
    // Wrap the function with debounce
    const debouncedToggleTaskCompletion = debounce(toggleTaskCompletion, 300);
    const handleDeleteTask = async (task: Task): Promise<void> => {
        const deletedTaskIndex = tasks.value.findIndex((t) => t.id === task.id);
        if (deletedTaskIndex === -1) {
            return;
        }
        const deletedTask = tasks.value[deletedTaskIndex];
        try {
            loading.value = true;  // Start loading
            tasks.value = tasks.value.filter((t) => t.id !== task.id);  // Update tasks array locally
            await TaskService.delete(task.id);  // Delete task from backend
        } catch (err: any) {
            console.error('Failed to delete task:', err);
            error.value = 'Failed to delete task';  // Set error message
            tasks.value.splice(deletedTaskIndex, 0, deletedTask);  // Reset tasks array locally
        } finally {
            loading.value = false;  // End loading
        }
    };

    const isTaskArray = (data: unknown): data is Task[] => {
    return Array.isArray(data) && data.every(item => 
            typeof item === 'object' && item !== null && 'id' in item
        );
    };

    const getTasks = async () => {
        try {
            loading.value = true;  // Start loading
            const response = await TaskService.all() as ApiResponse;  // Fetch tasks
            let taskData: Task[] = [];
            if (isTaskArray(response.data)) {
                taskData = response.data;
            } else if (isTaskArray(response)) {
                taskData = response;
            }
            tasks.value = taskData;
            error.value = null;  // Reset error message
            retryCount.value = 0;  // Reset retry count
        } catch (err: any) {
            console.error('Failed to fetch tasks:', err);
            error.value = 'Failed to load tasks';  // Set error message
            // Retry fetching tasks up to 3 times if failed 
            if (!retryCount.value || retryCount.value < 3) {
                setTimeout(() => {
                    retryCount.value++;
                    getTasks();
                }, Math.pow(2, retryCount.value) * 1000); // Exponential backoff
            }
        } finally {
            loading.value = false;  // End loading
        }
    };

    const handleAddTask = async (name:string): Promise<void> => {
        try {
            loading.value = true;  // Start loading
            const response = await TaskService.create({ name });  // Create task on backend
            if (response?.id) {
                tasks.value = [response, ...tasks.value];  // Update tasks array locally
            }
            error.value = null;  // Reset error message
        } catch (err: any) {
            console.error('Failed to add task:', err);
            error.value = 'Failed to add task';  // Set error message
        } finally {
            loading.value = false;  // End loading
        }
    }
    const debounceHandleAddTask = debounce(handleAddTask, 300);

    return {
        debouncedToggleTaskCompletion,
        handleDeleteTask,
        getTasks,
        debounceHandleAddTask,
        tasks,
        loading,
        error,
    };
}
