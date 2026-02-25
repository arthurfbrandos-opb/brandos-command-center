'use client';

import { FC, useState, useEffect } from 'react';
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

interface EditorialCalendarProps {
  projectId: string;
  limit?: number;
}

const PILLAR_COLORS = {
  Bastidor: 'bg-pink-100 text-pink-800',
  Framework: 'bg-blue-100 text-blue-800',
  Resultado: 'bg-green-100 text-green-800',
  Interação: 'bg-purple-100 text-purple-800',
};

export const EditorialCalendar: FC<EditorialCalendarProps> = ({ projectId, limit = 14 }) => {
  const [posts, setPosts] = useState<EditorialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [projectId]);

  const fetchPosts = async () => {
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
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Editorial Calendar</h2>
        <span className="ml-auto text-sm text-gray-500">{posts.length} posts</span>
      </div>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum post agendado</p>
          </div>
        ) : (
          posts.map((post) => {
            const pillarColor = PILLAR_COLORS[post.content_pillar as keyof typeof PILLAR_COLORS] || PILLAR_COLORS.Resultado;
            const publishDate = new Date(post.publish_date);
            const isPublished = post.is_published;

            return (
              <div
                key={post.id}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  isPublished ? 'bg-gray-50 border-gray-300' : 'bg-white border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {publishDate.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${pillarColor}`}>
                        {post.content_pillar}
                      </span>
                      {isPublished && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                          ✓ Published
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{post.content_type}</p>
                  </div>
                  <div className="ml-4">
                    {!isPublished && (
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
