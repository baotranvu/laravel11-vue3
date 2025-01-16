import { storeToRefs } from 'pinia';
import { AuthService } from '@/services/AuthService';
import { LoginCredentials, RegisterData } from '@/types/Auth';
import { ApiResponse } from '@/types/ApiResponse';
import { useAuthStore } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import type { ErrorType } from '@/types/ErrorType';
import { redirectToErrorPage } from '@/utils/AppHelper';
import { useRouter } from 'vue-router';
export function useAuth() {
    const authService = AuthService.getInstance();
    const authStore = useAuthStore();
    const globalStore = useGlobalStore();
    const { user } = storeToRefs(authStore);
    const router = useRouter();

    async function login(credentials: LoginCredentials) {
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
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
            const error: ErrorType = {
                message: err.message ?? 'An unknown error occurred',
                status: err.status
            };
            globalStore.setError(error);
            throw err;
        } finally {
            globalStore.setLoading(false);
        }
    }

    async function logout() {
        try {
            await authService.logout();
        } catch (err: any) {
            throw err;
        } finally {
            authStore.reset();
            //clear error
            globalStore.setError(null);
            globalStore.setLoading(false);
        }
    }

    async function checkAuth() {
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await authService.getUser() as unknown as ApiResponse;
            if(response.success && response.data.user){
                authStore.setUser(response.data?.user);
            }else{
                authStore.reset();
                redirectToErrorPage(router, {
                    message: response.message,
                    status: response.status
                });
            }
        } catch (err: any) {
            const error: ErrorType = {
                message: err.message ?? 'An unknown error occurred',
                status: err.status
            };
            globalStore.setError(error);
            redirectToErrorPage(router, error);
            throw err;
        } finally {
            globalStore.setLoading(false);
        }
    }

    async function register(data: RegisterData) {
        try {
            globalStore.setLoading(true);
            globalStore.setError(null);
            const response = await authService.register(data) as unknown as ApiResponse;
            authStore.setUser(response.data?.user);
        } catch (err: any) {
            const error: ErrorType = {
                message: err.message ?? 'An unknown error occurred',
                status: err.status
            };
            globalStore.setError(error);
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
