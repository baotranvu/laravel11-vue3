<template>
    <AppLayout>
        <template v-slot:default>
            <v-container class="d-flex flex-column align-items-center w-100">
                <v-row>
                    <v-col>
                        <h1>Task Detail</h1>
                    </v-col>
                </v-row>
                <v-row class="w-100">
                    <v-col cols="12" md="8" offset-md="2">
                        <v-form v-if="task" class="w-100">
                            <v-row>
                                <v-col cols="8">
                                    <v-row>
                                        <v-col>
                                            <v-text-field label="Task Name" v-model="task.name" required/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select label="Progress" v-model="task.progress" :items="progresses" item-title="text" item-value="value" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-progress-linear v-model="task.progress" striped height="25"/>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="4">
                                    <v-row>
                                        <v-col>
                                            <v-checkbox label="Completed" v-model="task.is_completed" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select label="Priority" :items="['Low', 'Medium', 'High']" v-model="task.priority" />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="4">
                                    <v-row>
                                        <v-col>
                                            <v-text-field label="Estimate Time" v-model="estimateTime" disabled />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-date-picker width="100%" title="Start Date" v-model="task.start_date"/>
                                </v-col>
                                <v-col cols="6">
                                    <v-date-picker width="100%" title="Due Date" v-model="task.due_date"/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn color="primary" @click="saveTask">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue';
import { useGlobalStore } from '@/stores/global';
import { Task } from '@/types/Task';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import useTaskCard  from '@/composables/useTaskCard';
const { getTaskById } = useTaskCard();
const globalStore = useGlobalStore();
const route = useRoute();
const taskStore = useTaskStore();
const task = reactive({
    name: '',
    start_date: new Date(),
    due_date: new Date(),
    id: 0,
    is_completed: false,
    status: '',
    priority: '',
    progress: 0,
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
        
    } catch (error) {
        
    }
}

onMounted(async () => {
    globalStore.setLoading(true);
    try {
        const id = route.params.id;
        //task.value = await getTaskById(parseInt(id as string)) as Task; 
    } catch (error:any) {
        globalStore.setError(error);
    } finally {
        globalStore.setLoading(false);
    }
});
const estimateTime = computed(() => {
    const startTime = task.start_date.getTime();
    const dueTime = task.due_date.getTime();
    const differenceInTime = dueTime - startTime;
    const differenceInHours = differenceInTime / (1000 * 3600); // Convert milliseconds to hours
    return differenceInHours > 0 ? differenceInHours : 0;
});
</script>

<style scoped>
/* Add any specific styles here */
</style>