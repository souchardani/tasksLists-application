import React, { useState, useMemo } from 'react';
import { TaskList, Task } from '../types';
import { ProgressBar } from './ProgressBar';
import { TaskItem } from './TaskItem';
import { ChevronLeftIcon, PlusIcon } from './Icons';

interface TaskListDetailProps {
  taskList: TaskList;
  onBack: () => void;
  onAddTask: (description: string) => void;
  onUpdateTask: (task: Omit<Task, 'completed'>) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskListDetail: React.FC<TaskListDetailProps> = ({ 
  taskList, onBack, onAddTask, onUpdateTask, onToggleTask, onDeleteTask 
}) => {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const progress = useMemo(() => {
    if (!taskList.tasks || taskList.tasks.length === 0) return 0;
    const completedTasks = taskList.tasks.filter(t => t.completed).length;
    return (completedTasks / taskList.tasks.length) * 100;
  }, [taskList.tasks]);

  const handleNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskDescription.trim() === '') return;
    onAddTask(newTaskDescription);
    setNewTaskDescription('');
  };

  const handleSaveTask = (task: Omit<Task, 'completed'>) => {
    onUpdateTask(task);
    setEditingTaskId(null);
  };

  const handleStartEdit = (taskId: string) => {
    setEditingTaskId(taskId);
  };
  
  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold mb-8 transition-colors">
        <ChevronLeftIcon className="w-5 h-5"/>
        Back to Lists
      </button>
      
      <div className="bg-slate-700 border border-slate-600 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{taskList.title}</h1>
        <p className="text-slate-400 mt-2 mb-6">{taskList.description}</p>
        <ProgressBar progress={progress} />
      </div>

      <form onSubmit={handleNewTaskSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-grow">
          <PlusIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="newTaskDescription"
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-3 pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none placeholder-slate-400"
          />
        </div>
        <button type="submit" className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-md transition-all duration-200">
            Add Task
        </button>
      </form>

      <div className="space-y-2">
        {taskList.tasks && taskList.tasks.length > 0 ? (
          taskList.tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              isEditing={task.id === editingTaskId}
              onToggle={onToggleTask}
              onStartEdit={handleStartEdit}
              onSave={handleSaveTask}
              onCancel={handleCancelEdit}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-slate-700 border border-slate-600 border-dashed rounded-lg">
            <p className="text-slate-400">This list is empty. Add a task to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};