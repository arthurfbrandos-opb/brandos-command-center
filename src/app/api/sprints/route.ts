import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');

  let query = supabaseAdmin.from('sprints').select('*').order('start_date', { ascending: false });
  if (project_id) query = query.eq('project_id', project_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, project_id, start_date, end_date, status } = body;

  if (!name || !project_id || !start_date || !end_date) {
    return NextResponse.json({ error: 'name, project_id, start_date e end_date são obrigatórios' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('sprints')
    .insert({ name, project_id, start_date, end_date, status: status || 'active' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
