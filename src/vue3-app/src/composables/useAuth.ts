import { storeToRefs } from 'pinia';
import { AuthService } from '@/services/AuthService';
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { ApiResponse } from '@/types/ApiResponse';
import { useAuthStore } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';

export function useAuth() {
    const authService = AuthService.getInstance();
    const authStore = useAuthStore();
    const globalStore = useGlobalStore();
    const { user } = storeToRefs(authStore);

    async function login(credentials: LoginCredentials) {
        try {
            globalStore.setLoading(true);
            globalStore.clearError();
            const response = await authService.login(credentials) as unknown as ApiResponse;
            if(response.success){
                authStore.setUser(response.data?.user);
                authStore.setToken(response.data?.token);
            }else{
                globalStore.setError({
                    message: response.message,
                    status: response.status
                });
            }
        } catch (err: any) {
            globalStore.setError(err);
            throw err;
        } finally {
            globalStore.setLoading(false);
        }
    }

    async function logout() {
        try {
            await authService.logout();
        } catch (err: any) {
            globalStore.setError(err);
            throw err;
        } finally {
            authStore.reset();
            globalStore.clearError();
            globalStore.setLoading(false);
        }
    }

    async function checkAuth() {
        try {
            globalStore.setLoading(true);
            globalStore.clearError();
            const response = await authService.getUser() as unknown as ApiResponse;
            authStore.setUser(response.data?.user);
        } catch (err: any) {
            globalStore.setError(err);
            authStore.setUser(null);
        } finally {
            globalStore.setLoading(false);
        }
    }

    async function register(data: RegisterData) {
        try {
            globalStore.setLoading(true);
            globalStore.clearError();
            const response = await authService.register(data) as unknown as ApiResponse;
            authStore.setUser(response.data?.user);
        } catch (err: any) {
            globalStore.setError(err);
            throw err;
        } finally {
            globalStore.setLoading(false);
        }
    }

    return {
        user,
        login,
        logout,
        register,
        checkAuth
    };
}
