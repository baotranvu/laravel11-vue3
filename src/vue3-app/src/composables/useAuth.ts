import { ref, computed } from 'vue';
import { AuthService } from '@/services/AuthService';
import { User, LoginCredentials, RegisterData } from '@/types/Auth';

export function useAuth() {
    const authService = AuthService.getInstance();
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!user.value);

    async function login(credentials: LoginCredentials) {
        try {
            loading.value = true;
            error.value = null;
            user.value = await authService.login(credentials);
        } catch (err) {
            error.value = 'Login failed';
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
            error.value = 'Logout failed';
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
            error.value = 'Authentication check failed';
            user.value = null;
        } finally {
            loading.value = false;
        }
    }

    async function register(data: RegisterData) {
        try {
            loading.value = true;
            error.value = null;
            user.value = await authService.register(data);
        } catch (err) {
            error.value = 'Registration failed';
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
