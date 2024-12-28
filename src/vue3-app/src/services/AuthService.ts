import { User, LoginCredentials, RegisterData } from '@/types/Auth';
import { api } from '@/http/api';
import axios from 'axios';
export class AuthService {
    private static instance: AuthService;
    private readonly apiUrl = '/auth';
    private readonly baseUrl = 'http://laravel.test:8080';
    private constructor() {}

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<User> {
        // Step 1: Get the CSRF cookie
        await axios.get(`${this.baseUrl}/sanctum/csrf-cookie`);
        const response = await api.post(`${this.apiUrl}/login`, credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        await api.post(`${this.apiUrl}/logout`);
    }

    async register(data: RegisterData): Promise<User> {
        const response = await api.post(`${this.apiUrl}/register`, data);
        return response.data;
    }

    async getUser(): Promise<User> {
        const response = await api.get(`${this.apiUrl}/user`);
        return response.data;
    }
}
