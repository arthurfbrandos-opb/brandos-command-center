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
      .from('editorial_calendar')
      .insert([
        {
          project_id: body.project_id,
          publish_date: body.publish_date,
          publish_day: body.publish_day,
          publish_time: body.publish_time || null,
          title: body.title,
          description: body.description || null,
          content_pillar: body.content_pillar,
          content_type: body.content_type || 'POST',
          is_scheduled: body.is_scheduled || false,
          is_published: body.is_published || false,
          caption: body.caption || null,
          hashtags: body.hashtags || null,
        },
      ])
      .select('*');

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating editorial post:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}
