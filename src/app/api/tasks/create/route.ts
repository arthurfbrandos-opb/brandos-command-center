import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          project_id: body.project_id,
          sprint_id: body.sprint_id || null,
          title: body.title,
          description: body.description || null,
          task_type: body.task_type || 'TASK',
          status: body.status || 'BACKLOG',
          priority: body.priority || 'P1',
          effort_points: body.effort_points || null,
          assigned_to: body.assigned_to || null,
          due_date: body.due_date || null,
        },
      ])
      .select('*');

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating task:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}
