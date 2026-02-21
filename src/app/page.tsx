'use client';

import OverviewCard from '@/components/OverviewCard';
import MetricsChart from '@/components/MetricsChart';
import { Project } from '@/lib/types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Negócio Simples',
    emoji: '🎓',
    description: 'SaaS + Mentoria para donos de agência',
    status: 'active',
    progress: 36,
    deadline: '2026-03-22',
    created_by: 'arthur',
    created_at: '2026-02-20',
    updated_at: '2026-02-20',
  },
  {
    id: '2',
    name: 'CliniSales',
    emoji: '🏥',
    description: 'Agência de Assessoria Comercial para Clínicas',
    status: 'active',
    progress: 62,
    deadline: '2026-03-22',
    created_by: 'arthur',
    created_at: '2026-02-20',
    updated_at: '2026-02-20',
  },
  {
    id: '3',
    name: 'PowerHouse',
    emoji: '⚡',
    description: 'Marketplace de Agentes IA',
    status: 'active',
    progress: 19,
    deadline: '2026-05-22',
    created_by: 'arthur',
    created_at: '2026-02-20',
    updated_at: '2026-02-20',
  },
];

const tasksData = [
  { name: 'W1', tasks: 12, completed: 3 },
  { name: 'W2', tasks: 20, completed: 8 },
  { name: 'W3', tasks: 28, completed: 15 },
  { name: 'W4', tasks: 35, completed: 25 },
];

const mrrData = [
  { name: 'Jan', negocio_simples: 0, clinisales: 150 },
  { name: 'Fev', negocio_simples: 5, clinisales: 155 },
  { name: 'Mar', negocio_simples: 30, clinisales: 165 },
];

const recentActivity = [
  { title: '✅ Sprint 0 iniciado', subtitle: 'Foundation OS Module', date: 'Hoje' },
  { title: '🚀 BrandOS CC em desenvolvimento', subtitle: 'Componentes + páginas', date: 'Hoje' },
  { title: '📊 Dashboard estruturado', subtitle: 'OPERATIONS_DASHBOARD.md criado', date: 'Hoje' },
];

const kpis = [
  { value: '48', label: 'Tasks Total', color: 'text-brandos-primary' },
  { value: '25', label: 'Completadas', color: 'text-brandos-success' },
  { value: '4', label: 'Agentes', color: 'text-brandos-info' },
  { value: 'R$185k', label: 'MRR Total', color: 'text-brandos-warning' },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-brandos-primary mb-2 text-glow">
          🟢 BrandOS Command Center
        </h1>
        <p className="text-brandos-text-secondary text-sm">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </p>
      </div>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-bold text-brandos-primary mb-4">📦 Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <OverviewCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* KPIs */}
      <section>
        <h2 className="text-xl font-bold text-brandos-primary mb-4">⚡ Status Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="card text-center">
              <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-sm text-brandos-text-secondary mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="text-xl font-bold text-brandos-primary mb-4">📈 Métricas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <MetricsChart
              data={tasksData}
              type="line"
              title="Tasks por Semana"
              lines={[
                { key: 'tasks', color: '#00FF00' },
                { key: 'completed', color: '#0099FF' },
              ]}
            />
          </div>
          <div className="card">
            <MetricsChart
              data={mrrData}
              type="bar"
              title="MRR por Projeto (R$k)"
              lines={[
                { key: 'negocio_simples', color: '#00FF00' },
                { key: 'clinisales', color: '#0099FF' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold text-brandos-primary mb-4">📋 Atividade Recente</h2>
        <div className="card space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between pb-3 ${i < recentActivity.length - 1 ? 'border-b border-brandos-border' : ''}`}
            >
              <div>
                <p className="font-semibold text-brandos-text">{item.title}</p>
                <p className="text-sm text-brandos-text-secondary">{item.subtitle}</p>
              </div>
              <span className="text-xs text-brandos-text-secondary">{item.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
