<template>
    <AppLayout>
        <template v-slot:default>
            <div class="d-flex flex-column align-items-center justify-content-center p-4">
                <h1>Terms and Conditions</h1>
                <p>Welcome to our todo list application. By using our app, you agree to the following terms and
                    conditions:</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using the app, you agree to be bound by these terms. If you do not agree, please do
                    not use the app.</p>

                <h2>2. User Responsibilities</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to
                    notify us immediately of any unauthorized use of your account.</p>

                <h2>3. Use of the App</h2>
                <p>You agree to use the app only for lawful purposes and in accordance with these terms. You must not
                    use the app in any way that violates any applicable federal, state, local, or international law.</p>

                <h2>4. Intellectual Property</h2>
                <p>All content, features, and functionality of the app are owned by us or our licensors and are
                    protected by copyright, trademark, and other intellectual property laws.</p>

                <h2>5. Limitation of Liability</h2>
                <p>We are not liable for any damages arising from your use of the app or inability to use the app,
                    including but not limited to direct, indirect, incidental, punitive, and consequential damages.</p>

                <h2>6. Changes to Terms</h2>
                <p>We may revise these terms from time to time. We will notify you of any changes by posting the new
                    terms on this page.</p>

                <h2>7. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us at support@example.com.
                </p>
            </div>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/components/AppLayout.vue';
</script>
