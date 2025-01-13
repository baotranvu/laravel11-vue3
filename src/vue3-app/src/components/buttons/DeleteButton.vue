<script setup lang="ts">
import { VBtn } from 'vuetify/components';

// Make props more generic to accept any item
const props = defineProps<{
    itemId: number | string // Instead of passing whole object, just pass ID
}>()

const emit = defineEmits(['item-delete']);

const handleDelete = () => {
    if(props.itemId) {
        emit('item-delete', props.itemId);
    }
};
</script>

<template>
   <v-btn 
        icon="mdi-delete"
        variant="outlined"
        @click="handleDelete"
        size="x-small"
        :title="'Delete item'"
        aria-label="Delete item"
    />
</template>