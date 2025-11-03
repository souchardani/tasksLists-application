import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { PencilIcon, TrashIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onSave: (task: Omit<Task, 'completed'>) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, isEditing, onToggle, onStartEdit, onSave, onCancel, onDelete }) => {
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setDescription(task.description);
  }, [task.description]);
  
  const handleSave = () => {
    if (description.trim()) {
      onSave({ id: task.id, description });
    }
  };
  
  const handleCancel = () => {
    onCancel();
    setDescription(task.description);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 bg-slate-700 p-3 rounded-lg ring-2 ring-indigo-500">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent text-white p-1 focus:outline-none"
          autoFocus
        />
        <button onClick={handleSave} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors text-sm">Save</button>
        <button onClick={handleCancel} className="px-3 py-1 bg-slate-500 hover:bg-slate-400 text-white rounded-md transition-colors text-sm">Cancel</button>
      </div>
    );
  }

  const taskInputId = `task-checkbox-${task.id}`;

  return (
    <div className="flex items-center justify-between bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition-colors duration-200 group">
      <label htmlFor={taskInputId} className="flex items-center gap-4 flex-1 cursor-pointer min-w-0">
        <input
          id={taskInputId}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-700 focus:ring-2 cursor-pointer flex-shrink-0"
        />
        <p className={`flex-1 truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
          {task.description}
        </p>
      </label>
      <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); onStartEdit(task.id); }} className="text-slate-400 hover:text-yellow-400 transition-colors p-1">
          <PencilIcon />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="text-slate-400 hover:text-red-400 transition-colors p-1">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};