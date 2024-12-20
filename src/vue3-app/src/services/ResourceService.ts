// src/services/ResourceService.ts
import api from "../http/api";

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
    return response.data.data;
  }

  async all(): Promise<T[]> {
    const response = await api.get(this.resource);
    return response.data.data;
  }

  async create(data: CreateDTO): Promise<T> {
    const response = await api.post(this.resource, data);
    return response.data.data;
  }

  async update(id: number, data: Partial<CreateDTO>): Promise<T> {
    const response = await api.put(`${this.resource}/${id}`, data);
    return response.data.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.resource}/${id}`);
  }
}

export default ResourceService;
