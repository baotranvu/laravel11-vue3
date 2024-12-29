<template>
    <div class="login-container">
        <div class="login-box">
            <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
            <form @submit.prevent="handleSubmit">
                <div v-if="!isLogin" class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        v-model.trim="formData.name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model.trim="formData.email"
                        :class="{ 'invalid': !isEmailValid && formData.email }"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model.trim="formData.password"
                        required
                    />
                </div>
                <div v-if="!isLogin" class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        v-model.trim="formData.password_confirmation"
                        required
                    />
                </div>
                <div class="error" v-if="error">{{ error?.message }}</div>
                <button type="submit" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                    {{ isLogin ? 'Login' : 'Register' }}
                </button>
            </form>
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
import { ref, reactive, computed } from 'vue'
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { useAuth } from '@/composables/useAuth';
import { useAuthStore } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const auth = useAuth()
const globalStore = useGlobalStore()
const { loading, error } = storeToRefs(globalStore)
const { setError, clearError } = globalStore
const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(formData.email)
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
    clearError(globalStore)
    resetFormData()
}

const resetFormData = () => {
    formData.name = ''
    formData.email = ''
    formData.password = ''
    formData.password_confirmation = ''
}

const handleSubmit = async () => {
    clearError(globalStore)
    if (!isEmailValid.value) {
       setError(globalStore, { status: 400, message: 'Invalid email' })
        return
    }
    
    if (!isLogin.value && formData.password !== formData.password_confirmation) {
        setError(globalStore, { status: 400, message: 'Passwords do not match' })
        return
    }

    try {
        if (isLogin.value) {
            await auth.login(formData as LoginCredentials)
        } else {
           await auth.register(formData as RegisterData)
           if(!error.value && isAuthenticated.value) {
                alert('Registration successful')
                toggleForm()
           }
        }
    } catch (e) {
        console.error(e)
        setError(globalStore, { status: 500, message: 'Something went wrong' })
    }
    resetFormData()
}
</script>

<style scoped>
@import '../assets/auth.css';
</style>