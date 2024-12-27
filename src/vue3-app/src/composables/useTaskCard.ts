import { Ref, ref } from 'vue';
import type { Task } from '../types/Task';
import TaskService from '../services/TaskService';
import { debounce } from 'lodash-es';

interface ApiResponse {
    data?: Task[];
    message?: string;
}

export default function useTaskCard(tasks: Ref<Task[]>) {
    if (!tasks.value) {
        tasks.value = [];
    }

    const loading = ref(false);
    const error = ref<string | null>(null);
    const retryCount = ref(0);

    const isTaskArray = (data: unknown): data is Task[] => {
        return Array.isArray(data) && data.every(item =>
            typeof item === 'object' &&
            item !== null &&
            'id' in item &&
            'name' in item &&
            'is_completed' in item
        );
    };

    const handleError = (message: string, err: any) => {
        console.error(message, err);
        error.value = message;
    };

    const toggleTaskCompletion = async (task: Task): Promise<void> => {
        if (loading.value) return;

        const originalState = task.is_completed;
        try {
            loading.value = true;
            const taskToUpdate = tasks.value.find(t => t.id === task.id);
            if (taskToUpdate) taskToUpdate.is_completed = !taskToUpdate.is_completed;

            await TaskService.changeTaskStatus(task.id);
        } catch (err: any) {
            handleError('Failed to toggle task completion', err);

            const taskToReset = tasks.value.find(t => t.id === task.id);
            if (taskToReset) taskToReset.is_completed = originalState;
        } finally {
            loading.value = false;
        }
    };

    const handleDeleteTask = async (taskId: number): Promise<void> => {
        if (loading.value) return;

        const deletedTaskIndex = tasks.value.findIndex(t => t.id === taskId);
        if (deletedTaskIndex === -1) return;

        if(!Number.isInteger(taskId) || taskId < 0){
            console.error('Invalid task id');
            return;
        }

        const deletedTask = tasks.value[deletedTaskIndex];
        try {
            loading.value = true;
            tasks.value.splice(deletedTaskIndex, 1);
            await TaskService.delete(taskId);
        } catch (err: any) {
            handleError('Failed to delete task', err);
            tasks.value.splice(deletedTaskIndex, 0, deletedTask);
        } finally {
            loading.value = false;
        }
    };

    const getTasks = async () => {
        if (loading.value) return;

        try {
            loading.value = true;
            const response = await TaskService.all() as ApiResponse;
            if (isTaskArray(response)) {
                tasks.value = response.sort((a, b) => 
                    new Date(b.created_at ?? new Date()).getTime() - new Date(a.created_at ?? new Date()).getTime()
                );
            } else {
                tasks.value = [];
            }

            error.value = null;
            retryCount.value = 0;
        } catch (err: any) {
            handleError('Failed to load tasks', err);

            if (retryCount.value < 3) {
                retryCount.value++;
                setTimeout(getTasks, Math.pow(2, retryCount.value) * 1000);
            }
        } finally {
            loading.value = false;
        }
    };

    const handleAddTask = async (name: string): Promise<void> => {
        if (loading.value) return;

        try {
            loading.value = true;
            const response = await TaskService.create({ name });
            if (response?.id) tasks.value.unshift(response);
            error.value = null;
        } catch (err: any) {
            handleError('Failed to add task', err);
        } finally {
            loading.value = false;
        }
    };

    const handleUpdateTask = async (taskId: number,data:Task): Promise<void> => {
        const taskToUpdate = tasks.value.find(t => t.id === taskId);
        const originalState = { ...taskToUpdate };
        if (!taskToUpdate || loading.value) return;
        try {
            loading.value = true;
            await TaskService.update(taskId, data);
            error.value = null;
            // Update the task in the local state
            Object.assign(taskToUpdate, data);
        } catch (err: any) {
            handleError('Failed to update task', err);
            // Reset the task to its original state
            Object.assign(taskToUpdate, originalState);
        } finally {
            loading.value = false;
        }
    };

    const debounceHandleAddTask = debounce(handleAddTask, 300);
    const debouncedToggleTaskCompletion = debounce(toggleTaskCompletion, 300);
    const debouncedUpdateTask = debounce(handleUpdateTask, 300);

    return {
        debouncedToggleTaskCompletion,
        debouncedUpdateTask,
        handleDeleteTask,
        getTasks,
        debounceHandleAddTask,
        tasks,
        loading,
        error,
    };
}
