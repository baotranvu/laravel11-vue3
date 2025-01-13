<template>
    <AppLayout>
        <template v-slot:default>
            <div class="p-4">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your
                    information.</p>

                <h2>Information We Collect</h2>
                <ul>
                    <li>User-provided Information: When you create an account, we collect personal information such as
                        your name and email address.</li>
                    <li>Usage Data: We collect information on how you use the app, including the tasks you create and
                        complete.</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                    <li>Provide and maintain our service.</li>
                    <li>Notify you about changes to our service.</li>
                    <li>Allow you to participate in interactive features of our service when you choose to do so.</li>
                    <li>Provide customer support.</li>
                    <li>Gather analysis or valuable information so that we can improve our service.</li>
                </ul>

                <h2>Data Security</h2>
                <p>We take the security of your data seriously and implement appropriate technical and organizational
                    measures to protect it.</p>

                <h2>Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@example.com.</p>
            </div>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
</script>
