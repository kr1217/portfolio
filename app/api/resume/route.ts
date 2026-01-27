import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import { verifyToken } from '@/lib/session';

export async function GET() {
  await connectToDatabase();
  const resume = await Resume.findOne().sort({ createdAt: -1 }); // Get latest
  return NextResponse.json(resume);
}

export async function PUT(req: Request) {
    // Auth Check
    const token = req.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    // Upsert the single resume document
    const resume = await Resume.findOneAndUpdate({}, body, { upsert: true, new: true });
    
    return NextResponse.json(resume);
}
