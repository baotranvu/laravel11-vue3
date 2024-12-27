<script lang="ts" setup>
import { Task } from '../../types/Task';  // Import the Task interface
import { ref } from 'vue';
withDefaults(defineProps<{
    task: Task;
    disabled?: boolean;
}>(), {
    disabled: false
})

const emit = defineEmits(['toggle-task-completion', 'delete-task', 'edit-task'])

const toggleTaskCompletion = (task: Task) => {
    emit('toggle-task-completion', task)
}
const deleteTask = (taskId: number) => {
    emit('delete-task', taskId)
}
const editTask = (taskId: number, newName: string) => {
    emit('edit-task', taskId, newName)
    isEdit.value = false;
}

const isEdit = ref(false);
const newTaskName = ref<string>('');
</script>

<template>
    <div class="card mt-2" :class="{ 'bg-light': task.is_completed }" aria-label="Task card">
        <ul class="list-group list-group-flush">
            <li class="list-group-item py-3">
                <div class="d-flex justify-content-start align-items-center" v-if="!isEdit">
                    <input class="form-check-input mt-0" type="checkbox" :disabled="disabled"
                        aria-label="Task completion checkbox" :checked="task.is_completed"
                        @change="toggleTaskCompletion(task)" />
                    <div class="ms-2 flex-grow-1" title="Double click the text to edit or remove">
                        <span :class="{ 'completed': task.is_completed }">{{ task.name }}</span>
                    </div>
                    <div class="task-date">
                        {{ new Intl.DateTimeFormat('default', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }).format(task.created_at ? new Date(task.created_at) : new Date()) }}
                    </div>
                </div>
                <div class="d-flex justify-content-start align-items-center" v-else>
                    <label for="new-task-input" class="visually-hidden">New task name</label>
                    <input id="new-task-input" type="text" class="form-control form-control-md padding-right-lg"
                        placeholder="Change the task name. Press enter to save." v-model.trim="newTaskName" @keyup.enter="editTask(task.id, newTaskName)"
                        maxlength="100" aria-describedby="task-input-help" required />
                </div>
                <div class="task-actions" v-if="!isEdit">
                    <EditButton :itemId="task.id" @click="isEdit = true" />
                    <DeleteButton @item-delete="deleteTask" :itemId="task.id" />
                </div>
            </li>
        </ul>
    </div>
</template>
