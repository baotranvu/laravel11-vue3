<script setup lang="ts">
import IconTrash from '../icons/IconTrash.vue';

// Make props more generic to accept any item
const props = defineProps<{
    itemId: number | string // Instead of passing whole object, just pass ID
}>()

const emit = defineEmits(['item-delete']);

const handleDelete = () => {
    emit('item-delete', props.itemId);
};
</script>

<template>
   <button 
        class="btn btn-sm btn-circle btn-outline-danger" 
        @click="handleDelete"
        aria-label="Delete item"
    >
       <IconTrash />
    </button>
</template>