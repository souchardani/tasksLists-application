import { IDataService, Task, TaskList } from "../types";

const STORAGE_KEY = "react-task-app-data";

const getStoredData = (): TaskList[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
};

const setStoredData = (data: TaskList[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const findList = (lists: TaskList[], id: string): [TaskList, number] => {
  const index = lists.findIndex((l) => l.id === id);
  if (index === -1) throw new Error(`Task list with id ${id} not found`);
  return [lists[index], index];
};

const findTask = (list: TaskList, id: string): [Task, number] => {
  const index = list.tasks.findIndex((t) => t.id === id);
  if (index === -1)
    throw new Error(`Task with id ${id} not found in list ${list.id}`);
  return [list.tasks[index], index];
};

export const storageService: IDataService = {
  getTaskLists: async () => {
    return Promise.resolve(getStoredData());
  },

  addTaskList: async (listData) => {
    const lists = getStoredData();
    const newList: TaskList = {
      ...listData,
      id: Date.now().toString(),
      tasks: [],
    };
    const updatedLists = [...lists, newList];
    setStoredData(updatedLists);
    return Promise.resolve(newList);
  },

  updateTaskList: async (listData) => {
    const lists = getStoredData();
    const [listToUpdate, index] = findList(lists, listData.id);
    const updatedList = { ...listToUpdate, ...listData };
    lists[index] = updatedList;
    setStoredData(lists);
    return Promise.resolve(updatedList);
  },

  deleteTaskList: async (id) => {
    const lists = getStoredData();
    const updatedLists = lists.filter((list) => list.id !== id);
    setStoredData(updatedLists);
    return Promise.resolve();
  },

  addTask: async (taskListId, taskData) => {
    const lists = getStoredData();
    const [listToUpdate, listIndex] = findList(lists, taskListId);
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
    };
    listToUpdate.tasks.push(newTask);
    lists[listIndex] = listToUpdate;
    setStoredData(lists);
    return Promise.resolve(newTask);
  },

  updateTask: async (taskListId, taskData) => {
    const lists = getStoredData();
    const [listToUpdate, listIndex] = findList(lists, taskListId);
    const [taskToUpdate, taskIndex] = findTask(listToUpdate, taskData.id);
    const updatedTask = { ...taskToUpdate, ...taskData };
    listToUpdate.tasks[taskIndex] = updatedTask;
    lists[listIndex] = listToUpdate;
    setStoredData(lists);
    return Promise.resolve(updatedTask);
  },

  toggleTaskCompleted: async (taskListId, taskId) => {
    const lists = getStoredData();
    const [listToUpdate, listIndex] = findList(lists, taskListId);
    const [taskToUpdate, taskIndex] = findTask(listToUpdate, taskId);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    listToUpdate.tasks[taskIndex] = updatedTask;
    lists[listIndex] = listToUpdate;
    setStoredData(lists);
    return Promise.resolve(updatedTask);
  },

  deleteTask: async (taskListId, taskId) => {
    const lists = getStoredData();
    const [listToUpdate, listIndex] = findList(lists, taskListId);
    listToUpdate.tasks = listToUpdate.tasks.filter(
      (task) => task.id !== taskId
    );
    lists[listIndex] = listToUpdate;
    setStoredData(lists);
    return Promise.resolve();
  },
};
