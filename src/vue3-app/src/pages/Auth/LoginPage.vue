<template>
    <AppLayout>
        <template v-slot:default>
            <v-container class="d-flex flex-column align-items-center" width="500">
                <v-col cols="10">
                    <div class="d-flex flex-column align-items-center">
                        <h1 v-if="isLogin">Sign In</h1>
                        <h1 v-else>Sign Up</h1>
                    </div>
                    <v-form @submit.prevent="handleSubmit">
                        <v-text-field v-model="formData.email" label="Email" required></v-text-field>
                        <v-text-field v-if="!isLogin" v-model="formData.name" label="Name" required></v-text-field>
                        <v-text-field v-model="formData.password" label="Password" type="password"
                            required></v-text-field>
                        <v-text-field v-if="!isLogin" v-model="formData.password_confirmation" label="Confirm Password"
                            type="password" required></v-text-field>
                        <v-btn :loading="isLoading" color="primary" type="submit" block>Sign In</v-btn>
                    </v-form>
                    <v-alert v-if="error" type="error" class="mt-4">
                        {{ error.message }}
                    </v-alert>
                </v-col>
            </v-container>
            <v-container class="d-flex flex-column align-items-center">
                <v-row>
                    <v-col>
                        <v-card class="mt-4">
                            <v-card-text>
                                <p v-if="isLogin">Don't have an account? <a href="#" @click="toggleForm">Sign Up</a>
                                </p>
                                <p v-else>Already have an account? <a href="#" @click="toggleForm">Sign In</a></p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-snackbar v-model="isRegistered" :timeout="2000" color="success" location="top">
                    {{ message }}
                </v-snackbar>
            </v-container>

        </template>
    </AppLayout>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { useAuth } from '@/composables/useAuth';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { validateEmail } from '@/utils/InputHelper';
import AppLayout from '@/components/AppLayout.vue';
const router = useRouter()
const authStore = useAuthStore()
import { storeToRefs } from 'pinia';
const auth = useAuth()
const globalStore = useGlobalStore()
const { isLoading, error, hasError } = storeToRefs(globalStore)
const isRegistered = ref(false)
const isEmailValid = computed(() => {
    return validateEmail(formData.email)
})
const isLogin = ref(true)
const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const message = ref('')

const toggleForm = () => {
    isLogin.value = !isLogin.value
    globalStore.setError(null)
    resetFormData()
}

const resetFormData = () => {
    formData.name = ''
    formData.email = ''
    formData.password = ''
    formData.password_confirmation = ''
    if (message.value) {
        setTimeout(() => {
            message.value = ''
            isRegistered.value = false
        }, 5000)
    }
}

const handleSubmit = async () => {
    globalStore.setError(null)
    if (!isEmailValid.value) {
        globalStore.setError({ status: 400, message: 'Invalid email' })
        return
    }

    if (!isLogin.value && formData.password !== formData.password_confirmation) {
        globalStore.setError({ status: 400, message: 'Passwords do not match' })
        return
    }

    try {
        if (isLogin.value) {
            await auth.login(formData as LoginCredentials)
            if (!hasError.value) {
                router.push({ name: 'home' })
            }
        } else {
            await auth.register(formData as RegisterData)
            if (!hasError.value) {
                message.value = 'Registration successful'
                isRegistered.value = true
                toggleForm()
            }
        }
    } catch (e: any) {
        const error = e?.response?.data
        globalStore.setError({ status: error?.status || 500, message: error?.message || 'Something went wrong' })
    }
    resetFormData()
}

onMounted(async () => {
    globalStore.setError(null)
    authStore.reset()
})
</script>

<style scoped>
@import '@/assets/auth.css';
</style>