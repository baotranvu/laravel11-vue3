// src/services/TaskService.ts
import ResourceService from "./ResourceService";
import { Task, TaskPayload } from "@/types/Task";
import api from "@/http/api";
import { API_VERSION } from "@/constants";
export class TaskService extends ResourceService<Task, TaskPayload> {
  constructor() {
    super(`/${API_VERSION}/tasks`);
  }
  async changeTaskStatus(id: number) {
    return api.patch(`/${API_VERSION}/tasks/${id}/complete`);
  }
}
