'use client';

import { FC } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ProjectCardProps {
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

export const ProjectCard: FC<ProjectCardProps> = ({
  id,
  name,
  slug,
  category,
  status,
  priority,
  description,
  owner_name,
  target_end_date,
}) => {
  const statusIcons = {
    COMPLETED: <CheckCircle className="w-4 h-4 text-green-500" />,
    ACTIVE: <Clock className="w-4 h-4 text-blue-500" />,
    PLANNING: <AlertCircle className="w-4 h-4 text-yellow-500" />,
    PAUSED: <AlertCircle className="w-4 h-4 text-gray-500" />,
  };

  const categoryBg = category === 'INFRA' ? 'bg-purple-100' : 'bg-cyan-100';
  const categoryText = category === 'INFRA' ? 'text-purple-800' : 'text-cyan-800';
  const priorityColor = priority === 'P0' ? 'text-red-600' : priority === 'P1' ? 'text-orange-600' : 'text-blue-600';

  return (
    <Link href={`/projects/${slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{owner_name}</p>
          </div>
          <div className="flex items-center gap-2">
            {statusIcons[status]}
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${categoryBg} ${categoryText}`}>
              {category}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {target_end_date && (
              <p>Due: {new Date(target_end_date).toLocaleDateString('pt-BR')}</p>
            )}
          </div>
          <div className={`text-sm font-bold ${priorityColor}`}>
            {priority}
          </div>
        </div>
      </div>
    </Link>
  );
};
