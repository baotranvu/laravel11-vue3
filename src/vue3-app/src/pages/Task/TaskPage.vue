<script setup lang="ts">
//import utils
import { ref, onMounted, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
//import composable
import useTaskCard from '@/composables/useTaskCard';
//import components
import TaskCardSkeleton from '@/components/skeleton/TaskCardSkeleton.vue';
import AddNewTaskInput from '@/components/Task/AddNewTaskInput.vue';
import ToggleTaskButton from '@/components/Task/ToggleTaskButton.vue';
import AppLayout from '@/components/AppLayout.vue';
import AppModal from '@/components/AppModal.vue';
//import store
import { useGlobalStore } from '@/stores/global';
import { useTaskStore } from '@/stores/task';
import { useModalStore } from '@/stores/modal';
//import types
import type { Modal } from '@/types/Modal';

interface DataTableHeader {
    title: string;
    key: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
}

const router = useRouter()
const globalStore = useGlobalStore();
const taskStore = useTaskStore();
const modalStore = useModalStore();
const { isLoading } = storeToRefs(globalStore);
const { getUncompletedTasks, meta, tasks } = storeToRefs(taskStore);
const showCompletedTasks = ref(true);
const deletedTaskId = ref<number | null>(null);
const { debouncedToggleTaskCompletion, handleDeleteTask, getTasks, debounceHandleAddTask, debouncedUpdateTask } = useTaskCard();
// Filter tasks based on completion status
const filteredTasks = computed(() => {
    return showCompletedTasks.value ? tasks.value : getUncompletedTasks.value;
});
const isEdit = ref<number | null>(null);
const taskHeaders: DataTableHeader[] = [
    { title: 'ID', key: 'id', align: 'start', sortable: true },
    { title: 'Name', key: 'name', align: 'start', sortable: true },
    { title: 'Completed', key: 'is_completed', sortable: false },
    { title: 'Actions', key: 'actions', sortable: false }
]
onMounted(async () => {
    await getTasks();
});

interface AddTaskEventPayload {
    name: string;
}

const addTask = (payload: AddTaskEventPayload) => {
    debounceHandleAddTask(payload.name);
};

const handleToggleCompletedTasks = (isCompleted: boolean) => {
    showCompletedTasks.value = isCompleted;
};


const perPageOptions = ref<number[]>([10, 15, 25, 50, 100]);
const itemPerPage = ref<number>(10);

const handleTableOptionsChange = (itemsPerPage: number) => {
    itemPerPage.value = itemsPerPage;
    getTasks(meta.value.current_page, itemPerPage.value);
}
let deleteModal: Modal = reactive({
    id: 'delete-task-modal',
    title: 'Delete task',
    message: 'Are you sure you want to delete this task?',
});
const openDeleteModal = (taskId: number) => {
    deletedTaskId.value = taskId;
    modalStore.openModal(deleteModal);
};

const closeDeleteModal = () => {
    modalStore.closeModal(deleteModal.id);
};

const deleteTask = () => {
    if (deletedTaskId.value !== null) {
        try {
            handleDeleteTask(deletedTaskId.value);
            deletedTaskId.value = null;
        } catch (e: any) {
            const error = e?.response?.data ?? { status: 500, message: 'Something went wrong' };
            globalStore.setError({
                status: error.status,
                message: error.message
            });
        } finally {
            closeDeleteModal();
        }
    }
};
</script>
<template>
    <AppLayout>
        <v-container>
            <v-row>
                <v-col cols="12" md="8" offset-md="2">
                    <!-- Add new Task -->
                    <v-row>
                        <v-col cols="12">
                            <AddNewTaskInput @add-task="addTask" />
                            <ToggleTaskButton @toggle-completed-tasks="handleToggleCompletedTasks" />
                        </v-col>
                    </v-row>
                    <!-- Display loading state -->
                    <v-row v-if="isLoading">
                        <v-col cols="12">
                            <TaskCardSkeleton v-for="i in 3" :key="i" class="mt-4" />
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12">
                            <!-- List of tasks -->
                            <v-data-table-server 
                                v-model:items-per-page="itemPerPage" 
                                :items-per-page-options="perPageOptions" 
                                :items="filteredTasks"
                                :items-length="meta.total" 
                                :loading="isLoading" item-value="name" 
                                @update:items-per-page="handleTableOptionsChange"
                                @update:page="(page) => getTasks(page, itemPerPage)"
                                :headers="taskHeaders" 
                                :show-current-page="true"
                                :show-filter="true"
                                :page="meta.current_page"
                                :height="500"
                                class="elevation-1"
                                no-data-text="No tasks found. Add a new task above."
                                :fixed-header="true"
                            >
                                
                                <template v-slot:item.is_completed="{ item }">
                                    <input class="form-check-input mt-0 toggle-task-completion" type="checkbox"
                                        role="switch" aria-label="Task completion checkbox" :checked="item.is_completed"
                                        @change="debouncedToggleTaskCompletion(item)" />
                                </template>
                                <template v-slot:item.id="{ item }">
                                    <router-link :to="`/task/${item.id}`">{{ item.id }}</router-link>
                                </template>
                                <template v-slot:item.name="{ item }">
                                    <div class="ms-2 flex-grow-1 w-100 task-title" title="Double click the text to edit or remove" v-if="isEdit !== item.id" @dblclick="isEdit = item.id">
                                        <span :class="{ 'completed': item.is_completed }">{{ item.name }}</span>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center" v-else>
                                        <label for="new-task-input" class="visually-hidden">New task name</label>
                                        <input id="new-task-input" type="text" class="form-control form-control-md padding-right-lg"
                                            placeholder="Change the task name. Press enter to save." v-model.trim="item.name" @keyup.enter="debouncedUpdateTask(item.id, item)"
                                            @keyup.escape="isEdit = null" maxlength="100" aria-describedby="task-input-help" required />
                                    </div>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <div class="d-flex flex-row justify-content-center align-items-center">
                                        <EditButton :itemId="item.id" @click="router.push(`/task/${item.id}`)" />
                                        <DeleteButton :itemId="item.id" @click="openDeleteModal(item.id)" />
                                    </div>
                                </template>
                                <template v-slot:loading>
                                    <v-progress-linear indeterminate color="primary"></v-progress-linear>
                                </template>
                            </v-data-table-server>

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <AppModal :handleConfirm="deleteTask" :handleCancel="closeDeleteModal" :id="deleteModal.id"
            :title="deleteModal.title" :message="deleteModal.message" />
    </AppLayout>
</template>
<style scoped>
@import '@/assets/task.css';
</style>