<script lang="ts" setup>
import { ref } from 'vue';
import { VContainer, VSwitch } from 'vuetify/components';

// Composable for task visibility
const useTaskVisibility = () => {
    const showCompletedTasks = ref(true);

    const toggleCompletedTasks = () => {
        showCompletedTasks.value = !showCompletedTasks.value;
    };

    return {
        showCompletedTasks,
        toggleCompletedTasks
    };
};

// Use the composable
const { showCompletedTasks, toggleCompletedTasks } = useTaskVisibility();
</script>

<template>
        <VContainer>
                <VSwitch
                        v-model="showCompletedTasks"
                        @change="toggleCompletedTasks"
                        :label="showCompletedTasks ? 'Show completed tasks' : 'Hide completed tasks'"
                ></VSwitch>
        </VContainer>
</template>