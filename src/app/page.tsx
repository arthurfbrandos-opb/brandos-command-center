'use client';

import { useState } from 'react';
import OverviewCard from '@/components/OverviewCard';
import MetricsChart from '@/components/MetricsChart';
import { Project, Task } from '@/lib/types';

// Mock data
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

const metricsData = [
  { week: 'W1', tasks: 12, completed: 3, inProgress: 5, todo: 4 },
  { week: 'W2', tasks: 20, completed: 8, inProgress: 7, todo: 5 },
  { week: 'W3', tasks: 28, completed: 15, inProgress: 8, todo: 5 },
  { week: 'W4', tasks: 35, completed: 25, inProgress: 7, todo: 3 },
];

const mrrData = [
  { month: 'Jan', negocio_simples: 0, clinisales: 150, powerhouse: 0 },
  { month: 'Fev', negocio_simples: 5, clinisales: 155, powerhouse: 0 },
  { month: 'Mar', negocio_simples: 30, clinisales: 165, powerhouse: 0 },
];

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-bold text-brandos-primary mb-2 text-glow">
          🟢 BrandOS Command Center
        </h1>
        <p className="text-brandos-text-secondary">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </p>
      </div>

      {/* Overview Cards */}
      <div>
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">📊 Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <OverviewCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">📈 Métricas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-bold text-brandos-primary mb-4">Tasks por Semana</h3>
            <MetricsChart
              data={metricsData}
              type="line"
              lines={[
                { key: 'tasks', color: '#00FF00' },
                { key: 'completed', color: '#0099FF' },
              ]}
            />
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-brandos-primary mb-4">MRR por Projeto</h3>
            <MetricsChart
              data={mrrData}
              type="bar"
              lines={[
                { key: 'negocio_simples', color: '#00FF00' },
                { key: 'clinisales', color: '#0099FF' },
                { key: 'powerhouse', color: '#FFD700' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">⚡ Status Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <p className="text-3xl font-bold text-brandos-primary">48</p>
            <p className="text-sm text-brandos-text-secondary">Tasks Total</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-brandos-success">25</p>
            <p className="text-sm text-brandos-text-secondary">Completadas</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-brandos-info">4</p>
            <p className="text-sm text-brandos-text-secondary">Agentes</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-brandos-warning">R$185k</p>
            <p className="text-sm text-brandos-text-secondary">MRR Total</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-brandos-primary mb-4">📋 Atividade Recente</h2>
        <div className="card space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-brandos-border">
            <div>
              <p className="font-semibold text-brandos-text">✅ Sprint 0 iniciado</p>
              <p className="text-sm text-brandos-text-secondary">Foundation OS Module</p>
            </div>
            <span className="text-xs text-brandos-text-secondary">Hoje</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-brandos-border">
            <div>
              <p className="font-semibold text-brandos-text">🚀 BrandOS CC desenvolvimento iniciado</p>
              <p className="text-sm text-brandos-text-secondary">Componentes + páginas</p>
            </div>
            <span className="text-xs text-brandos-text-secondary">Hoje</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-brandos-text">📊 Dashboard estruturado</p>
              <p className="text-sm text-brandos-text-secondary">OPERATIONS_DASHBOARD.md</p>
            </div>
            <span className="text-xs text-brandos-text-secondary">Hoje</span>
          </div>
        </div>
      </div>
    </div>
  );
}
