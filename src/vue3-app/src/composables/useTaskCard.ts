import { TaskService } from '../services/TaskService';
import { debounce } from 'lodash-es';
import { ApiResponse } from '@/types/ApiResponse';
import { useTaskStore } from '@/stores/task';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Task } from '@/types/Task';
export default function useTaskCard() {
    const tasksStore = useTaskStore();
    const globalStore = useGlobalStore();
    const taskService = new TaskService;
    const { tasks } = storeToRefs(tasksStore);
    const { isLoading, error } = storeToRefs(globalStore);
    const retryCount = ref(0);
    const DEFAULT_DEBOUNCE_DELAY = 300;

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
            globalStore.setError(err);
            tasks.value.splice(deletedTaskIndex, 0, deletedTask);
        } finally {
            globalStore.setLoading(false);
        }
    };

    const getTasks = async () => {
        
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await taskService.all() as unknown as ApiResponse;
            let tasks = response.data;
            tasks = tasks.sort((a: { created_at: any; }, b: { created_at: any; }) => 
                new Date(b.created_at ?? new Date()).getTime() - new Date(a.created_at ?? new Date()).getTime()
            );
            tasksStore.setTasks(tasks);
            error.value = null;
            retryCount.value = 0;
        } catch (err: any) {
            globalStore.setError({
                status: err.status,
                message: err.response.data.message
            });

            if (retryCount.value < 3) {
                retryCount.value++;
                setTimeout(getTasks, Math.pow(2, retryCount.value) * 1000);
            }
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
            globalStore.setError(err);
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
            globalStore.setError(err);
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
        debounceHandleAddTask,
        tasks
    };
}
