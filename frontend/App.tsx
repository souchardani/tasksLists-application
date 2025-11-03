import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TaskList, ServiceMode, Task } from './types';
import { storageService } from './services/storageService';
import { apiService } from './services/apiService';
import { TaskListsOverview } from './components/TaskListsOverview';
import { TaskListDetail } from './components/TaskListDetail';
import { Modal } from './components/Modal';

export default function App() {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [serviceMode, setServiceMode] = useState<ServiceMode>('local');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<TaskList | null>(null);
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<TaskList | null>(null);

  const dataService = useMemo(() => {
    return serviceMode === 'local' ? storageService : apiService;
  }, [serviceMode]);

  const loadTaskLists = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const lists = await dataService.getTaskLists();
      setTaskLists(lists);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setTaskLists([]);
    } finally {
      setIsLoading(false);
    }
  }, [dataService]);

  useEffect(() => {
    loadTaskLists();
  }, [loadTaskLists]);

  // Handlers for Task List Modal
  const handleOpenListModal = (list: TaskList | null = null) => {
    setEditingList(list);
    setListTitle(list ? list.title : '');
    setListDescription(list ? list.description : '');
    setIsListModalOpen(true);
  };

  const handleCloseListModal = () => {
    setIsListModalOpen(false);
    setEditingList(null);
    setListTitle('');
    setListDescription('');
  };

  const handleListFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listTitle.trim()) return;

    try {
      if (editingList) {
        await dataService.updateTaskList({ id: editingList.id, title: listTitle, description: listDescription });
      } else {
        await dataService.addTaskList({ title: listTitle, description: listDescription });
      }
      await loadTaskLists();
    } catch(err) {
       setError(err instanceof Error ? err.message : 'Failed to save task list.');
    } finally {
       handleCloseListModal();
    }
  };

  const handleOpenDeleteModal = (list: TaskList) => {
    setListToDelete(list);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setListToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (listToDelete) {
      handleDeleteList(listToDelete.id);
      handleCloseDeleteModal();
    }
  };

  // CRUD Handlers
  const handleDeleteList = async (id: string) => {
    const originalTaskLists = taskLists;
    setTaskLists(prevTaskLists => prevTaskLists.filter(list => list.id !== id));
    try {
      await dataService.deleteTaskList(id);
      await loadTaskLists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task list.');
      setTaskLists(originalTaskLists);
    }
  };

 const handleAddTask = async (description: string) => {
    if (!selectedListId) return;
    try {
      const newTask = await dataService.addTask(selectedListId, { description });
      setTaskLists(prevTaskLists =>
        prevTaskLists.map(list =>
          list.id === selectedListId
            ? { ...list, tasks: [...(list.tasks || []), newTask] }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task.');
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'completed'>) => {
    if (!selectedListId) return;
    try {
      const updatedTask = await dataService.updateTask(selectedListId, taskData);
      setTaskLists(prevTaskLists =>
        prevTaskLists.map(list =>
          list.id === selectedListId
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                ),
              }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task.');
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!selectedListId) return;
    const originalTaskLists = taskLists;
    setTaskLists(prevTaskLists =>
      prevTaskLists.map(list =>
        list.id === selectedListId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : list
      )
    );
    try {
      await dataService.toggleTaskCompleted(selectedListId, taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task status.');
      setTaskLists(originalTaskLists);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!selectedListId) return;
    const originalTaskLists = taskLists;
    setTaskLists(prevTaskLists =>
      prevTaskLists.map(list =>
        list.id === selectedListId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
    try {
      await dataService.deleteTask(selectedListId, taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task.');
      setTaskLists(originalTaskLists);
    }
  };


  const selectedList = useMemo(() => {
    return taskLists.find(list => list.id === selectedListId) || null;
  }, [taskLists, selectedListId]);

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-slate-700/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-600">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-white">TaskFlow</h1>
              <div>
                  <label htmlFor="serviceMode" className="text-sm mr-2 text-slate-400">Data Source:</label>
                  <select 
                      id="serviceMode"
                      value={serviceMode}
                      onChange={(e) => setServiceMode(e.target.value as ServiceMode)}
                      className="bg-slate-600 border border-slate-500 rounded-md py-1 px-2 text-white focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                      <option value="local">Local Storage</option>
                      <option value="api">Spring Boot API</option>
                  </select>
              </div>
          </div>
      </header>

      <main className="container mx-auto max-w-6xl">
        {error && (
            <div className="m-4 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-sm">
                <strong>Error:</strong> {error}
            </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : selectedList ? (
          <TaskListDetail 
            taskList={selectedList} 
            onBack={() => setSelectedListId(null)}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <TaskListsOverview 
            taskLists={taskLists} 
            onSelectList={setSelectedListId}
            onAddList={() => handleOpenListModal()}
            onEditList={handleOpenListModal}
            onDeleteList={handleOpenDeleteModal}
          />
        )}
      </main>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title="Confirm Deletion">
        {listToDelete && (
          <div className="space-y-4">
            <p className="text-slate-300">
              Are you sure you want to delete the list "<strong>{listToDelete.title}</strong>" and all its tasks? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={handleCloseDeleteModal} className="px-4 py-2 bg-slate-500 hover:bg-slate-400 rounded-md transition-colors font-semibold text-white text-sm">Cancel</button>
              <button type="button" onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors text-sm">Delete</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isListModalOpen} onClose={handleCloseListModal} title={editingList ? 'Edit Task List' : 'Create New List'}>
        <form onSubmit={handleListFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="listTitle" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input
              id="listTitle"
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="w-full bg-slate-600 border border-slate-500 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none placeholder-slate-400"
              required
            />
          </div>
          <div>
            <label htmlFor="listDescription" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              id="listDescription"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-600 border border-slate-500 text-white rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none placeholder-slate-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleCloseListModal} className="px-4 py-2 bg-slate-500 hover:bg-slate-400 rounded-md transition-colors font-semibold text-white text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors text-sm">{editingList ? 'Save Changes' : 'Create List'}</button>
          </div>
        </form>
      </Modal>

      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>A focused and clean task management experience.</p>
      </footer>
    </div>
  );
}
