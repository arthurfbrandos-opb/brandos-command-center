'use client';

import { FC } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, AlertCircle, Zap } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  name: string;
  slug: string;
  category: 'INFRA' | 'STRATEGY';
  status: 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  priority: 'P0' | 'P1' | 'P2';
  description: string;
  owner_name: string;
  target_end_date: string | null;
}

export const ProjectCardBrandOS: FC<ProjectCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    COMPLETED: <CheckCircle2 className="w-5 h-5 text-brandos-neon-400" />,
    ACTIVE: <Zap className="w-5 h-5 text-brandos-neon-400 animate-neon-pulse" />,
    PLANNING: <Clock className="w-5 h-5 text-brandos-metal-400" />,
    PAUSED: <AlertCircle className="w-5 h-5 text-brandos-neon-700" />,
  };

  const priorityColor = {
    P0: 'border-l-4 border-brandos-neon-400 bg-brandos-neon-400/5',
    P1: 'border-l-4 border-brandos-neon-500/60 bg-brandos-neon-400/3',
    P2: 'border-l-4 border-brandos-metal-500 bg-brandos-metal-500/5',
  };

  return (
    <Link href={`/projects/${slug}`}>
      <div
        className={`
          relative bg-gradient-to-br from-brandos-dark-700 to-brandos-dark-800
          rounded-lg border border-brandos-neon-400/20 hover:border-brandos-neon-400/60
          p-6 transition-all duration-300 cursor-pointer
          hover:shadow-neon-glow hover:bg-brandos-dark-700/90
          ${priorityColor[priority]}
        `}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern rounded-lg"></div>

        {/* Accent glow on hover */}
        <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-brandos-neon-400/0 via-brandos-neon-400/0 to-brandos-neon-400/0 group-hover:via-brandos-neon-400/10 transition-all opacity-0 hover:opacity-100"></div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1 font-mono">
                {name}
              </h3>
              <p className="text-brandos-neon-400/60 text-xs font-mono">
                {owner_name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {statusIcons[status]}
              <span
                className={`
                  text-xs font-mono px-2 py-1 rounded border
                  ${
                    category === 'INFRA'
                      ? 'border-brandos-neon-400/50 text-brandos-neon-400 bg-brandos-neon-400/10'
                      : 'border-brandos-teal-400/50 text-brandos-teal-300 bg-brandos-teal-400/10'
                  }
                `}
              >
                {category}
              </span>
            </div>
          </div>

          <p className="text-sm text-brandos-metal-300 mb-4 line-clamp-2 font-mono text-opacity-80">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-brandos-neon-400/10">
            <div className="text-xs text-brandos-metal-500 font-mono">
              {target_end_date
                ? new Date(target_end_date).toLocaleDateString('pt-BR')
                : 'No deadline'}
            </div>
            <div
              className={`
                text-sm font-bold font-mono
                ${
                  priority === 'P0'
                    ? 'text-brandos-neon-400'
                    : priority === 'P1'
                      ? 'text-brandos-neon-500/70'
                      : 'text-brandos-metal-500'
                }
              `}
            >
              {priority}
            </div>
          </div>
        </div>

        {/* Corner accent */}
        {status === 'ACTIVE' && (
          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-brandos-neon-400 animate-neon-pulse"></div>
        )}
      </div>
    </Link>
  );
};
