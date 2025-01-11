<script lang="ts" setup>
import { ref } from 'vue';
import { escapeSpecialCharacters } from '@/utils/InputHelper';
interface AddTaskEventPayload {
    name: string;
}
const emit = defineEmits<(event: 'add-task', payload: AddTaskEventPayload) => void>();
const newTask = ref<string>('');
const addTask = (): void => {
    if (newTask.value === '') {
        return;
    }
    emit('add-task', { name: escapeSpecialCharacters(newTask.value) });
    newTask.value = '';
};
const rules = [
    (value: string) => {
        return value.length <= 100 || 'Max 100 characters';
    },
];
</script>
<template>
    <v-text-field :rules="rules" hide-details="auto" label="Add new task. Press enter to save" v-model.trim="newTask" @keyup.enter="addTask" @keyup.escape="newTask = ''" prepend-icon="mdi-plus-box" />
</template>