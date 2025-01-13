<script setup lang="ts">
import { VBtn } from 'vuetify/components';
const props = defineProps<{ itemId: number }>();
const emit = defineEmits(['item-edit']);
const handleClick = () => {
    emit('item-edit', props.itemId);
}
</script>

<template>
    <v-btn 
        icon="mdi-pencil"
        variant="outlined"
        @click="handleClick"
        size="x-small"
    />
</template>