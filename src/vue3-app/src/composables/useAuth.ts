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
    const { setError, clearError, setLoading } = globalStore;
    const { user } = storeToRefs(authStore);
    const { loading, error } = storeToRefs(globalStore);
    const { setUser, reset, setToken } = authStore;
    async function login(credentials: LoginCredentials) {
        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await authService.login(credentials) as unknown as  ApiResponse;
            if(response.success){
                setUser(authStore, response.data?.user);
                setToken(authStore, response.data?.token);
            }else{
                setError(globalStore, {
                    message: response.message,
                    status: response.status
                });
            }
        } catch (err: any) {
            setError(globalStore, err);
            throw err;
        } finally {
            setLoading(globalStore, false);
        }
    }

    async function logout() {
        try {
            await authService.logout();
        } catch (err: any) {
            setError(globalStore, err);
            throw err;
        } finally {
            reset(authStore);
            clearError(globalStore);
            setLoading(globalStore, false);
        }
    }

    async function checkAuth() {
        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await authService.getUser() as unknown as ApiResponse;
            setUser(authStore, response.data?.user);
        } catch (err: any) {
            setError(globalStore, err);
            setUser(authStore, null);
        } finally {
            setLoading(globalStore, false);
        }
    }

    async function register(data: RegisterData) {
        try {
            setLoading(globalStore, true);
            clearError(globalStore);
            const response = await authService.register(data) as unknown as ApiResponse;
            user.value = response.data?.user;
        } catch (err: any) {
            setError(globalStore, err);
            throw err;
        } finally {
            setLoading(globalStore, false);
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
