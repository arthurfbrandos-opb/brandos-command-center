import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify cron secret
function verifyCronSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;

  if (!authHeader || !secret) {
    return false;
  }

  return authHeader === `Bearer ${secret}`;
}

export async function POST(req: NextRequest) {
  // Verify request is from cron service
  if (!verifyCronSecret(req)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    // Get all projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, category');

    if (projectsError) throw projectsError;

    const snapshots = [];

    for (const project of projects || []) {
      if (project.category === 'INFRA') {
        // Calculate INFRA metrics
        const { data: completedTasks } = await supabase
          .from('tasks')
          .select('effort_points')
          .eq('project_id', project.id)
          .eq('status', 'DONE')
          .gte('completed_at', today);

        const taskCount = completedTasks?.length || 0;
        const storyPoints = completedTasks?.reduce((sum, t) => sum + (t.effort_points || 0), 0) || 0;

        snapshots.push({
          project_id: project.id,
          snapshot_date: today,
          tasks_completed: taskCount,
          story_points_completed: storyPoints,
          velocity: storyPoints / 5 || 0, // Rough velocity calc
        });
      } else if (project.category === 'STRATEGY') {
        // Calculate STRATEGY metrics
        const { data: publishedPosts } = await supabase
          .from('editorial_calendar')
          .select('likes, comments, shares, views')
          .eq('project_id', project.id)
          .eq('is_published', true)
          .gte('published_at', today);

        const postCount = publishedPosts?.length || 0;
        const totalLikes = publishedPosts?.reduce((sum, p) => sum + (p.likes || 0), 0) || 0;
        const avgEngagement = postCount > 0 ? (totalLikes / (postCount * 10)) * 100 : 0;

        snapshots.push({
          project_id: project.id,
          snapshot_date: today,
          posts_published: postCount,
          total_likes: totalLikes,
          avg_engagement_rate: avgEngagement,
        });
      }
    }

    // Insert snapshots
    const { error: insertError } = await supabase
      .from('kpi_snapshots')
      .insert(snapshots);

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      message: `Created ${snapshots.length} KPI snapshots`,
      snapshots,
    });
  } catch (err: any) {
    console.error('Error updating KPI snapshots:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update KPI snapshots' },
      { status: 500 }
    );
  }
}
