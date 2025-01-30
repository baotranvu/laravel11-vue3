import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/constants";
const API_CONFIG: AxiosRequestConfig = {
    baseURL: `${import.meta.env.VITE_API_BASE_URL || API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
    withXSRFToken: true
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