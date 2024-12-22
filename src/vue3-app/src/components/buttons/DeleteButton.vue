<script setup lang="ts">
import IconTrash from '../icons/IconTrash.vue';
defineProps();
function deleteTask() {
    console.log('Delete task');
}
</script>
<template>
   <button class="btn btn-sm btn-circle btn-outline-danger" :click="deleteTask">
       <IconTrash />
    </button>
</template>