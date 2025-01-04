import { User, LoginCredentials, RegisterData } from '@/types/Auth';
import { api } from '@/http/api';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
export class AuthService {
    private static instance: AuthService;
    private readonly apiUrl = 'api/auth';
    private readonly baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://api.todo-list.com:8080';
    private constructor() {}
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<User> {
        await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);
        const response = await api.post(`${this.apiUrl}/login`, credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        const authStore = useAuthStore();
        await api.post(`${this.apiUrl}/logout`);
        authStore.reset();
    }

    async register(data: RegisterData): Promise<User> {
        const response = await api.post(`${this.apiUrl}/register`, data);
        return response.data;
    }

    async getUser(): Promise<User | null> {
        const response = await api.get(`api/user`);
        return response.data;
    }
}
