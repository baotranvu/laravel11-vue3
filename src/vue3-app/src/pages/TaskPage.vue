<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskService from '../services/TaskService';
import type { Task } from '../types/Task';
import TaskCard from '../components/TaskCard.vue';

// Define tasks with explicit type
const tasks = ref<Task[]>([]);

// Load tasks with error handling
onMounted(async () => {
    try {
        tasks.value = await TaskService.all();
    } catch (error) {
        console.error('Failed to load tasks:', error);
        tasks.value = [];
    }
});

// Handle task completion toggle
const toggleTaskCompletion = async (task: Task): Promise<void> => {
    try {
        await TaskService.changeTaskStatus(task.id);
        tasks.value = tasks.value.map((t) => 
            t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
        );
    } catch (error) {
        console.error('Failed to toggle task:', error);
    }
};

// Handle task deletion
const handleDeleteTask = async (task: Task): Promise<void> => {
    try {
        await TaskService.delete(task.id);
        tasks.value = tasks.value.filter((t) => t.id !== task.id);
    } catch (error) {
        console.error('Failed to delete task:', error);
    }
};
</script>
<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
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
                    <div class="mt-4">
                        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @toggle-task-completion="toggleTaskCompletion" @delete-task="handleDeleteTask" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>