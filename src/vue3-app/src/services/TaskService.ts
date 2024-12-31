// src/services/TaskService.ts
import ResourceService from "./ResourceService";
import { Task, TaskPayload } from "@/types/Task";
import api from "@/http/api";
const API_VERSION = "v2";
class TaskService extends ResourceService<Task, TaskPayload> {
  constructor() {
    super(`${API_VERSION}/tasks`);
  }
  async changeTaskStatus(id: number) {
    return api.patch(`${API_VERSION}/tasks/${id}/complete`);
  }
}

export default new TaskService();
