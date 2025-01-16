<template>
  <AppLayout>
    <template v-slot:default>
      <div class="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p>Welcome to our todo list application. By using our app, you agree to the following terms and conditions:</p>
        <v-row>
          <v-col cols="5" v-if="$vuetify.display.lgAndUp">
            <v-img src="/src/assets/images/terms.webp" cover alt="Terms and Conditions" max-width="400" :width="400"
              class="mb-4" />
          </v-col>
          <v-col cols="7">
            <section aria-label="Terms and Conditions List">
              <v-expansion-panels>
                <v-expansion-panel v-for="(item, index) in terms" :key="index" :title="item.title"
                  :text="item.description">
                </v-expansion-panel>
              </v-expansion-panels>
            </section>
          </v-col>
        </v-row>
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