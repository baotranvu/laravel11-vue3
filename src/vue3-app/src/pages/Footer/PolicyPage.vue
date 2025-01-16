<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
import { VExpansionPanels, VExpansionPanel } from 'vuetify/components';

const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || 'support@example.com';

const policyItems = [
    {
        title: "Information We Collect",
        text: "User-provided Information: When you create an account, we collect personal information such as your name and email address. Usage Data: We collect information on how you use the app, including the tasks you create and complete."
    },
    {
        title: "How We Use Your Information",
        text: "We use your information to provide and maintain our service, notify you about changes, allow participation in interactive features, provide customer support, and gather analysis to improve our service."
    },
    {
        title: "Data Security",
        text: "We take the security of your data seriously and implement appropriate technical and organizational measures to protect it."
    },
    {
        title: "Changes to This Policy",
        text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
    },
    {
        title: "Contact Us",
        text: `If you have any questions about this Privacy Policy, please contact us at ${supportEmail}`
    }
];
</script>

<template>
    <AppLayout>
        <template v-slot:default>
            <div class="p-4">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your
                    information.</p>
                <v-card v-for="(term, index) in policyItems" :key="index" class="mb-4" role="article"
                    :aria-labelledby="`term-${index}-title`">
                    <v-card-title :id="`term-${index}-title`">{{ term.title }}</v-card-title>
                    <v-card-text>{{ term.text }}</v-card-text>
                </v-card>
            </div>
        </template>
    </AppLayout>
</template>