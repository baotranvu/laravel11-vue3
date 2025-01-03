import { User, LoginCredentials, RegisterData } from '@/types/Auth';
import { api } from '@/http/api';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useAuthHelper } from '@/utils/AuthHelper';
export class AuthService {
    private static instance: AuthService;
    private readonly apiUrl = 'api/auth';
    private constructor() {}

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<User> {
        const response = await api.post(`${this.apiUrl}/login`, credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        const authStore = useAuthStore();
        const { token, isAuthenticated } = storeToRefs(authStore);

        if (!token.value || !isAuthenticated.value) {
            return;
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        await api.post(`${this.apiUrl}/logout`);
        authStore.reset();
    }

    async register(data: RegisterData): Promise<User> {
        const response = await api.post(`${this.apiUrl}/register`, data);
        return response.data;
    }

    async getUser(): Promise<User | null> {
        const authStore = useAuthStore();
        const { token } = storeToRefs(authStore);
        if (!token.value) {
            const { getCookie } = useAuthHelper();
            const tokenFromCookie = getCookie('api_token') ?? null;
            if (!tokenFromCookie) {
                console.log('No token found');
                return null;
            }
            token.value = tokenFromCookie;
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        const response = await api.get(`/user`);
        return response.data;
    }
}
