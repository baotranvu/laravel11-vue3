// src/services/ResourceService.ts
import api from "@/http/api";
import { useAuthStore } from "@/stores/auth";
// Generic interface for any resource with an ID
interface Resource {
  id: number;
  [key: string]: any;
}

// Generic service class for any resource
class ResourceService<T extends Resource, CreateDTO = Omit<T, 'id'>> {
  private readonly resource: string;
  private isInterceptorInitialized = false;
  constructor(resource: string) {
    this.resource = resource;
    this.getInterceptorsInstance();
  }

  private static instanceMap: { [key: string]: ResourceService<any, any> } = {};

  static getInstance<T extends Resource, CreateDTO = Omit<T, 'id'>>(
    resource: string
  ): ResourceService<T, CreateDTO> {
    if (!ResourceService.instanceMap[resource]) {
      ResourceService.instanceMap[resource] = new ResourceService<T, CreateDTO>(resource);
    }
    if (!ResourceService.instanceMap[resource].isInterceptorInitialized) {
      ResourceService.instanceMap[resource].getInterceptorsInstance();
    }
    return ResourceService.instanceMap[resource] as ResourceService<T, CreateDTO>;
  }

  private getInterceptorsInstance() {
    if (!this.isInterceptorInitialized) {
      api.interceptors.request.use((config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        return config;
      });
      this.isInterceptorInitialized = true;
    }
  }

  async get(id: number): Promise<T> {
    const response = await api.get(`${this.resource}/${id}`);
    return response.data;
  }

  async all(page?: number, itemsPerPage?: number): Promise<T[]> {
    if (page !== undefined && page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    if (itemsPerPage !== undefined && itemsPerPage < 1) {
      throw new Error('Items per page must be greater than 0');
    }
    const response = await api.get(this.resource, { params: { page: page ?? 1, per_page: itemsPerPage ?? 10 } });
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

  async bulkUpdate(data: Partial<CreateDTO>): Promise<T[]> {
    const response = await api.put(this.resource, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.resource}/${id}`);
  }
}

export default ResourceService;
