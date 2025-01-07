<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import useTaskCard from '@/composables/useTaskCard';
import TaskCard from '@/components/Task/TaskCard.vue';
import TaskCardSkeleton from '@/components/skeleton/TaskCardSkeleton.vue';
import AddNewTaskInput from '@/components/Task/AddNewTaskInput.vue';
import ToggleTaskButton from '@/components/Task/ToggleTaskButton.vue';
import ErrorPage from './ErrorPage.vue'
import { useGlobalStore } from '@/stores/global';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
const globalStore = useGlobalStore();
const taskStore = useTaskStore();
const { isLoading, hasError } = storeToRefs(globalStore);
const { getUncompletedTasks } = storeToRefs(taskStore);
const showCompletedTasks = ref(true);
const { debouncedToggleTaskCompletion, handleDeleteTask, getTasks, debounceHandleAddTask, debouncedUpdateTask, tasks } = useTaskCard();
onMounted(async () => {
    await getTasks();
});

interface AddTaskEventPayload {
    name: string;
}

const addTask = (payload: AddTaskEventPayload) => {
    debounceHandleAddTask(payload.name);
};

const handleToggleCompletedTasks = (isCompleted: boolean) => {
    showCompletedTasks.value = isCompleted;
};

const handleEditTask = (taskId: number, newName: string) => {
    const taskToUpdate = tasks.value.find(task => task.id === taskId);
    if (taskToUpdate) {
        debouncedUpdateTask(taskId, { ...taskToUpdate, name: newName });
    }

};

// Filter tasks based on completion status
const filteredTasks = computed(() => {
    return showCompletedTasks.value ? tasks.value : getUncompletedTasks.value;
});
</script>
<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container mt-4">
            <!-- Display error state -->
            <div v-if="hasError">
                <ErrorPage />
            </div>
            <!-- Task list -->
            <div v-else class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div>
                        <AddNewTaskInput @add-task="addTask" />
                        <ToggleTaskButton @toggle-completed-tasks="handleToggleCompletedTasks" />
                    </div>
                    <!-- Display loading state -->
                    <div v-if="isLoading">
                        <TaskCardSkeleton v-for="i in 5" :key="i" class="mt-4" />
                    </div>
                    <div v-else>
                        <!-- List of tasks -->
                        <div class="mt-4" v-if="tasks && tasks.length > 0">
                            <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task"
                                @toggle-task-completion="debouncedToggleTaskCompletion" @delete-task="handleDeleteTask"
                                @edit-task="handleEditTask" />
                        </div>
                        <!-- No tasks message -->
                        <div v-else>
                            <p class="text-center">No tasks found. Add a new task above.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
@import '@/assets/task.css';
</style>