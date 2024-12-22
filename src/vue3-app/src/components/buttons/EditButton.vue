<script setup lang="ts">
import IconPencil from '../icons/IconPencil.vue';
defineProps();
function editTask() {
    console.log('Edit task');
}
</script>
<template>
    <button class="btn btn-sm btn-circle btn-outline-secondary me-1" :click="editTask">
        <IconPencil />
    </button>
</template>