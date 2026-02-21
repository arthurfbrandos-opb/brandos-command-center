'use client';

import { Task } from '@/lib/types';
import { Trash2, Edit2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-brandos-danger';
      case 'high':
        return 'bg-brandos-warning';
      case 'medium':
        return 'bg-brandos-info';
      case 'low':
        return 'bg-brandos-success';
      default:
        return 'bg-brandos-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return '📋';
      case 'in_progress':
        return '🚀';
      case 'in_review':
        return '👀';
      case 'done':
        return '✅';
      default:
        return '📌';
    }
  };

  return (
    <div className="card hover:border-brandos-primary group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-xs text-brandos-text-secondary mb-1">
            {getStatusIcon(task.status)} {task.status.replace('_', ' ').toUpperCase()}
          </p>
          <h4 className="font-bold text-brandos-text group-hover:text-brandos-primary transition-colors">
            {task.title}
          </h4>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-bold text-white ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase()}
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-brandos-text-secondary mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {task.deadline && (
            <span className="text-xs bg-brandos-border px-2 py-1 rounded">
              📅 {new Date(task.deadline).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:text-brandos-primary transition-colors"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 hover:text-brandos-danger transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
