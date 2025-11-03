import React, { useMemo } from 'react';
import { TaskList } from '../types';
import { ProgressBar } from './ProgressBar';
import { PencilIcon, TrashIcon } from './Icons';

interface TaskListCardProps {
  taskList: TaskList;
  onSelect: (id: string) => void;
  onEdit: (list: TaskList) => void;
  onDelete: (list: TaskList) => void;
}

export const TaskListCard: React.FC<TaskListCardProps> = ({ taskList, onSelect, onEdit, onDelete }) => {
  const progress = useMemo(() => {
    if (!taskList.tasks || taskList.tasks.length === 0) return 0;
    const completedTasks = taskList.tasks.filter(t => t.completed).length;
    return (completedTasks / taskList.tasks.length) * 100;
  }, [taskList.tasks]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(taskList);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(taskList);
  };

  return (
    <div 
      className="bg-slate-700 border border-slate-600 p-5 rounded-lg cursor-pointer hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300 group"
      onClick={() => onSelect(taskList.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{taskList.title}</h3>
          <p className="text-slate-400 mt-1 text-sm line-clamp-2 h-10">{taskList.description}</p>
        </div>
        <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleEdit} className="text-slate-400 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-slate-600">
            <PencilIcon className="w-4 h-4"/>
          </button>
          <button onClick={handleDelete} className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-600">
            <TrashIcon className="w-4 h-4"/>
          </button>
        </div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};