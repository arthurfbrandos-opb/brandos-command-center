'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2, TrendingUp, CheckSquare, Calendar, Target } from 'lucide-react';
import MetricsChart from '@/components/MetricsChart';

type Task = {
  id: string;
  status: string;
  priority: string;
  project_id: string;
  created_at: string;
};

type Sprint = {
  id: string;
  name: string;
  status: string;
  project_id: string;
  start_date: string;
  end_date: string;
};

type Project = {
  id: string;
  name: string;
  emoji: string;
  progress: number;
};

export default function MetricsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [tasksRes, sprintsRes, projectsRes] = await Promise.all([
      fetch('/api/tasks'),
      fetch('/api/sprints'),
      fetch('/api/projects'),
    ]);
    const [tasksData, sprintsData, projectsData] = await Promise.all([
      tasksRes.json(), sprintsRes.json(), projectsRes.json(),
    ]);
    setTasks(Array.isArray(tasksData) ? tasksData : []);
    setSprints(Array.isArray(sprintsData) ? sprintsData : []);
    setProjects(Array.isArray(projectsData) ? projectsData : []);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // KPIs
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const completionRate = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const activeSprints = sprints.filter(s => s.status === 'active').length;
  const criticalTasks = tasks.filter(t => t.priority === 'critical' && t.status !== 'done').length;

  // Tasks by project
  const tasksByProject = projects.map(p => ({
    name: `${p.emoji} ${p.name.split(' ')[0]}`,
    total: tasks.filter(t => t.project_id === p.id).length,
    done: tasks.filter(t => t.project_id === p.id && t.status === 'done').length,
  }));

  // Tasks by status (for pie-like bar)
  const statusData = [
    { name: 'Backlog', value: tasks.filter(t => t.status === 'todo').length, color: '#6B7280' },
    { name: 'Em Progresso', value: tasks.filter(t => t.status === 'in_progress').length, color: '#3B82F6' },
    { name: 'Em Review', value: tasks.filter(t => t.status === 'in_review').length, color: '#F59E0B' },
    { name: 'Concluído', value: tasks.filter(t => t.status === 'done').length, color: '#10B981' },
  ];

  // Priority breakdown
  const priorityData = [
    { name: 'Crítica', value: tasks.filter(t => t.priority === 'critical').length, color: '#EF4444' },
    { name: 'Alta', value: tasks.filter(t => t.priority === 'high').length, color: '#F97316' },
    { name: 'Média', value: tasks.filter(t => t.priority === 'medium').length, color: '#3B82F6' },
    { name: 'Baixa', value: tasks.filter(t => t.priority === 'low').length, color: '#6B7280' },
  ];

  // Progress per project for chart
  const progressChartData = projects.map(p => ({
    name: `${p.emoji} ${p.name.split(' ')[0]}`,
    progresso: p.progress,
  }));

  const kpis = [
    { icon: CheckSquare, label: 'Tasks Concluídas', value: `${doneTasks}/${totalTasks}`, sub: `${completionRate}% taxa`, color: 'text-green-400' },
    { icon: TrendingUp, label: 'Em Progresso', value: String(inProgress), sub: 'tasks ativas', color: 'text-blue-400' },
    { icon: Calendar, label: 'Sprints Ativos', value: String(activeSprints), sub: `${sprints.length} total`, color: 'text-brandos-primary' },
    { icon: Target, label: 'Tasks Críticas', value: String(criticalTasks), sub: 'pendentes', color: criticalTasks > 0 ? 'text-red-400' : 'text-green-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brandos-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-brandos-primary text-glow">
          📈 Métricas
        </h1>
        <p className="text-brandos-text-secondary text-sm mt-0.5">
          Visão geral dos projetos BrandOS
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(kpi => (
          <div key={kpi.label} className="card text-center py-4 px-3">
            <kpi.icon size={18} className={`mx-auto mb-1 ${kpi.color}`} />
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-brandos-text-secondary mt-0.5">{kpi.label}</p>
            <p className="text-xs text-brandos-text-secondary opacity-60">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasksByProject.length > 0 && (
          <div className="card">
            <MetricsChart
              data={tasksByProject}
              type="bar"
              title="Tasks por Projeto"
              lines={[
                { key: 'total', color: '#3B82F6' },
                { key: 'done', color: '#10B981' },
              ]}
            />
          </div>
        )}
        {progressChartData.length > 0 && (
          <div className="card">
            <MetricsChart
              data={progressChartData}
              type="bar"
              title="Progresso por Projeto (%)"
              lines={[
                { key: 'progresso', color: '#00FF00' },
              ]}
            />
          </div>
        )}
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-brandos-text">Status das Tasks</h3>
          {statusData.map(item => (
            <div key={item.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brandos-text-secondary">{item.name}</span>
                <span style={{ color: item.color }} className="font-bold">{item.value}</span>
              </div>
              <div className="h-2 bg-brandos-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: totalTasks ? `${(item.value / totalTasks) * 100}%` : '0%',
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card space-y-3">
          <h3 className="text-sm font-semibold text-brandos-text">Prioridade das Tasks</h3>
          {priorityData.map(item => (
            <div key={item.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brandos-text-secondary">{item.name}</span>
                <span style={{ color: item.color }} className="font-bold">{item.value}</span>
              </div>
              <div className="h-2 bg-brandos-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: totalTasks ? `${(item.value / totalTasks) * 100}%` : '0%',
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects overview */}
      <div className="card space-y-3">
        <h3 className="text-sm font-semibold text-brandos-text">Progresso dos Projetos</h3>
        {projects.map(p => {
          const pTasks = tasks.filter(t => t.project_id === p.id);
          const pDone = pTasks.filter(t => t.status === 'done').length;
          const pActive = sprints.filter(s => s.project_id === p.id && s.status === 'active').length;
          return (
            <div key={p.id} className="flex items-center gap-4 py-2 border-b border-brandos-border last:border-0">
              <div className="text-2xl">{p.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-brandos-text">{p.name}</span>
                  <span className="text-xs font-bold text-brandos-primary">{p.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-brandos-text-secondary">{pDone}/{pTasks.length} tasks</p>
                <p className="text-xs text-brandos-text-secondary">{pActive} sprint{pActive !== 1 ? 's' : ''}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
