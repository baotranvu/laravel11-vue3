<!-- components/Modal.vue -->
<template>
    <v-dialog v-model="isVisible" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-subtitle>{{ message }}</v-card-subtitle>
            <v-card-actions>
                <v-btn color="blue" @click="handleCancel">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="handleConfirm">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore()
const { id, title, message, handleConfirm, handleCancel } = defineProps<{
    id: string;
    title: string;
    message: string;
    handleConfirm: () => void;
    handleCancel: () => void;
}>();
const modal = computed(() => modalStore.getModalById(id))
const isVisible = computed(() => !!modal.value)
</script>