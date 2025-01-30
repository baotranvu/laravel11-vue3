<template>
    <AppLayout>
        <template v-slot:default>
            <v-row>
                <v-btn prepend-icon="mdi-arrow-left" variant="outlined" color="primary"
                    @click="$router.back()">Back</v-btn>
            </v-row>
            <v-container class="d-flex flex-column align-items-center w-100 mt-4 mb-4">
                <v-row>
                    <v-col>
                        <h1>Task Detail</h1>
                    </v-col>
                    <v-form v-if="task" class="w-100" ref="form" @submit.prevent="saveTask" validate-on="submit">
                        <v-row>
                            <v-col cols="8">
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Task Name" v-model="task.name"
                                            :rules="[v => !!v || 'Task name is required']" required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select label="Progress" v-model="task.progress" :items="progresses"
                                            item-title="text" item-value="value" />
                                    </v-col>
                                    <v-col cols="6" class="d-flex align-items-center">
                                        <v-progress-linear v-model="task.progress" striped height="25" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field label="Estimate Time" v-model="estimateTime" disabled />
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row>
                                    <v-col>
                                        <v-checkbox label="Completed" v-model="task.is_completed" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-date-picker title="Start Date" v-model="task.start_date"
                                   
                                    :rules="[
                                        (v: string | Date | null) => !!v || 'Start date is required',
                                        (v: string | Date | null) => v && v < task.due_date || 'Start date must be before due date'
                                    ]" required />
                            </v-col>
                            <v-col cols="6">
                                <v-date-picker title="Due Date" v-model="task.due_date"
                                    
                                    :rules="[
                                        (v: string | Date | null) => !!v || 'Due date is required',
                                        (v: string | Date | null) => v && v > task.start_date || 'Due date must be after start date'
                                    ]" required />
                            </v-col>
                        </v-row>
                        <v-row class="mt-4 mb-4">
                            <v-col cols="12" class="d-flex justify-content-start">
                                <v-btn color="primary" type="submit" :loading="isLoading"
                                    :disabled="isLoading">Save</v-btn>
                                <v-btn color="secondary" class="ml-2" :disabled="isLoading"
                                    @click="$router.back()">Cancel</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-row>
            </v-container>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useDate } from 'vuetify';
import { useRoute } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue';
import { useGlobalStore } from '@/stores/global';
import { Task } from '@/types/Task';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import useTaskCard from '@/composables/useTaskCard';
import { defaultTo } from 'lodash-es';
const { getTaskById } = useTaskCard();
const globalStore = useGlobalStore();
const { isLoading } = storeToRefs(globalStore);
const route = useRoute();
const taskStore = useTaskStore();
const date = useDate();
const task = reactive<Task>({
    id: 0,
    name: '',
    start_date: date.date() as Date,
    due_date: date.date() as Date,
    is_completed: false,
    progress: 0,
});
const estimateTime = computed(() => {
    if (!task.start_date || !task.due_date) return 0;

    // Ensure we're working with Date objects
    const startDate = date.date(task.start_date) as Date;
    const dueDate = date.date(task.due_date) as Date;
    if (!date.isValid(startDate) || !date.isValid(dueDate)) return 0;
    if (date.isAfter(dueDate, startDate) || date.isSameDay(dueDate, startDate)) {
        const estimate = date.getDate(dueDate) - date.getDate(startDate);
        const days = defaultTo(estimate, 1);
        const hours = (days + 1) * 8;
        return hours;
    }

    return 0;
});
const progresses = ref([
    { text: '0%', value: 0 },
    { text: '10%', value: 10 },
    { text: '20%', value: 20 },
    { text: '30%', value: 30 },
    { text: '40%', value: 40 },
    { text: '50%', value: 50 },
    { text: '60%', value: 60 },
    { text: '70%', value: 70 },
    { text: '80%', value: 80 },
    { text: '90%', value: 90 },
    { text: '100%', value: 100 },
]);
const saveTask = async () => {
    try {

        // Add your save logic here, e.g., API call to save taskToSave
    } catch (error) {
        // Handle error
    }
};

onMounted(async () => {
    globalStore.setLoading(true);
    try {
        const id = route.params.id;
        const fetchedTask = await getTaskById(parseInt(id as string));
        if (!fetchedTask) {
            throw new Error('Task not found');
        }
        Object.assign(task, fetchedTask);
    } catch (error: any) {
        globalStore.setError(error);
    } finally {
        globalStore.setLoading(false);
    }
});
</script>

<style scoped>
/* Add any specific styles here */
</style>