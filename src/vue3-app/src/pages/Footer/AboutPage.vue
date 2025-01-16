<template>
  <AppLayout>
    <v-container class="d-flex flex-column align-items-center">
      <h1 class="text-center">About Us</h1>
      <v-col cols="12" v-if="$vuetify.display.lgAndUp">
        <v-card>
          <v-tabs v-model="tab" bg-color="primary" vertical>
            <v-tab v-for="(item, index) in tabs" :key="index" :value="item.value">{{ item.title }}</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item v-for="(item, index) in tabs" :key="index" :value="item.value">
                <p v-html="item.content"></p>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" v-else>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, index) in tabs" :key="index" :title="item.title" :text="item.content">
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-img src="/src/assets/images/about.webp" alt="About Us" max-width="400" :width="$vuetify.display.lgAndUp ? 400 : 200" class="mb-4"/>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { ref } from 'vue';

const tab = ref('ourStory');

const tabs = [
  {
    value: 'ourStory',
    title: 'Our Story',
    content: 'We started this project with the goal of creating a simple and effective tool for managing tasks and to-do lists. Whether you\'re a student, a professional, or someone looking to keep track of personal tasks, our app is designed to meet your needs.'
  },
  {
    value: 'ourFeatures',
    title: 'Our Features',
    content: `<ul>\n        <li>Easy task creation and management.</li>\n        <li>Set due dates and reminders for your tasks.</li>\n        <li>Organize tasks into categories for better organization.</li>\n        <li>Track your progress and mark tasks as complete.</li>\n      </ul>`
  },
  {
    value: 'meetTheTeam',
    title: 'Meet the Team',
    content: 'Our team is made up of passionate developers and designers who are dedicated to providing you with the best user experience. We believe in continuous improvement and welcome your feedback!'
  },
  {
    value: 'contactUs',
    title: 'Contact Us',
    content: 'If you have any questions or suggestions, feel free to reach out to us at support@example.com.'
  }
];
</script>