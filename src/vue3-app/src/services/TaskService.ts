// src/services/TaskService.ts
import ResourceService from "./ResourceService";
import { Task, TaskPayload } from "@/types/Task";
import api from "@/http/api";
const API_VERSION = "v2";
export class TaskService extends ResourceService<Task, TaskPayload> {
  constructor() {
    super(`api/${API_VERSION}/tasks`);
  }
  async changeTaskStatus(id: number) {
    return api.patch(`api/${API_VERSION}/tasks/${id}/complete`);
  }
}
