<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Task } from '../types/Task';
import useTaskCard from '../composables/useTaskCard';
import TaskCard from '../components/TaskCard.vue'

const tasks = ref<Task[]>([]);
const { toggleTaskCompletion, handleDeleteTask, getTasks, loading, error } = useTaskCard(tasks);

// Load tasks with error handling
onMounted(async () => {
    await getTasks();
});

</script>
<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <!-- Display loading state -->
            <div v-if="loading">Loading tasks...</div>
            <!-- Display error state -->
            <div v-if="error">{{ error }}</div>
            <!-- Task list -->
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div class="relative">
                        <input
                            type="text"
                            class="form-control form-control-lg padding-right-lg"
                            placeholder="+ Add new task. Press enter to save."
                        />
                    </div>
                    <!-- List of tasks -->
                    <div class="mt-4" v-if="tasks.length > 0">
                        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @toggle-task-completion="toggleTaskCompletion" @delete-task="handleDeleteTask" />
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