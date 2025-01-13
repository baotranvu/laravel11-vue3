<template>
  <AppLayout>
    <template v-slot:default>
      <div class="p-4">
        <h1>Frequently Asked Questions</h1>
        <v-container>
          <v-row>
            <v-col v-for="(faq, index) in faqs" :key="index" cols="12" md="6">
              <v-card>
                <v-card-title>{{ faq.question }}</v-card-title>
                <v-card-text>{{ faq.answer }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppLayout from '@/components/AppLayout.vue';

const faqs = ref([
  {
    question: 'How do I create a new task?',
    answer: 'To create a new task, click on the "Add Task" button, enter the task details, and click "Save".',
  },
  {
    question: 'Can I edit a task after creating it?',
    answer: 'Yes, you can edit a task by clicking on the task and selecting the "Edit" option.',
  },
  {
    question: 'How do I mark a task as complete?',
    answer: 'To mark a task as complete, simply click the checkbox next to the task. It will be moved to the completed section.',
  },
  {
    question: 'Is there a way to delete a task?',
    answer: 'Yes, you can delete a task by clicking on the task and selecting the "Delete" option.',
  },
  {
    question: 'Can I set due dates for tasks?',
    answer: 'Absolutely! When creating or editing a task, you can set a due date to help manage your deadlines.',
  },
  {
    question: 'Does the app support notifications?',
    answer: 'Yes, you can enable notifications to remind you of upcoming tasks and deadlines.',
  },
]);
</script>