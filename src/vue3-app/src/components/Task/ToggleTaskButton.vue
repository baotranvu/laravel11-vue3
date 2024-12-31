<script lang="ts" setup>
import { ref } from 'vue';

const showCompletedTasks = ref(true);
const emit = defineEmits(['toggle-completed-tasks']);
const handleToggleCompletedTasks = () => {
    emit('toggle-completed-tasks', showCompletedTasks.value);
}
</script>

<template>
        <v-container>
                <v-switch
                        v-model="showCompletedTasks"
                        color="primary"
                        :label="showCompletedTasks ? 'Hide completed tasks' : 'Show completed tasks'"
                        @change="handleToggleCompletedTasks"
                ></v-switch>
        </v-container>
</template>