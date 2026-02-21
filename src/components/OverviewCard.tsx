'use client';

import { Project } from '@/lib/types';

interface OverviewCardProps {
  project: Project;
}

export default function OverviewCard({ project }: OverviewCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-brandos-success';
      case 'completed':
        return 'text-brandos-warning';
      case 'on_hold':
        return 'text-brandos-danger';
      default:
        return 'text-brandos-info';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 33) return 'bg-brandos-danger';
    if (progress < 66) return 'bg-brandos-warning';
    return 'bg-brandos-success';
  };

  return (
    <div className="card animate-slideIn">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{project.emoji}</span>
            <h3 className="font-bold text-lg text-brandos-text">{project.name}</h3>
          </div>
          <p className={`text-sm font-semibold ${getStatusColor(project.status)}`}>
            {project.status === 'active' && '🟢 Active'}
            {project.status === 'completed' && '✅ Completed'}
            {project.status === 'on_hold' && '⏸️ On Hold'}
          </p>
        </div>
      </div>

      {project.description && (
        <p className="text-sm text-brandos-text-secondary mb-3 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brandos-text-secondary">Progress</span>
          <span className="text-sm font-bold text-brandos-primary">{project.progress}%</span>
        </div>
        
        <div className="progress-bar">
          <div
            className={`progress-bar-fill ${getProgressColor(project.progress)}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {project.deadline && (
        <p className="text-xs text-brandos-text-secondary mt-3">
          📅 Deadline: {new Date(project.deadline).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
