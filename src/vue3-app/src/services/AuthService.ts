import { User, LoginCredentials, RegisterData } from '@/types/Auth';
import { api } from '@/http/api';
import { useAuthStore } from '@/stores/auth';
export class AuthService {
    private static instance: AuthService;
    private readonly apiUrl = '/auth';
    private isInterceptorInitialized = false;
    private constructor() {}
    private getInterceptorsInstance() {
        if (!this.isInterceptorInitialized) {
            const authStore = useAuthStore();
            api.interceptors.request.use((config) => {
                if (authStore.token) {
                    config.headers.Authorization = `Bearer ${authStore.token}`;
                }
                return config;
            });
            this.isInterceptorInitialized = true;
        }
    }
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
            AuthService.instance.getInterceptorsInstance();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<User> {
        const response = await api.post(`${this.apiUrl}/login`, credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        const authStore = useAuthStore();
        const HTTP_NO_CONTENT = 204;
        const response = await api.post(`${this.apiUrl}/logout`);
        if (response.status === HTTP_NO_CONTENT) {
            authStore.reset();
        } 
    }

    async register(data: RegisterData): Promise<User> {
        const response = await api.post(`${this.apiUrl}/register`, data);
        return response.data;
    }

    async getUser(): Promise<User | null> {
        const response = await api.get(`/user`);
        return response.data;
    }
}
