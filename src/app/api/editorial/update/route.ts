import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('editorial_calendar')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*');

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error('Error updating editorial post:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update post' },
      { status: 500 }
    );
  }
}
