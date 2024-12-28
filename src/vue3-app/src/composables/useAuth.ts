import { ref, computed } from 'vue';
import { AuthService } from '@/services/AuthService';
import { User, LoginCredentials, RegisterData } from '@/types/Auth';
import type { ErrorType } from '@/types/error';
import { ApiResponse } from '@/types/ApiResponse';

export function useAuth() {
    const authService = AuthService.getInstance();
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<ErrorType | null>(null);

    const isAuthenticated = computed(() => !!user.value);

    async function login(credentials: LoginCredentials) {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.login(credentials) as ApiResponse; ;
            user.value = response.data.user;
        } catch (err: any) {
            error.value = err?.response?.data;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function logout() {
        try {
            loading.value = true;
            error.value = null;
            await authService.logout();
            user.value = null;
        } catch (err) {
            console.error('Logout failed', err);    
            throw err;
        } finally {
            loading.value = false;
        }
    }

    async function checkAuth() {
        try {
            loading.value = true;
            error.value = null;
            user.value = await authService.getUser();
        } catch (err) {
            console.error('Check auth failed', err);
            user.value = null;
        } finally {
            loading.value = false;
        }
    }

    async function register(data: RegisterData) {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.register(data) as ApiResponse;
            user.value = response.data.user;
        } catch (err) {
            console.error('Register failed', err);
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        register,
        checkAuth
    };
}
