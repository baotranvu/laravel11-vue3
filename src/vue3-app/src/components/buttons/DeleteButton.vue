<script setup lang="ts">
import IconTrash from '../icons/IconTrash.vue';
import { defineEmits } from 'vue';
import { Task } from '@/types/Task';

defineProps<{
    task: Task
}>()


const emit = defineEmits(['delete-task']);

const deleteTask = (task: Task) => {
    emit('delete-task', task);
};
</script>
<template>
   <button class="btn btn-sm btn-circle btn-outline-danger" @click="deleteTask(task)">
       <IconTrash />
    </button>
</template>