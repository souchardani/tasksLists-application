import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const normalizedProgress = Number.isFinite(progress) ? progress : 0;
  const clampedProgress = Math.max(0, Math.min(100, normalizedProgress));

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-slate-400">Progress</span>
        <span className="text-xs font-medium text-slate-400">{Math.round(clampedProgress)}%</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-1.5">
        <div 
          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};