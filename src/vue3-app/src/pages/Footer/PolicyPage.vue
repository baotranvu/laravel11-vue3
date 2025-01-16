<template>
    <AppLayout>
        <template v-slot:default>
            <div class="p-4">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>

                <v-expansion-panels>
                    <v-expansion-panel
                        title="Information We Collect"
                        text="User-provided Information: When you create an account, we collect personal information such as your name and email address. Usage Data: We collect information on how you use the app, including the tasks you create and complete."
                    >
                    </v-expansion-panel>

                    <v-expansion-panel
                        title="How We Use Your Information"
                        text="We use your information to provide and maintain our service, notify you about changes, allow participation in interactive features, provide customer support, and gather analysis to improve our service."
                    >
                    </v-expansion-panel>

                    <v-expansion-panel
                        title="Data Security"
                        text="We take the security of your data seriously and implement appropriate technical and organizational measures to protect it."
                    >
                    </v-expansion-panel>

                    <v-expansion-panel
                        title="Changes to This Policy"
                        text="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
                    >
                    </v-expansion-panel>

                    <v-expansion-panel
                        title="Contact Us"
                        :text="`If you have any questions about this Privacy Policy, please contact us at ${supportEmail}`"
                    >
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
import { VExpansionPanels, VExpansionPanel } from 'vuetify/components';

const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || 'support@example.com';  
</script>