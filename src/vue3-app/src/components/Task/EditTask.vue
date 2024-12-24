<script lang="ts" setup>
import type { Task } from '@/types/Task';
import BaseModal from '@/components/base/BaseModal.vue';
import { ref } from 'vue';

const props = defineProps<{ task: Task }>();
const emit = defineEmits(['edit-task']);
const newName = ref(props.task.name);

const editTask = () => {
    if(!newName) return;
    emit('edit-task', props.task.id, newName.value);
};
</script>

<template>
    <BaseModal title="Edit Task">
        <template #content>
            <v-text-field
                v-model.trim="newName"
                label="Task name"
                outlined
                dense
                @keydown.enter="editTask"
            ></v-text-field>
        </template>
    </BaseModal>
</template>