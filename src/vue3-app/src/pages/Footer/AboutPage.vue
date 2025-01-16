<template>
  <AppLayout>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="ourStory">Our Story</v-tab>
        <v-tab value="ourFeatures">Our Features</v-tab>
        <v-tab value="meetTheTeam">Meet the Team</v-tab>
        <v-tab value="contactUs">Contact Us</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="ourStory">
            <p>We started this project with the goal of creating a simple and effective tool for managing tasks and to-do lists. Whether you're a student, a professional, or someone looking to keep track of personal tasks, our app is designed to meet your needs.</p>
          </v-tabs-window-item>

          <v-tabs-window-item value="ourFeatures">
            <ul>
              <li>Easy task creation and management.</li>
              <li>Set due dates and reminders for your tasks.</li>
              <li>Organize tasks into categories for better organization.</li>
              <li>Track your progress and mark tasks as complete.</li>
            </ul>
          </v-tabs-window-item>

          <v-tabs-window-item value="meetTheTeam">
            <p>Our team is made up of passionate developers and designers who are dedicated to providing you with the best user experience. We believe in continuous improvement and welcome your feedback!</p>
          </v-tabs-window-item>

          <v-tabs-window-item value="contactUs">
            <p>If you have any questions or suggestions, feel free to reach out to us at support@example.com.</p>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/AppLayout.vue';
import { ref } from 'vue';
const tab = ref('ourStory');
</script>