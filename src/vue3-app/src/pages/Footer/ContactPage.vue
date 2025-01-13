<template>
    <AppLayout>
        <template v-slot:default>
            <div class="d-flex flex-column align-items-center justify-content-center p-4">
                <h1>Contact Us</h1>
                <v-form @submit.prevent="submitForm" v-model="isValid" :disabled="isSubmitting">
                    <v-text-field 
                        label="Name" 
                        v-model="form.name" 
                        :rules="[v => !!v || 'Name is required']"
                        required
                    ></v-text-field>
                    <v-text-field 
                        label="Email" 
                        v-model="form.email" 
                        :rules="[
                            v => !!v || 'Email is required',
                            v => /.+@.+\..+/.test(v) || 'Email must be valid'
                        ]"
                        required 
                        type="email"
                    ></v-text-field>
                    <v-textarea 
                        label="Message" 
                        v-model="form.message"
                        :rules="[v => !!v || 'Message is required']"
                        required
                    ></v-textarea>
                    <v-btn 
                        type="submit" 
                        color="primary" 
                        :loading="isSubmitting"
                        :disabled="!isValid"
                    >
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </v-btn>
                </v-form>
                <v-alert v-if="successMessage" type="success">
                    {{ successMessage }}
                </v-alert>
            </div>
        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import { VForm, VTextField, VTextarea, VBtn, VAlert } from 'vuetify/components';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const successMessage = ref('');

const isSubmitting = ref(false);
const isValid = ref(false);

const submitForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', form.value);

    // Set isSubmitting to true to disable the button
    isSubmitting.value = true;

    // Simulate a successful submission
    successMessage.value = 'Thank you for your message! We will get back to you soon.';

    // Reset the form
    form.value.name = '';
    form.value.email = '';
    form.value.message = '';

    // Set isSubmitting back to false
    isSubmitting.value = false;
};
</script>
