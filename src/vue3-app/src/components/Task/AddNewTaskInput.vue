<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits(['add-task']);
const newTask = ref<string>('');
const addTask = (): void => {
    emit('add-task', newTask.value);
    newTask.value = '';
};
</script>
<template>
    <div class="relative">
        <input
            type="text"
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save."
            v-model="newTask"
            @keyup.enter="addTask"
        />
    </div>
</template>