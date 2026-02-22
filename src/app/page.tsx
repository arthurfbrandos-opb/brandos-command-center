'use client';

import { useEffect, useState, useCallback } from 'react';
import OverviewCard from '@/components/OverviewCard';
import MetricsChart from '@/components/MetricsChart';
import { Loader2 } from 'lucide-react';

type Project = {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  status: string;
  progress: number;
  deadline?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  project_id: string;
  sprint_id?: string;
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

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [pRes, tRes, sRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/tasks'),
      fetch('/api/sprints'),
    ]);
    const [pData, tData, sData] = await Promise.all([
      pRes.json(), tRes.json(), sRes.json(),
    ]);
    setProjects(Array.isArray(pData) ? pData : []);
    setTasks(Array.isArray(tData) ? tData : []);
    setSprints(Array.isArray(sData) ? sData : []);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // KPIs calculados
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const activeSprints = sprints.filter(s => s.status === 'active').length;

  // Tasks por projeto para gráfico
  const tasksByProjectChart = projects.map(p => ({
    name: p.name.split(' ')[0],
    total: tasks.filter(t => t.project_id === p.id).length,
    concluídas: tasks.filter(t => t.project_id === p.id && t.status === 'done').length,
  }));

  // Status breakdown para gráfico
  const statusChart = [
    { name: 'Backlog', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'Progresso', value: tasks.filter(t => t.status === 'in_progress').length },
    { name: 'Review', value: tasks.filter(t => t.status === 'in_review').length },
    { name: 'Feito', value: tasks.filter(t => t.status === 'done').length },
  ];

  // Atividade recente = tasks mais recentes
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const kpis = [
    { value: String(totalTasks), label: 'Tasks Total', color: 'text-brandos-primary' },
    { value: `${doneTasks}/${totalTasks}`, label: 'Concluídas', color: 'text-green-400' },
    { value: String(inProgress), label: 'Em Progresso', color: 'text-blue-400' },
    { value: String(activeSprints), label: 'Sprints Ativos', color: 'text-yellow-400' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return '✅';
      case 'in_progress': return '⚡';
      case 'in_review': return '🔍';
      default: return '📋';
    }
  };

  const getProjectName = (id: string) =>
    projects.find(p => p.id === id)?.name || '—';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `há ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `há ${hrs}h`;
    return d.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brandos-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-brandos-primary text-glow">
          🟢 BrandOS Command Center
        </h1>
        <p className="text-brandos-text-secondary text-xs md:text-sm mt-1">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </p>
      </div>

      {/* KPIs */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">⚡ Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="card text-center py-3 px-2">
              <p className={`text-xl md:text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-brandos-text-secondary mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📦 Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <OverviewCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Charts */}
      {tasksByProjectChart.some(p => p.total > 0) && (
        <section>
          <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📈 Métricas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <MetricsChart
                data={tasksByProjectChart}
                type="bar"
                title="Tasks por Projeto"
                lines={[
                  { key: 'total', color: '#3B82F6' },
                  { key: 'concluídas', color: '#00FF00' },
                ]}
              />
            </div>
            <div className="card">
              <MetricsChart
                data={statusChart}
                type="bar"
                title="Tasks por Status"
                lines={[
                  { key: 'value', color: '#00FF00' },
                ]}
              />
            </div>
          </div>
        </section>
      )}

      {/* Sprints ativos */}
      {sprints.filter(s => s.status === 'active').length > 0 && (
        <section>
          <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">🏃 Sprints Ativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sprints.filter(s => s.status === 'active').map(sprint => {
              const spTasks = tasks.filter(t => t.sprint_id === sprint.id);
              const spDone = spTasks.filter(t => t.status === 'done').length;
              const progress = spTasks.length ? Math.round((spDone / spTasks.length) * 100) : 0;
              const project = projects.find(p => p.id === sprint.project_id);
              return (
                <div key={sprint.id} className="card border-l-2 border-blue-500 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-brandos-text text-sm">{sprint.name}</p>
                      <p className="text-xs text-brandos-text-secondary">
                        {project?.emoji} {project?.name} · até {new Date(sprint.end_date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brandos-primary">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-brandos-text-secondary">{spDone}/{spTasks.length} tasks concluídas</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Atividade recente */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📋 Atividade Recente</h2>
        <div className="card divide-y divide-brandos-border">
          {recentTasks.length === 0 ? (
            <p className="text-brandos-text-secondary text-sm py-4 text-center">Nenhuma task ainda.</p>
          ) : (
            recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-3">
                <div className="flex-1 min-w-0 pr-4 flex items-center gap-2">
                  <span className="text-sm">{getStatusIcon(task.status)}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-brandos-text text-sm truncate">{task.title}</p>
                    <p className="text-xs text-brandos-text-secondary truncate">{getProjectName(task.project_id)}</p>
                  </div>
                </div>
                <span className="text-xs text-brandos-text-secondary whitespace-nowrap">{formatDate(task.created_at)}</span>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
