
export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface TaskList {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export type ServiceMode = 'local' | 'api';

export interface IDataService {
  getTaskLists: () => Promise<TaskList[]>;
  addTaskList: (list: Omit<TaskList, 'id' | 'tasks'>) => Promise<TaskList>;
  updateTaskList: (list: Omit<TaskList, 'tasks'>) => Promise<TaskList>;
  deleteTaskList: (id: string) => Promise<void>;
  addTask: (taskListId: string, task: Omit<Task, 'id' | 'completed'>) => Promise<Task>;
  updateTask: (taskListId: string, task: Omit<Task, 'completed'>) => Promise<Task>;
  toggleTaskCompleted: (taskListId: string, taskId: string) => Promise<Task>;
  deleteTask: (taskListId: string, taskId: string) => Promise<void>;
}
