'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Loader2, Calendar, CheckSquare, Clock } from 'lucide-react';
import { formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Sprint = {
  id: string;
  name: string;
  project_id: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed';
  created_at: string;
};

type Project = {
  id: string;
  name: string;
  emoji: string;
};

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  sprint_id: string | null;
  project_id: string;
};

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-600 text-gray-300',
  medium: 'bg-blue-900 text-blue-300',
  high: 'bg-orange-900 text-orange-300',
  critical: 'bg-red-900 text-red-300',
};

export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedSprint, setExpandedSprint] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', project_id: '', start_date: '', end_date: '', status: 'active',
  });

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [sprintsRes, projectsRes, tasksRes] = await Promise.all([
      fetch('/api/sprints'),
      fetch('/api/projects'),
      fetch('/api/tasks'),
    ]);
    const [sprintsData, projectsData, tasksData] = await Promise.all([
      sprintsRes.json(), projectsRes.json(), tasksRes.json(),
    ]);
    setSprints(Array.isArray(sprintsData) ? sprintsData : []);
    setProjects(Array.isArray(projectsData) ? projectsData : []);
    setTasks(Array.isArray(tasksData) ? tasksData : []);
    if (!form.project_id && projectsData?.length) {
      setForm(f => ({ ...f, project_id: projectsData[0].id }));
    }
    setLoading(false);
  }, []); // eslint-disable-line

  useEffect(() => { loadAll(); }, [loadAll]);

  const createSprint = async () => {
    if (!form.name.trim() || !form.project_id || !form.start_date || !form.end_date) return;
    setSaving(true);
    await fetch('/api/sprints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm(f => ({ name: '', project_id: f.project_id, start_date: '', end_date: '', status: 'active' }));
    setShowForm(false);
    setSaving(false);
    loadAll();
  };

  const completeSprint = async (id: string) => {
    await fetch(`/api/sprints/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    });
    setSprints(prev => prev.map(s => s.id === id ? { ...s, status: 'completed' } : s));
  };

  const deleteSprint = async (id: string) => {
    if (!confirm('Deletar esse sprint? As tasks ficam sem sprint.')) return;
    await fetch(`/api/sprints/${id}`, { method: 'DELETE' });
    setSprints(prev => prev.filter(s => s.id !== id));
    if (expandedSprint === id) setExpandedSprint(null);
  };

  const getProject = (id: string) => projects.find(p => p.id === id);

  const sprintTasks = (sprintId: string) => tasks.filter(t => t.sprint_id === sprintId);

  const getSprintStatus = (sprint: Sprint) => {
    const now = new Date();
    const start = parseISO(sprint.start_date);
    const end = parseISO(sprint.end_date);
    if (sprint.status === 'completed') return { label: '✅ Concluído', color: 'text-green-400', bg: 'border-green-600' };
    if (isBefore(now, start)) return { label: '🕐 Planejado', color: 'text-gray-400', bg: 'border-gray-600' };
    if (isAfter(now, end)) return { label: '⚠️ Atrasado', color: 'text-red-400', bg: 'border-red-600' };
    return { label: '⚡ Ativo', color: 'text-blue-400', bg: 'border-blue-500' };
  };

  const activeSprints = sprints.filter(s => s.status === 'active');
  const completedSprints = sprints.filter(s => s.status === 'completed');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brandos-primary" size={32} />
      </div>
    );
  }

  const SprintCard = ({ sprint }: { sprint: Sprint }) => {
    const project = getProject(sprint.project_id);
    const st = getSprintStatus(sprint);
    const spTasks = sprintTasks(sprint.id);
    const done = spTasks.filter(t => t.status === 'done').length;
    const progress = spTasks.length ? Math.round((done / spTasks.length) * 100) : 0;
    const isExpanded = expandedSprint === sprint.id;

    return (
      <div className={`card border-l-2 ${st.bg} p-4 space-y-3`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-brandos-text">{sprint.name}</span>
              <span className={`text-xs ${st.color}`}>{st.label}</span>
            </div>
            {project && (
              <span className="text-xs text-brandos-text-secondary">
                {project.emoji} {project.name}
              </span>
            )}
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {sprint.status === 'active' && (
              <button
                onClick={() => completeSprint(sprint.id)}
                className="text-xs text-green-400 hover:text-green-300 px-2 py-1 border border-green-800 rounded transition-colors"
              >
                Concluir
              </button>
            )}
            <button
              onClick={() => deleteSprint(sprint.id)}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-red-900 rounded transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-4 text-xs text-brandos-text-secondary">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {new Date(sprint.start_date).toLocaleDateString('pt-BR')}
          </span>
          <span>→</span>
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {new Date(sprint.end_date).toLocaleDateString('pt-BR')}
          </span>
          {sprint.status === 'active' && (
            <span className="flex items-center gap-1 ml-auto text-brandos-text-secondary">
              <Clock size={10} />
              {formatDistanceToNow(parseISO(sprint.end_date), { addSuffix: true, locale: ptBR })}
            </span>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-brandos-text-secondary">{done}/{spTasks.length} tasks</span>
            <span className="text-xs font-bold text-brandos-primary">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Tasks toggle */}
        {spTasks.length > 0 && (
          <button
            onClick={() => setExpandedSprint(isExpanded ? null : sprint.id)}
            className="text-xs text-brandos-text-secondary hover:text-brandos-primary flex items-center gap-1 transition-colors"
          >
            <CheckSquare size={11} />
            {isExpanded ? 'Ocultar' : 'Ver'} tasks ({spTasks.length})
          </button>
        )}

        {isExpanded && (
          <div className="space-y-1 pt-1 border-t border-brandos-border">
            {spTasks.map(task => (
              <div key={task.id} className="flex items-center gap-2 text-xs py-1">
                <span>{task.status === 'done' ? '✅' : task.status === 'in_progress' ? '⚡' : task.status === 'in_review' ? '🔍' : '📋'}</span>
                <span className={`flex-1 ${task.status === 'done' ? 'line-through text-brandos-text-secondary' : 'text-brandos-text'}`}>
                  {task.title}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority] || ''}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-brandos-primary text-glow">
            📅 Sprints
          </h1>
          <p className="text-brandos-text-secondary text-sm mt-0.5">
            {activeSprints.length} ativos · {completedSprints.length} concluídos
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm py-1.5 px-3">
          <Plus size={16} /> Novo Sprint
        </button>
      </div>

      {/* Active Sprints */}
      {activeSprints.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-brandos-primary mb-3">⚡ Ativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSprints.map(s => <SprintCard key={s.id} sprint={s} />)}
          </div>
        </section>
      )}

      {sprints.length === 0 && (
        <div className="card text-center py-12 text-brandos-text-secondary">
          <Calendar size={32} className="mx-auto mb-2 opacity-30" />
          <p>Nenhum sprint criado ainda.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary mt-4 text-sm">
            Criar primeiro sprint
          </button>
        </div>
      )}

      {/* Completed */}
      {completedSprints.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-brandos-text-secondary mb-3 opacity-60">✅ Concluídos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
            {completedSprints.map(s => <SprintCard key={s.id} sprint={s} />)}
          </div>
        </section>
      )}

      {/* Create Sprint Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-brandos-surface border border-brandos-border rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brandos-primary">Novo Sprint</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-brandos-text-secondary" /></button>
            </div>

            <div className="space-y-3">
              <input
                placeholder="Nome do sprint *"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="input w-full"
                autoFocus
              />
              <div>
                <label className="text-xs text-brandos-text-secondary mb-1 block">Projeto *</label>
                <select
                  value={form.project_id}
                  onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))}
                  className="input w-full text-sm"
                >
                  <option value="">Selecionar...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Início *</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                    className="input w-full text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Fim *</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                    className="input w-full text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm">Cancelar</button>
              <button
                onClick={createSprint}
                disabled={saving || !form.name.trim() || !form.project_id || !form.start_date || !form.end_date}
                className="btn-primary flex-1 text-sm flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
