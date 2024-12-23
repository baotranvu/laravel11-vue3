<script lang="ts" setup>
import { ref } from 'vue';
interface AddTaskEventPayload {
    name: string;
}   
const emit = defineEmits<(event: 'add-task', payload: AddTaskEventPayload) => void>();
const newTask = ref<string>('');
const addTask = (): void => {
    if (newTask.value === '') {
        return;
    }
    emit('add-task', { name: newTask.value });
    newTask.value = '';
};
</script>
<template>
    <div class="relative">
        <label for="new-task-input" class="visually-hidden">New task name</label>
        <input
            id="new-task-input"
            type="text"
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save."
            v-model.trim="newTask"
            @keyup.enter="addTask"
            maxlength="100"
            aria-describedby="task-input-help"
        />
        <small id="task-input-help" class="form-text text-muted">
            Press Enter to add a new task
        </small>
    </div>
</template>