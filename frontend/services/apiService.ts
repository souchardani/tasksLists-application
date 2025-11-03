import { IDataService, Task, TaskList } from "../types";

const API_BASE_URL = "/api";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  if (response.status === 204) {
    // No Content
    return null;
  }
  return response.json();
};

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  return handleResponse(response);
};

export const apiService: IDataService = {
  getTaskLists: () => apiRequest<TaskList[]>("/tasks-lists"),

  addTaskList: (listData) =>
    apiRequest<TaskList>("/tasks-lists", {
      method: "POST",
      body: JSON.stringify(listData),
    }),

  updateTaskList: (listData) =>
    apiRequest<TaskList>(`/tasks-lists/${listData.id}`, {
      method: "PUT",
      body: JSON.stringify(listData),
    }),

  deleteTaskList: (id) =>
    apiRequest<void>(`/tasks-lists/${id}`, {
      method: "DELETE",
    }),

  addTask: (taskListId, taskData) =>
    apiRequest<Task>(`/tasks-lists/${taskListId}/tasks`, {
      method: "POST",
      body: JSON.stringify(taskData),
    }),

  updateTask: (taskListId, taskData) =>
    apiRequest<Task>(`/tasks-lists/${taskListId}/tasks/${taskData.id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    }),

  toggleTaskCompleted: (taskListId, taskId) =>
    apiRequest<Task>(`/tasks-lists/${taskListId}/tasks/${taskId}/toggle`, {
      method: "PATCH",
    }),

  deleteTask: (taskListId, taskId) =>
    apiRequest<void>(`/tasks-lists/${taskListId}/tasks/${taskId}`, {
      method: "DELETE",
    }),
};
