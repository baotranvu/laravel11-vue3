<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskService from '../services/TaskService';
import { Task,  } from '../types/Task';
import TaskCard from '../components/TaskCard.vue';
const tasks = ref<Task[]>([]);

onMounted(async () => {
    tasks.value = await TaskService.all();
});

function toggleTaskCompletion(task: Task) {
    task.is_completed = !task.is_completed;
    TaskService.markAsCompleted(task.id);
}

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
                        <TaskCard v-for="task in tasks" :key="task.id" :task="task" @toggle-task-completion="toggleTaskCompletion"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>