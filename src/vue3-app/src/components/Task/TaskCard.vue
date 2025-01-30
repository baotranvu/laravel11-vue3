<script lang="ts" setup>
import { Task } from '../../types/Task';  // Import the Task interface
import { ref } from 'vue';

defineProps<{ task: Task}>()
const isEdit = ref(false);
const originalTaskName = ref('');
const emit = defineEmits(['toggle-task-completion', 'delete-task', 'edit-task'])

const toggleTaskCompletion = (task: Task) => {
    emit('toggle-task-completion', task)
}
const deleteTask = (taskId: number) => {
    if(taskId) {
        emit('delete-task', taskId)
    }
}
const editTask = (taskId: number, newName: string) => {
    if(!newName || !taskId) {
        isEdit.value = false;
        return
    }
    emit('edit-task', taskId, newName)
    isEdit.value = false;
}

const handleEdit = (task: Task):void => {
    isEdit.value = true;
    originalTaskName.value = task.name
}

const handleCancel = (task: Task) => {
    isEdit.value = false;
    task.name = originalTaskName.value;
}

</script>

<template>
    <div class="card mt-2 p-1" :class="{ 'bg-light': task.is_completed }" aria-label="Task card">
        <ul class="list-group list-group-flush">
            <li class="list-group-item py-3 mx-2 task-item" aria-label="Task item">
                <div class="d-flex justify-content-between align-items-center" v-if="!isEdit" @dblclick="handleEdit(task)">
                    <span class="me-2">{{ task.id }}</span>
                    <input class="form-check-input mt-0 toggle-task-completion" type="checkbox" role="switch"
                        aria-label="Task completion checkbox" :checked="task.is_completed"
                        @change="toggleTaskCompletion(task)" />
                    <div class="ms-2 flex-grow-1 w-100 task-title" title="Double click the text to edit or remove">
                        <span :class="{ 'completed': task.is_completed }">{{ task.name }}</span>
                    </div>
                    <div class="task-date" v-if="task.created_at && !$vuetify.display.mobile">
                        {{ new Intl.DateTimeFormat('default', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }).format(new Date(task.created_at)) }}
                    </div>
                </div>
                <div class="d-flex justify-content-start align-items-center" v-else>
                    <label for="new-task-input" class="visually-hidden">New task name</label>
                    <input id="new-task-input" type="text" class="form-control form-control-md padding-right-lg"
                        placeholder="Change the task name. Press enter to save." v-model.trim="task.name" @keyup.enter="editTask(task.id, task.name)" @keyup.escape="handleCancel(task)"
                        maxlength="100" aria-describedby="task-input-help" required />
                </div>
                <div class="task-actions" v-if="!isEdit">
                    <EditButton :itemId="task.id" @click="handleEdit(task)" />
                    <DeleteButton @item-delete="deleteTask" :itemId="task.id" />
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
@import '@/assets/task.css';
</style>
