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
                <div class="error" v-if="hasError">{{ error?.message }}</div>
                <button type="submit" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { useAuth } from '@/composables/useAuth';
import { useGlobalStore } from '@/stores/global';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = useRouter()
const authStore = useAuthStore()
import { storeToRefs } from 'pinia';
const auth = useAuth()
const globalStore = useGlobalStore()
const { isLoading, error, hasError } = storeToRefs(globalStore)
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
@import '../assets/auth.css';
</style>