// src/services/TaskService.ts
import ResourceService from "./ResourceService";
import { Task, TaskPayload } from "@/types/Task";
import api from "@/http/api";
class TaskService extends ResourceService<Task, TaskPayload> {
  constructor() {
    super("v1/tasks");
  }
  async changeTaskStatus(id: number) {
    return api.patch(`v1/tasks/${id}/complete`);
  }
}

export default new TaskService();
