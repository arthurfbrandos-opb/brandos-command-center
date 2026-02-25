'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Zap, Loader } from 'lucide-react';

interface KPIData {
  id: string;
  snapshot_date: string;
  tasks_completed: number;
  story_points_completed: number;
  velocity: number;
  posts_published: number;
  total_likes: number;
  avg_engagement_rate: number;
  leads_generated: number;
  revenue_generated: number;
}

interface KPISnapshotBrandOSProps {
  projectId: string;
  category: 'INFRA' | 'STRATEGY';
}

export const KPISnapshotBrandOS: FC<KPISnapshotBrandOSProps> = ({ projectId, category }) => {
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestKPI = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kpi_snapshots')
        .select('*')
        .eq('project_id', projectId)
        .order('snapshot_date', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      setKpi(data || null);
    } catch (err) {
      console.error('Error fetching KPI:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchLatestKPI();
  }, [fetchLatestKPI]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-brandos-neon-400" />
      </div>
    );
  }

  if (!kpi) {
    return (
      <div className="bg-brandos-dark-800 rounded-lg p-6 text-center text-brandos-metal-500 border border-brandos-neon-400/20 font-mono">
        <p>Nenhuma métrica registrada</p>
      </div>
    );
  }

  const infraMetrics = [
    { label: 'Tasks ✓', value: kpi.tasks_completed, icon: '✅' },
    { label: 'Story Points', value: kpi.story_points_completed, icon: '📊' },
    { label: 'Velocity', value: kpi.velocity?.toFixed(1) || 0, icon: '⚡' },
  ];

  const strategyMetrics = [
    { label: 'Posts 📸', value: kpi.posts_published, icon: '📸' },
    { label: 'Likes ❤️', value: kpi.total_likes, icon: '❤️' },
    { label: 'Engagement', value: `${kpi.avg_engagement_rate?.toFixed(2) || 0}%`, icon: '📈' },
  ];

  const metrics = category === 'INFRA' ? infraMetrics : strategyMetrics;

  return (
    <div className="bg-brandos-dark-800 rounded-lg p-6 border border-brandos-neon-400/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-brandos-neon-400 animate-neon-pulse" />
          <h2 className="text-xl font-bold text-white font-mono">KPI Snapshot</h2>
        </div>
        <span className="text-xs text-brandos-metal-500 font-mono">
          {new Date(kpi.snapshot_date).toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-brandos-dark-700 to-brandos-dark-800 rounded-lg p-4 border border-brandos-neon-400/20 hover:border-brandos-neon-400/60 hover:shadow-neon-glow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-brandos-metal-400 font-mono font-bold">{metric.label}</p>
                <p className="text-3xl font-bold text-brandos-neon-400 mt-2 font-mono">{metric.value}</p>
              </div>
              <span className="text-2xl">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {category === 'STRATEGY' && kpi.leads_generated > 0 && (
        <div className="mt-6 pt-6 border-t border-brandos-neon-400/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brandos-dark-700 to-brandos-dark-800 rounded-lg p-4 border border-brandos-neon-400/20">
              <p className="text-sm text-brandos-metal-400 font-mono font-bold">Leads Generated</p>
              <p className="text-2xl font-bold text-brandos-neon-400 mt-2 font-mono">{kpi.leads_generated}</p>
            </div>
            <div className="bg-gradient-to-br from-brandos-dark-700 to-brandos-dark-800 rounded-lg p-4 border border-brandos-neon-400/20">
              <p className="text-sm text-brandos-metal-400 font-mono font-bold">Revenue</p>
              <p className="text-2xl font-bold text-brandos-neon-400 mt-2 font-mono">
                R$ {kpi.revenue_generated?.toFixed(0) || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
