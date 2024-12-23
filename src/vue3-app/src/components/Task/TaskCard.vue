<script lang="ts" setup>
import { Task } from '../../types/Task';  // Import the Task interface

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
const editTask = (taskId: number) => {
    emit('edit-task', taskId)
}
</script>

<template>
    <div 
        class="card mt-2"
        :class="{ 'bg-light': task.is_completed }"
        aria-label="Task card"
    >
        <ul class="list-group list-group-flush">
            <li class="list-group-item py-3">
                <div class="d-flex justify-content-start align-items-center">
                    <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        :disabled="disabled"
                        aria-label="Task completion checkbox"
                        :checked="task.is_completed"
                        @change="toggleTaskCompletion(task)"
                    />
                    <div
                        class="ms-2 flex-grow-1"
                        title="Double click the text to edit or remove"
                    >
                        <span :class="{ 'completed': task.is_completed }">{{ task.name }}</span>
                    </div>
                    <div class="task-date">
                        {{ new Intl.DateTimeFormat('default', { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                        }).format(task.created_at ? new Date(task.created_at) : new Date()) }}
                    </div>
                </div>
                <div class="task-actions">
                    <EditButton :itemId="task.id" @item-edit="editTask" />
                    <DeleteButton @item-delete="deleteTask" :itemId="task.id"/>
                </div>
            </li>
        </ul>
    </div>
</template>
