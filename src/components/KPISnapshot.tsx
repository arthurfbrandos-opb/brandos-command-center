'use client';

import { FC, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Users, Zap, Loader } from 'lucide-react';

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

interface KPISnapshotProps {
  projectId: string;
  category: 'INFRA' | 'STRATEGY';
}

export const KPISnapshot: FC<KPISnapshotProps> = ({ projectId, category }) => {
  const [kpi, setKpi] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestKPI();
  }, [projectId]);

  const fetchLatestKPI = async () => {
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
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!kpi) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        <p>Nenhuma métrica registrada ainda</p>
      </div>
    );
  }

  const infraMetrics = [
    { label: 'Tasks Completed', value: kpi.tasks_completed, icon: '✓' },
    { label: 'Story Points', value: kpi.story_points_completed, icon: '📊' },
    { label: 'Velocity', value: kpi.velocity?.toFixed(1) || 0, icon: '⚡' },
  ];

  const strategyMetrics = [
    { label: 'Posts Published', value: kpi.posts_published, icon: '📸' },
    { label: 'Total Likes', value: kpi.total_likes, icon: '❤️' },
    { label: 'Engagement Rate', value: `${kpi.avg_engagement_rate?.toFixed(2) || 0}%`, icon: '📈' },
  ];

  const metrics = category === 'INFRA' ? infraMetrics : strategyMetrics;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">KPI Snapshot</h2>
        <span className="ml-auto text-xs text-gray-500">
          {new Date(kpi.snapshot_date).toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
              </div>
              <span className="text-2xl">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {category === 'STRATEGY' && kpi.leads_generated > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-gray-600">Leads Generated</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{kpi.leads_generated}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                R$ {kpi.revenue_generated?.toFixed(0) || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
