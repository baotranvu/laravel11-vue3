<template>
    <div class="login-container">
        <div class="login-box">
            <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
            <v-form @submit.prevent="handleSubmit">
                <v-text-field
                    v-if="!isLogin"
                    v-model="formData.name"
                    label="Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="formData.email"
                    label="Email"
                    :error-messages="!isEmailValid && formData.email ? 'Invalid email' : ''"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="formData.password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
                <v-text-field
                    v-if="!isLogin"
                    v-model="formData.password_confirmation"
                    label="Confirm Password"
                    type="password"
                    required
                ></v-text-field>
                <div class="error" v-if="hasError">{{ error?.message }}</div>
                <v-btn type="submit" color="primary" :disabled="isLoading" class="d-flex align-items-center">
                    <v-progress-circular v-if="isLoading" indeterminate size="20" width="2"></v-progress-circular>
                    {{ isLogin ? 'Login' : 'Register' }}
                </v-btn>
            </v-form>
            <p class="toggle-form">
                {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                <a href="#" @click.prevent="toggleForm">
                    {{ isLogin ? 'Register' : 'Login' }}
                </a>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { useAuth } from '@/composables/useAuth';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { validateEmail } from '@/utils/InputHelper';
const router = useRouter()
const authStore = useAuthStore()
import { storeToRefs } from 'pinia';
const auth = useAuth()
const globalStore = useGlobalStore()
const { isLoading, error, hasError } = storeToRefs(globalStore)
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
            if(!hasError.value) {
                router.push({ name: 'home' })
            }
        } else {
           await auth.register(formData as RegisterData)
           if(!hasError.value) {
                alert('Registration successful')
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