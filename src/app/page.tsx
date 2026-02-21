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
    description: 'Assessoria Comercial para Clínicas',
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

const kpis = [
  { value: '48', label: 'Tasks Total', color: 'text-brandos-primary' },
  { value: '25', label: 'Concluídas', color: 'text-brandos-success' },
  { value: '4', label: 'Agentes', color: 'text-brandos-info' },
  { value: 'R$185k', label: 'MRR Total', color: 'text-brandos-warning' },
];

const recentActivity = [
  { title: '✅ Sprint 0 iniciado', subtitle: 'Foundation OS Module', date: 'Hoje' },
  { title: '🚀 BrandOS CC em desenvolvimento', subtitle: 'Componentes + páginas', date: 'Hoje' },
  { title: '📊 Dashboard estruturado', subtitle: 'OPERATIONS_DASHBOARD.md criado', date: 'Hoje' },
];

export default function Home() {
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

      {/* KPIs — 2 cols mobile, 4 cols desktop */}
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

      {/* Projects — 1 col mobile, 3 cols desktop */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📦 Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <OverviewCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Charts — 1 col mobile, 2 cols desktop */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📈 Métricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Activity */}
      <section>
        <h2 className="text-base md:text-xl font-bold text-brandos-primary mb-3">📋 Atividade Recente</h2>
        <div className="card divide-y divide-brandos-border">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex-1 min-w-0 pr-4">
                <p className="font-semibold text-brandos-text text-sm truncate">{item.title}</p>
                <p className="text-xs text-brandos-text-secondary truncate">{item.subtitle}</p>
              </div>
              <span className="text-xs text-brandos-text-secondary whitespace-nowrap">{item.date}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
