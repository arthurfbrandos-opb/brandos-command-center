import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  const sprint_id = searchParams.get('sprint_id');
  const status = searchParams.get('status');

  let query = supabaseAdmin.from('tasks').select('*').order('created_at', { ascending: false });

  if (project_id) query = query.eq('project_id', project_id);
  if (sprint_id) query = query.eq('sprint_id', sprint_id);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, project_id, sprint_id, status, priority, assignee, deadline } = body;

  if (!title || !project_id) {
    return NextResponse.json({ error: 'title e project_id são obrigatórios' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .insert({
      title,
      description,
      project_id,
      sprint_id: sprint_id || null,
      status: status || 'todo',
      priority: priority || 'medium',
      assignee: assignee || null,
      deadline: deadline || null,
      created_by: 'arthur',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
