// src/services/ResourceService.ts
import api from "../http/api";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
// Generic interface for any resource with an ID
interface Resource {
  id: number;
  [key: string]: any;
}

// Generic service class for any resource
class ResourceService<T extends Resource, CreateDTO = Omit<T, 'id'>> {
  private readonly resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  async get(id: number): Promise<T> {
    const response = await api.get(`${this.resource}/${id}`);
    return response.data;
  }

  async all(): Promise<T[]> {
    const response = await api.get(this.resource);
    return response.data;
  }

  async create(data: CreateDTO): Promise<T> {
    const response = await api.post(this.resource, data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateDTO>): Promise<T> {
    const response = await api.put(`${this.resource}/${id}`, data);
    return response.data;
  }

  async updateAll(data: Partial<CreateDTO>): Promise<T[]> {
    const response = await api.put(this.resource, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.resource}/${id}`);
  }
}

api.interceptors.request.use((config) => {
    const authstore = useAuthStore();
    const { token } = storeToRefs(authstore);
    // Check if a specific header exists
    if (!config.headers['Authorization']) {
        if (token.value) {
            config.headers['Authorization'] = `Bearer ${token.value}`;
        } else {
            console.warn('Authorization header is missing!');
        }
    }
    return config;
});

export default ResourceService;
