import TaskService from '../services/TaskService';
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
    const { tasks} = storeToRefs(tasksStore);
    const { loading, error } = storeToRefs(globalStore);
    const { setError, clearError, setLoading } = globalStore;
    const { setTasks} = tasksStore;
    const retryCount = ref(0);

    const toggleTaskCompletion = async (task: Task): Promise<void> => {
        if (loading.value) return;

        const originalState = task.is_completed;
        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const taskToUpdate = tasks.value.find(t => t.id === task.id);
            if (taskToUpdate) taskToUpdate.is_completed = !taskToUpdate.is_completed;
            await TaskService.changeTaskStatus(task.id);
        } catch (err: any) {
            setError(globalStore,err);
            const taskToReset = tasks.value.find(t => t.id === task.id);
            if (taskToReset) taskToReset.is_completed = originalState;
        } finally {
            setLoading(globalStore, false);
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
            setLoading(globalStore, true);
            clearError(globalStore);
            tasks.value.splice(deletedTaskIndex, 1);
            await TaskService.delete(taskId);
        } catch (err: any) {
            setError(globalStore,err);
            tasks.value.splice(deletedTaskIndex, 0, deletedTask);
        } finally {
            setLoading(globalStore, false);
        }
    };

    const getTasks = async () => {
        if (loading.value) return;

        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await TaskService.all() as unknown as ApiResponse;
            let tasks = response.data?.data;
            tasks = tasks.sort((a: { created_at: any; }, b: { created_at: any; }) => 
                new Date(b.created_at ?? new Date()).getTime() - new Date(a.created_at ?? new Date()).getTime()
            );
            setTasks(tasksStore, tasks);
            error.value = null;
            retryCount.value = 0;
        } catch (err: any) {
            setError(globalStore,err);

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
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await TaskService.create({ name });
            if (response?.id) tasks.value.unshift(response);
        } catch (err: any) {
            setError(globalStore,err);
        } finally {
            setLoading(globalStore, false);
        }
    };

    const handleUpdateTask = async (taskId: number,data:Task): Promise<void> => {
        const taskToUpdate = tasks.value.find(t => t.id === taskId);
        const originalState = { ...taskToUpdate };
        if (!taskToUpdate || loading.value) return;
        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await TaskService.update(taskId, data) as unknown as ApiResponse;
            if (response) {
                const updatedTaskIndex = tasks.value.findIndex(t => t.id === taskId);
                if (updatedTaskIndex !== -1) {
                    tasks.value[updatedTaskIndex] = response.data?.data;
                }
            }
        } catch (err: any) {
            setError(globalStore,err);
            // Reset the task to its original state
            const taskToReset = tasks.value.find(t => t.id === taskId);
            if (taskToReset) {
                Object.assign(taskToReset, originalState);
            }
        } finally {
            setLoading(globalStore, false);
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
        tasks
    };
}
