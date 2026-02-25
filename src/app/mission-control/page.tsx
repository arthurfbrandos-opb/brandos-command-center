'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProjectCard } from '@/components/ProjectCard';
import { TaskKanban } from '@/components/TaskKanban';
import { EditorialCalendar } from '@/components/EditorialCalendar';
import { KPISnapshot } from '@/components/KPISnapshot';
import { Loader, Plus } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  category: 'INFRA' | 'STRATEGY';
  status: 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  priority: 'P0' | 'P1' | 'P2';
  description: string;
  objective: string;
  owner_name: string;
  target_end_date: string | null;
}

export default function MissionControlPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'kanban' | 'calendar' | 'kpi'>('overview');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('priority', { ascending: true })
        .order('category', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
      if (data && data.length > 0) {
        setSelectedProject(data[0]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const infraProjects = projects.filter((p) => p.category === 'INFRA');
  const strategyProjects = projects.filter((p) => p.category === 'STRATEGY');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">🎯 Mission Control</h1>
          <p className="text-gray-600 mt-2">Central de operações - 6 projetos, 3 INFRA + 3 STRATEGY</p>
        </div>

        {/* Projects Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 INFRA Projects (Dev)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infraProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setTab('overview');
                }}
                className={`cursor-pointer transition-all ${
                  selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 STRATEGY Projects (Content)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategyProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setTab('overview');
                }}
                className={`cursor-pointer transition-all ${
                  selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        {selectedProject && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center justify-between mb-6 border-b pb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.name}</h2>
                <p className="text-gray-600 mt-1">{selectedProject.objective}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              {(
                [
                  ['overview', '📋 Overview'],
                  ['kanban', '📊 Kanban'],
                  ['calendar', '📅 Calendar'],
                  ['kpi', '📈 KPI'],
                ] as const
              ).map(([tabName, label]) => (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    tab === tabName
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-sm text-gray-500">Status</dt>
                          <dd className="text-lg font-semibold text-gray-900">{selectedProject.status}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Owner</dt>
                          <dd className="text-lg font-semibold text-gray-900">{selectedProject.owner_name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Priority</dt>
                          <dd className="text-lg font-semibold text-gray-900">{selectedProject.priority}</dd>
                        </div>
                      </dl>
                    </div>
                    <KPISnapshot projectId={selectedProject.id} category={selectedProject.category} />
                  </div>
                </div>
              )}

              {tab === 'kanban' && <TaskKanban projectId={selectedProject.id} />}

              {tab === 'calendar' && selectedProject.category === 'STRATEGY' && (
                <EditorialCalendar projectId={selectedProject.id} limit={14} />
              )}

              {tab === 'calendar' && selectedProject.category === 'INFRA' && (
                <div className="text-center py-12 text-gray-500">
                  <p>Editorial Calendar é apenas para STRATEGY projects</p>
                </div>
              )}

              {tab === 'kpi' && (
                <div className="space-y-6">
                  <KPISnapshot projectId={selectedProject.id} category={selectedProject.category} />
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Trend Analysis</h3>
                    <p className="text-gray-600">KPI trend charts coming soon...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
