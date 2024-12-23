<script lang="ts" setup>
import type { Task } from '../../types/Task';
import { useModal } from '../../composables/useModal';

const { close, isOpen } = useModal();
const props = defineProps<{ task: Task }>()
const emit = defineEmits(['edit-task'])
const editTask = () => {
    emit('edit-task', props.task)
}
</script>

<template>
    <v-dialog v-model="isOpen" max-width="500">
        <v-card title="Edit Task">
            <v-card-text>
                <v-text-field
                    v-model="task.name"
                    label="Task name"
                    outlined
                    dense
                    @keydown.enter="editTask"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" @click="close"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
