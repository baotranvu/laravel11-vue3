<script setup lang="ts">
import IconPencil from '../icons/IconPencil.vue';
const props = defineProps<{ itemId: number }>();
const emit = defineEmits(['item-edit']);
const handleClick = () => {
    emit('item-edit', props.itemId);
}
</script>

<template>
    <button 
        class="btn btn-sm btn-circle btn-outline-secondary me-1" 
        @click="handleClick"
    >
        <IconPencil />
    </button>
</template>