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
                <div class="error" v-if="error">{{ error }}</div>
                <button type="submit" :disabled="loading">
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
import { useAuth } from '@/composables/useAuth'
import { LoginCredentials, RegisterData } from '@/types/Auth';

const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(formData.email)
})

const { login, register, loading, isAuthenticated } = useAuth()

const isLogin = ref(true)
const error = ref('')

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const toggleForm = () => {
    isLogin.value = !isLogin.value
    error.value = ''
    formData.name = ''
    formData.email = ''
    formData.password = ''
    formData.password_confirmation = ''
}

const resetFormData = () => {
    formData.name = ''
    formData.email = ''
    formData.password = ''
    formData.password_confirmation = ''
}

const handleSubmit = async () => {
    error.value = ''
    
    if (!isLogin.value && formData.password !== formData.password_confirmation) {
        error.value = 'Passwords do not match'
        return
    }

    try {
        if (isLogin.value) {
            await login(formData as LoginCredentials)
        } else {
            await register(formData as RegisterData)
        }
        if(isAuthenticated) {
            alert(isLogin.value ? 'Logged in successfully' : 'Registered successfully')
        }
        
    } catch (e) {
        error.value = (e as Error).message
    }
    resetFormData()
}
</script>

<style scoped>
@import '../assets/auth.css';
</style>