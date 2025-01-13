<template>
    <AppLayout>
      <template v-slot:default>
        <div class="p-4">
          <h1>Terms and Conditions</h1>
          <p>Welcome to our todo list application. By using our app, you agree to the following terms and conditions:</p>
  
          <v-card v-for="(term, index) in terms" :key="index" class="mb-4">
            <v-card-title>{{ term.title }}</v-card-title>
            <v-card-text>{{ term.description }}</v-card-text>
          </v-card>
        </div>
      </template>
    </AppLayout>
  </template>
  
  <script lang="ts" setup>
  import AppLayout from '@/components/AppLayout.vue';
  
  const terms = [
    {
      title: '1. Acceptance of Terms',
      description: 'By accessing or using the app, you agree to be bound by these terms. If you do not agree, please do not use the app.',
    },
    {
      title: '2. User Responsibilities',
      description: 'You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.',
    },
    {
      title: '3. Use of the App',
      description: 'You agree to use the app only for lawful purposes and in accordance with these terms. You must not use the app in any way that violates any applicable federal, state, local, or international law.',
    },
    {
      title: '4. Intellectual Property',
      description: 'All content, features, and functionality of the app are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.',
    },
    {
      title: '5. Limitation of Liability',
      description: 'We are not liable for any damages arising from your use of the app or inability to use the app, including but not limited to direct, indirect, incidental, punitive, and consequential damages.',
    },
    {
      title: '6. Changes to Terms',
      description: 'We may revise these terms from time to time. We will notify you of any changes by posting the new terms on this page.',
    },
    {
      title: '7. Contact Us',
      description: 'If you have any questions about these Terms and Conditions, please contact us at support@example.com.',
    },
  ];
  </script>