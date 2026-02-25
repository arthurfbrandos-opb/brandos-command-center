'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Loader } from 'lucide-react';

interface EditorialPost {
  id: string;
  publish_date: string;
  publish_day: string;
  title: string;
  content_pillar: string;
  content_type: string;
  is_published: boolean;
}

interface EditorialCalendarBrandOSProps {
  projectId: string;
  limit?: number;
}

const PILLAR_COLORS = {
  Bastidor: 'border-l-brandos-neon-400 text-brandos-neon-400',
  Framework: 'border-l-brandos-teal-400 text-brandos-teal-300',
  Resultado: 'border-l-brandos-neon-300 text-brandos-neon-300',
  Interação: 'border-l-brandos-metal-500 text-brandos-metal-400',
};

export const EditorialCalendarBrandOS: FC<EditorialCalendarBrandOSProps> = ({ projectId, limit = 14 }) => {
  const [posts, setPosts] = useState<EditorialPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('editorial_calendar')
        .select('*')
        .eq('project_id', projectId)
        .gte('publish_date', new Date().toISOString().split('T')[0])
        .order('publish_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-brandos-neon-400" />
      </div>
    );
  }

  return (
    <div className="bg-brandos-dark-800 rounded-lg p-6 border border-brandos-neon-400/20">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-brandos-neon-400" />
        <h2 className="text-xl font-bold text-white font-mono">Editorial Calendar</h2>
        <span className="ml-auto text-sm text-brandos-metal-500 font-mono">{posts.length} posts</span>
      </div>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-brandos-metal-500 font-mono">
            <p>Nenhum post agendado</p>
          </div>
        ) : (
          posts.map((post) => {
            const pillarColor = PILLAR_COLORS[post.content_pillar as keyof typeof PILLAR_COLORS] || PILLAR_COLORS.Resultado;
            const publishDate = new Date(post.publish_date);

            return (
              <div
                key={post.id}
                className={`border-l-2 border rounded-lg p-4 hover:shadow-neon-glow-sm transition-all ${pillarColor} ${
                  post.is_published ? 'bg-brandos-dark-900/50 opacity-70' : 'bg-gradient-to-r from-brandos-dark-700 to-brandos-dark-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono font-bold text-white">
                        {publishDate.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-sm font-mono font-bold ${pillarColor}`}>
                        {post.content_pillar}
                      </span>
                      {post.is_published && (
                        <span className="text-xs px-2 py-1 rounded-sm bg-brandos-neon-400/20 text-brandos-neon-400 font-mono font-bold">
                          ✓ PUBLISHED
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-white font-bold">{post.title}</p>
                    <p className="text-xs text-brandos-metal-500 mt-1 font-mono">{post.content_type}</p>
                  </div>
                  {!post.is_published && (
                    <div className="w-2 h-2 rounded-full bg-brandos-neon-400 animate-neon-pulse ml-4"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
