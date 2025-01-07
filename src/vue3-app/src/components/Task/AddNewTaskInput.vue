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
    emit('add-task', { name: escapeSpecialCharacters(newTask.value) });
    newTask.value = '';
};
const rules = [
    (value: string) => {
        return !!value;
    },
    (value: string) => {
        return value.length <= 100 || 'Max 100 characters';
    },
    (value: string) => {
        return value.length >= 3 || 'Min 3 characters';
    },
];
const escapeSpecialCharacters = (str: string): string => {
    return str.replace(/[&<>'"]/g, (char) => {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;',
        }[char] || '';
    });
};
</script>
<template>
    <v-text-field :rules="rules" hide-details="auto" label="Add new task. Press enter to save" v-model.trim="newTask" @keyup.enter="addTask" @keyup.escape="newTask = ''" prepend-icon="mdi-plus-box" />
</template>