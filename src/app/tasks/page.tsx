'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, X, Loader2, Flag, Calendar, Trash2, ChevronDown } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  project_id: string;
  sprint_id?: string;
  deadline?: string;
  created_at: string;
};

type Project = {
  id: string;
  name: string;
  emoji: string;
};

type Sprint = {
  id: string;
  name: string;
  project_id: string;
};

const COLUMNS: { key: Task['status']; label: string; color: string; bg: string }[] = [
  { key: 'todo', label: '📋 Backlog', color: 'text-gray-400', bg: 'border-gray-600' },
  { key: 'in_progress', label: '⚡ Em Progresso', color: 'text-blue-400', bg: 'border-blue-500' },
  { key: 'in_review', label: '🔍 Em Review', color: 'text-yellow-400', bg: 'border-yellow-500' },
  { key: 'done', label: '✅ Concluído', color: 'text-green-400', bg: 'border-green-500' },
];

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-600 text-gray-300',
  medium: 'bg-blue-900 text-blue-300',
  high: 'bg-orange-900 text-orange-300',
  critical: 'bg-red-900 text-red-300',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Baixa', medium: 'Média', high: 'Alta', critical: 'Crítica',
};

const STATUS_LABELS: Record<string, string> = {
  todo: 'Backlog', in_progress: 'Em Progresso', in_review: 'Em Review', done: 'Concluído',
};

type TaskFormState = {
  title: string;
  description: string;
  priority: Task['priority'];
  project_id: string;
  sprint_id: string;
  deadline: string;
  status: Task['status'];
};

const DEFAULT_FORM: TaskFormState = {
  title: '', description: '', priority: 'medium',
  project_id: '', sprint_id: '', deadline: '', status: 'todo',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TaskFormState>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [filterProject, setFilterProject] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState<Partial<TaskFormState>>({});

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [tasksRes, projectsRes, sprintsRes] = await Promise.all([
      fetch('/api/tasks'),
      fetch('/api/projects'),
      fetch('/api/sprints'),
    ]);
    const [tasksData, projectsData, sprintsData] = await Promise.all([
      tasksRes.json(), projectsRes.json(), sprintsRes.json(),
    ]);
    setTasks(Array.isArray(tasksData) ? tasksData : []);
    setProjects(Array.isArray(projectsData) ? projectsData : []);
    setSprints(Array.isArray(sprintsData) ? sprintsData : []);
    if (!form.project_id && projectsData?.length) {
      setForm(f => ({ ...f, project_id: projectsData[0].id }));
    }
    setLoading(false);
  }, []); // eslint-disable-line

  useEffect(() => { loadAll(); }, [loadAll]);

  const createTask = async () => {
    if (!form.title.trim() || !form.project_id) return;
    setSaving(true);
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sprint_id: form.sprint_id || null, deadline: form.deadline || null }),
    });
    setForm({ ...DEFAULT_FORM, project_id: form.project_id });
    setShowForm(false);
    setSaving(false);
    loadAll();
  };

  const updateTask = async (id: string, patch: Partial<Task>) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
    if (selectedTask?.id === id) setSelectedTask(prev => prev ? { ...prev, ...patch } : null);
  };

  const deleteTask = async (id: string) => {
    if (!confirm('Deletar essa task?')) return;
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  };

  const filteredTasks = filterProject
    ? tasks.filter(t => t.project_id === filterProject)
    : tasks;

  const tasksByStatus = (status: Task['status']) =>
    filteredTasks.filter(t => t.status === status);

  const projectName = (id: string) =>
    projects.find(p => p.id === id)?.name || '—';

  const projectEmoji = (id: string) =>
    projects.find(p => p.id === id)?.emoji || '📁';

  const filteredSprints = form.project_id
    ? sprints.filter(s => s.project_id === form.project_id)
    : sprints;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brandos-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-brandos-primary text-glow">
            ✅ Tasks
          </h1>
          <p className="text-brandos-text-secondary text-sm mt-0.5">
            {filteredTasks.length} tasks · {filteredTasks.filter(t => t.status === 'done').length} concluídas
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterProject}
            onChange={e => setFilterProject(e.target.value)}
            className="input text-sm py-1.5 px-2"
          >
            <option value="">Todos os projetos</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
            ))}
          </select>
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm py-1.5 px-3">
            <Plus size={16} /> Nova Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <div key={col.key} className={`flex flex-col gap-2`}>
            {/* Column Header */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-lg bg-brandos-surface border ${col.bg}`}>
              <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
              <span className="text-xs text-brandos-text-secondary bg-brandos-bg px-2 py-0.5 rounded-full">
                {tasksByStatus(col.key).length}
              </span>
            </div>

            {/* Tasks */}
            <div className="flex flex-col gap-2 min-h-[100px]">
              {tasksByStatus(col.key).map(task => (
                <div
                  key={task.id}
                  onClick={() => { setSelectedTask(task); setEditForm({}); }}
                  className="card cursor-pointer hover:border-brandos-primary/50 transition-colors p-3 space-y-2"
                >
                  <p className="text-sm font-medium text-brandos-text leading-snug">{task.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                    <span className="text-xs text-brandos-text-secondary">
                      {projectEmoji(task.project_id)} {projectName(task.project_id)}
                    </span>
                  </div>
                  {task.deadline && (
                    <div className="flex items-center gap-1 text-xs text-brandos-text-secondary">
                      <Calendar size={10} />
                      {new Date(task.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              ))}

              {tasksByStatus(col.key).length === 0 && (
                <div className="text-center text-xs text-brandos-text-secondary py-6 opacity-50">
                  Sem tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-brandos-surface border border-brandos-border rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-brandos-primary">Nova Task</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-brandos-text-secondary" /></button>
            </div>

            <div className="space-y-3">
              <input
                placeholder="Título da task *"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="input w-full"
                autoFocus
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="input w-full h-20 resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Projeto *</label>
                  <select
                    value={form.project_id}
                    onChange={e => setForm(f => ({ ...f, project_id: e.target.value, sprint_id: '' }))}
                    className="input w-full text-sm"
                  >
                    <option value="">Selecionar...</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Prioridade</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task['priority'] }))}
                    className="input w-full text-sm"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="critical">Crítica</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value as Task['status'] }))}
                    className="input w-full text-sm"
                  >
                    {COLUMNS.map(c => <option key={c.key} value={c.key}>{STATUS_LABELS[c.key]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-brandos-text-secondary mb-1 block">Sprint</label>
                  <select
                    value={form.sprint_id}
                    onChange={e => setForm(f => ({ ...f, sprint_id: e.target.value }))}
                    className="input w-full text-sm"
                    disabled={!form.project_id}
                  >
                    <option value="">Sem sprint</option>
                    {filteredSprints.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-brandos-text-secondary mb-1 block">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  className="input w-full text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm">Cancelar</button>
              <button
                onClick={createTask}
                disabled={saving || !form.title.trim() || !form.project_id}
                className="btn-primary flex-1 text-sm flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-brandos-surface border border-brandos-border rounded-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-brandos-text leading-tight">{selectedTask.title}</h2>
              <button onClick={() => setSelectedTask(null)}><X size={20} className="text-brandos-text-secondary flex-shrink-0" /></button>
            </div>

            {selectedTask.description && (
              <p className="text-sm text-brandos-text-secondary">{selectedTask.description}</p>
            )}

            {/* Status change */}
            <div>
              <label className="text-xs text-brandos-text-secondary mb-1 block flex items-center gap-1">
                <ChevronDown size={12} /> Mover para
              </label>
              <div className="grid grid-cols-2 gap-1">
                {COLUMNS.map(col => (
                  <button
                    key={col.key}
                    onClick={() => updateTask(selectedTask.id, { status: col.key })}
                    className={`text-xs py-1.5 px-2 rounded border transition-colors ${
                      selectedTask.status === col.key
                        ? `${col.bg} ${col.color} bg-brandos-bg`
                        : 'border-brandos-border text-brandos-text-secondary hover:border-brandos-primary hover:text-brandos-primary'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority change */}
            <div>
              <label className="text-xs text-brandos-text-secondary mb-1 block flex items-center gap-1">
                <Flag size={12} /> Prioridade
              </label>
              <div className="flex gap-1 flex-wrap">
                {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => updateTask(selectedTask.id, { priority: key as Task['priority'] })}
                    className={`text-xs px-2 py-1 rounded-full transition-opacity ${PRIORITY_COLORS[key]} ${
                      selectedTask.priority === key ? 'opacity-100 ring-1 ring-white/30' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-brandos-text-secondary pt-2 border-t border-brandos-border">
              <span>{projectEmoji(selectedTask.project_id)} {projectName(selectedTask.project_id)}</span>
              {selectedTask.deadline && (
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(selectedTask.deadline).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>

            <button
              onClick={() => deleteTask(selectedTask.id)}
              className="w-full text-xs text-red-400 hover:text-red-300 flex items-center justify-center gap-1 py-1.5 transition-colors"
            >
              <Trash2 size={12} /> Deletar task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
