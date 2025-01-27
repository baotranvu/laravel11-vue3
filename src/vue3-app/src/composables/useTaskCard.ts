//import services
import { TaskService } from '../services/TaskService';
//import utils
import { debounce } from 'lodash-es';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
//import stores
import { useTaskStore } from '@/stores/task';
import { useGlobalStore } from '@/stores/global';
//import types
import type { ApiResponse } from '@/types/ApiResponse';
import type { Task } from '@/types/Task';
import type { ErrorType } from '@/types/ErrorType';

export default function useTaskCard() {
    const tasksStore = useTaskStore();
    const globalStore = useGlobalStore();
    const taskService = new TaskService();
    const { tasks, meta } = storeToRefs(tasksStore);
    const { isLoading } = storeToRefs(globalStore);
    const DEFAULT_DEBOUNCE_DELAY = 300;
    const retryCount = ref(0);
    
    const unknownError: ErrorType = {
        message: 'An unknown error occurred',
        status: 500
    };

    const toggleTaskCompletion = async (task: Task): Promise<void> => {
        if (isLoading.value) return;

        const originalState = task.is_completed;
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const taskToUpdate = tasks.value.find(t => t.id === task.id);
            if (taskToUpdate) taskToUpdate.is_completed = !taskToUpdate.is_completed;
            await taskService.changeTaskStatus(task.id);
        } catch (err: any) {
            globalStore.setError(err);
            const taskToReset = tasks.value.find(t => t.id === task.id);
            if (taskToReset) taskToReset.is_completed = originalState;
        } finally {
            globalStore.setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId: number): Promise<void> => {
        if (isLoading.value) return;

        const deletedTaskIndex = tasks.value.findIndex(t => t.id === taskId);
        if (deletedTaskIndex === -1) return;

        if(!Number.isInteger(taskId) || taskId < 0){
            console.error('Invalid task id');
            return;
        }

        const deletedTask = tasks.value[deletedTaskIndex];
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            tasks.value.splice(deletedTaskIndex, 1);
            await taskService.delete(taskId);
        } catch (err: any) {
            globalStore.setError(unknownError);
            tasks.value.splice(deletedTaskIndex, 0, deletedTask);
        } finally {
            globalStore.setLoading(false);
        }
    };

    const getTasks = async (page: number = meta.value.current_page, itemsPerPage: number = meta.value.per_page) => {
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await taskService.all(page, itemsPerPage) as unknown as ApiResponse;
            if(!response.success) throw new Error(response.message);
            const {data, meta} = response.data;
            tasksStore.setTasks(data);
            tasksStore.setMetaData(meta);
            globalStore.setError(null);
            retryCount.value = 0;
        } catch (err: any) {
            globalStore.setError(err);
        } finally {
            globalStore.setLoading(false);
        }
    };

    const getTaskById = async (taskId: number): Promise<Task | null> => {
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await taskService.get(taskId) as unknown as ApiResponse;
            if (!response.success) throw new Error(response.message);
            tasksStore.setTask(response.data);
            globalStore.setError(null);
            return response.data;
        } catch (err: any) {
            globalStore.setError(err);
            return null;
        } finally {
            globalStore.setLoading(false);
        }
    };

    const handleAddTask = async (name: string): Promise<void> => {
        if (isLoading.value) return;

        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await taskService.create({ name }) as unknown as ApiResponse;
            if (response.success) tasks.value.unshift(response.data);
        } catch (err: any) {
            globalStore.setError(unknownError);
        } finally {
            globalStore.setLoading(false);
        }
    };

    const handleUpdateTask = async (taskId: number,data:Task): Promise<void> => {
        const taskToUpdate = tasks.value.find(t => t.id === taskId);
        const originalState = { ...taskToUpdate };
        if (!taskToUpdate || isLoading.value) return;
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await taskService.update(taskId, data) as unknown as ApiResponse;
            if (response.success) {
                tasksStore.updateTask(response.data);
            }
        } catch (err: any) {
            globalStore.setError(unknownError);
            // Reset the task to its original state
            const taskToReset = tasks.value.find(t => t.id === taskId);
            if (taskToReset) {
                Object.assign(taskToReset, originalState);
            }
        } finally {
            globalStore.setLoading(false);
        }
    };

    const debounceHandleAddTask = debounce(handleAddTask, DEFAULT_DEBOUNCE_DELAY);
    const debouncedToggleTaskCompletion = debounce(toggleTaskCompletion, DEFAULT_DEBOUNCE_DELAY);
    const debouncedUpdateTask = debounce(handleUpdateTask, DEFAULT_DEBOUNCE_DELAY);
    
    return {
        debouncedToggleTaskCompletion,
        debouncedUpdateTask,
        handleDeleteTask,
        getTasks,
        getTaskById,
        debounceHandleAddTask,
    };
}
