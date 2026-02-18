import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/session';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    return token && (await verifyToken(token));
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await connectToDatabase();
  try {
    const body = await req.json();
    console.log("PUT /api/projects/[id] body:", body);
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    
    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Revalidate paths to show changes immediately
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/admin');
    revalidatePath('/');

    // --- Auto-Sync to Resume ---
    try {
        const { syncProjectToResume } = await import('@/lib/resume-sync');
        await syncProjectToResume({
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            slug: project.slug
        });
    } catch (syncError) {
        console.error('[Auto-Sync] Failed to update resume during project update:', syncError);
    }
    // ---------------------------
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await connectToDatabase();
  try {
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
