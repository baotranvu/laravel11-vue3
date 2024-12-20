import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_VERSION = 'v1';
const API_CONFIG: AxiosRequestConfig = {
    baseURL: `${import.meta.env.VITE_API_BASE_URL || "http://laravel.test:8080/api"}/${API_VERSION}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000
};

class ApiService {
    private static instance: AxiosInstance;

    public static getInstance(): AxiosInstance {
        if (!ApiService.instance) {
            ApiService.instance = axios.create(API_CONFIG);
        }
        return ApiService.instance;
    }
}

export const api = ApiService.getInstance();
export default api;