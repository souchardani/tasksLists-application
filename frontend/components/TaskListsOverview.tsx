import React from 'react';
import { TaskList } from '../types';
import { TaskListCard } from './TaskListCard';
import { PlusIcon } from './Icons';

interface TaskListsOverviewProps {
  taskLists: TaskList[];
  onSelectList: (id: string) => void;
  onAddList: () => void;
  onEditList: (list: TaskList) => void;
  onDeleteList: (list: TaskList) => void;
}

export const TaskListsOverview: React.FC<TaskListsOverviewProps> = ({ taskLists, onSelectList, onAddList, onEditList, onDeleteList }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Task Lists
        </h1>
        <button
          onClick={onAddList}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          New List
        </button>
      </div>

      {taskLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskLists.map(list => (
            <TaskListCard
              key={list.id}
              taskList={list}
              onSelect={onSelectList}
              onEdit={onEditList}
              onDelete={onDeleteList}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-slate-700 border border-slate-600 border-dashed rounded-lg">
          <h2 className="text-xl font-medium text-slate-300">Your space is clear</h2>
          <p className="text-slate-400 mt-2">Create your first task list to get organized.</p>
        </div>
      )}
    </div>
  );
};