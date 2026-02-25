'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Loader, Zap } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'BLOCKED';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  assigned_to: string | null;
  effort_points: number | null;
}

interface TaskKanbanBrandOSProps {
  projectId: string;
  sprintId?: string;
}

const STATUSES = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'BLOCKED'] as const;
const STATUS_LABELS = {
  BACKLOG: '📋 Backlog',
  TODO: '✅ To Do',
  IN_PROGRESS: '🔄 In Progress',
  IN_REVIEW: '👀 Review',
  DONE: '✨ Done',
  BLOCKED: '🚫 Blocked',
};

export const TaskKanbanBrandOS: FC<TaskKanbanBrandOSProps> = ({ projectId, sprintId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase.from('tasks').select('*').eq('project_id', projectId);

      if (sprintId) {
        query = query.eq('sprint_id', sprintId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId, sprintId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasksByStatus = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {} as Record<string, Task[]>);

  const getPriorityColor = (priority: string) => {
    const colors = {
      P0: 'border-l-brandos-neon-400 text-brandos-neon-400',
      P1: 'border-l-brandos-neon-500 text-brandos-neon-500/80',
      P2: 'border-l-brandos-metal-500 text-brandos-metal-400',
      P3: 'border-l-brandos-metal-600 text-brandos-metal-500',
    };
    return colors[priority as keyof typeof colors] || colors.P2;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-brandos-neon-400" />
      </div>
    );
  }

  return (
    <div className="bg-brandos-dark-800 rounded-lg p-6 border border-brandos-neon-400/20">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-brandos-neon-400" />
        <h2 className="text-xl font-bold text-white font-mono">Task Kanban</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="bg-gradient-to-b from-brandos-dark-700 to-brandos-dark-800 rounded-lg border border-brandos-neon-400/10 hover:border-brandos-neon-400/30 transition-all min-h-96 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-brandos-neon-400/10 bg-brandos-dark-900/50">
              <p className="font-bold text-xs text-brandos-neon-400 font-mono">
                {STATUS_LABELS[status]}
              </p>
              <p className="text-xs text-brandos-metal-500 mt-1">
                {tasksByStatus[status].length} tasks
              </p>
            </div>

            {/* Tasks */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {tasksByStatus[status].map((task) => (
                <div
                  key={task.id}
                  className={`bg-brandos-dark-800 border-l-2 border rounded-md p-3 hover:shadow-neon-glow-sm transition-all cursor-move text-xs ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <p className="font-mono text-white line-clamp-2">{task.title}</p>
                  {task.effort_points && (
                    <div className="mt-2 inline-block px-2 py-1 rounded-sm bg-brandos-neon-400/10 border border-brandos-neon-400/30 text-brandos-neon-400 font-mono text-xs">
                      {task.effort_points}pts
                    </div>
                  )}
                  {task.assigned_to && (
                    <p className="text-brandos-metal-500 mt-2 font-mono text-xs">👤 {task.assigned_to}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Add button */}
            <div className="p-3 border-t border-brandos-neon-400/10">
              <button className="w-full flex items-center justify-center gap-2 text-xs text-brandos-neon-400/60 hover:text-brandos-neon-400 transition-colors py-2 font-mono font-bold">
                <Plus className="w-3 h-3" />
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
