'use client';

import { FC, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Loader } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'BLOCKED';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  assigned_to: string | null;
  effort_points: number | null;
}

interface TaskKanbanProps {
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

export const TaskKanban: FC<TaskKanbanProps> = ({ projectId, sprintId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [projectId, sprintId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);

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
  };

  const tasksByStatus = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {} as Record<string, Task[]>);

  const getPriorityColor = (priority: string) => {
    const colors = {
      P0: 'bg-red-100 text-red-800',
      P1: 'bg-orange-100 text-orange-800',
      P2: 'bg-blue-100 text-blue-800',
      P3: 'bg-gray-100 text-gray-800',
    };
    return colors[priority as keyof typeof colors] || colors.P2;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Task Kanban</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STATUSES.map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-sm text-gray-900">{STATUS_LABELS[status]}</h3>
              <p className="text-xs text-gray-500 mt-1">{tasksByStatus[status].length} tasks</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {tasksByStatus[status].map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-move"
                >
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{task.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {task.priority && (
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    )}
                    {task.effort_points && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {task.effort_points}pts
                      </span>
                    )}
                  </div>
                  {task.assigned_to && <p className="text-xs text-gray-500 mt-2">👤 {task.assigned_to}</p>}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 py-2">
                <Plus className="w-4 h-4" />
                Add task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
