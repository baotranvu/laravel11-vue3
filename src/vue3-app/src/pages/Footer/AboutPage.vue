<template>
  <AppLayout>
    <template v-slot:default>
      <div class="p-4">
        <h1>About Us</h1>
        <p>Welcome to our todo list application! Our mission is to help you stay organized and productive.</p>

        <h2>Our Story</h2>
        <p>We started this project with the goal of creating a simple and effective tool for managing tasks and to-do lists. Whether you're a student, a professional, or someone looking to keep track of personal tasks, our app is designed to meet your needs.</p>

        <h2>Our Features</h2>
        <ul>
          <li>Easy task creation and management.</li>
          <li>Set due dates and reminders for your tasks.</li>
          <li>Organize tasks into categories for better organization.</li>
          <li>Track your progress and mark tasks as complete.</li>
        </ul>

        <h2>Meet the Team</h2>
        <p>Our team is made up of passionate developers and designers who are dedicated to providing you with the best user experience. We believe in continuous improvement and welcome your feedback!</p>

        <h2>Contact Us</h2>
        <p>If you have any questions or suggestions, feel free to reach out to us at support@example.com.</p>
      </div>
    </template>
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
</script>