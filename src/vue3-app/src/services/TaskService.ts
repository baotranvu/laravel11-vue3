// src/services/TaskService.ts
import ResourceService from "./ResourceService";
import { Task, TaskPayload } from "../types/Task";

class TaskService extends ResourceService<Task, TaskPayload> {
  constructor() {
    super("tasks");
  }
}

export default new TaskService();
