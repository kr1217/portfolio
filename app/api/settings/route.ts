import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Settings from '@/models/Settings';
import { verifyToken } from '@/lib/session';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    return token && (await verifyToken(token));
}

export async function GET() {
  await connectToDatabase();
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
        settings = await Settings.create({ isAvailable: true });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  try {
    const body = await req.json();
    const settings = await Settings.findOneAndUpdate({}, { isAvailable: body.isAvailable }, { upsert: true, new: true });
    
    // Revalidate home page
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/');

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
