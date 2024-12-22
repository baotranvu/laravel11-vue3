<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Task } from '../types/Task';  // Import the Task interface

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object as PropType<Task>,  // Type the task prop as Task
      required: true,
    },
    
  },
  methods: {
    toggleTaskCompletion(task: Task) {
       this.$emit('toggle-task-completion', task);
    }
  }
});
</script>

<template>
    <div class="card mt-2">
        <ul class="list-group list-group-flush">
            <li class="list-group-item py-3">
                <div class="d-flex justify-content-start align-items-center">
                    <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        :checked="task.is_completed"
                        @change="toggleTaskCompletion(task)"
                    />
                    <div
                        class="ms-2 flex-grow-1"
                        title="Double click the text to edit or remove"
                    >
                        <span :class="{ 'completed': task.is_completed }">{{ task.name }}</span>
                    </div>
                    <div class="task-date">{{ new Date(task.created_at) }}</div>
                </div>
                <div class="task-actions">
                    <EditButton/>
                    <DeleteButton/>
                </div>
            </li>
        </ul>
    </div>
</template>
