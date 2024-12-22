<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Task } from '../types/Task'

defineProps<{
    task: Task
}>()

const emit = defineEmits(['toggle-task-completion'])

const toggleTaskCompletion = (task: Task) => {
    emit('toggle-task-completion', task)
}
</script>

<template>
    <div class="card mt-2">
        <ul class="list-group list-group-flush">
            <li class="list-group-item py-3">
                <div class="d-flex justify-content-start align-items-center">
                    <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        :checked="task.is_completed"
                        @change="toggleTaskCompletion(task)"
                    />
                    <div
                        class="ms-2 flex-grow-1"
                        title="Double click the text to edit or remove"
                    >
                        <span :class="{ 'completed': task.is_completed }">{{ task.name }}</span>
                    </div>
                    <div class="task-date">{{ new Date(task.created_at) }}</div>
                </div>
                <div class="task-actions">
                    <EditButton/>
                    <DeleteButton/>
                </div>
            </li>
        </ul>
    </div>
</template>
