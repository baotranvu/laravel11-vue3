<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Task } from '../types/Task';
import useTaskCard from '../composables/useTaskCard';
import TaskCard from '../components/Task/TaskCard.vue';
import AddNewTaskInput from '../components/Task/AddNewTaskInput.vue';
import ToggleTaskButton from '../components/Task/ToggleTaskButton.vue';

const tasks = ref<Task[]>([]);
const showCompletedTasks = ref(true);
const { debouncedToggleTaskCompletion, handleDeleteTask, getTasks, debounceHandleAddTask, loading, error } = useTaskCard(tasks);

// Load tasks with error handling
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
    console.log('Show completed tasks:', showCompletedTasks.value);
};

// Filter tasks based on completion status
const filteredTasks = computed(() => {
    return showCompletedTasks.value ? tasks.value : tasks.value.filter(task => !task.is_completed);
});
</script>
<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <!-- Display loading state -->
            <div v-if="loading">
                <output class="spinner-border text-primary">
                    <span class="visually-hidden">Loading...</span>
                </output>
            </div>
            <!-- Display error state -->
            <div v-if="error">
                <div class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
            </div>
            <!-- Task list -->
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div>
                        <AddNewTaskInput @add-task="addTask" />
                        <ToggleTaskButton @toggle-completed-tasks="handleToggleCompletedTasks"/>
                    </div>
                    <!-- List of tasks -->
                    <div class="mt-4" v-if="tasks.length > 0">
                        <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @toggle-task-completion="debouncedToggleTaskCompletion" @delete-task="handleDeleteTask" />
                    </div>
                    <!-- No tasks message -->
                    <div v-else>
                        <p class="text-center">No tasks found. Add a new task above.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>