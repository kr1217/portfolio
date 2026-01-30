import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/session';
import { cookies } from 'next/headers';

// Helper to check auth
async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    return token && (await verifyToken(token));
}

export async function GET() {
  await connectToDatabase();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  try {
    const body = await req.json();
    const project = await Project.create(body);

    // --- Auto-Sync to Resume ---
    try {
        const Resume = (await import('@/models/Resume')).default;
        const resume = await Resume.findOne().sort({ createdAt: -1 });
        
        if (resume) {
            // 1. Sync Tech Stack (Add new skills)
            const newSkills = body.techStack || [];
            if (newSkills.length > 0) {
                const currentSkills = new Set(resume.skills || []);
                let skillsUpdated = false;
                
                newSkills.forEach((skill: string) => {
                    if (!currentSkills.has(skill)) {
                        currentSkills.add(skill);
                        skillsUpdated = true;
                    }
                });
                
                if (skillsUpdated) {
                    resume.skills = Array.from(currentSkills);
                }
            }

            // 2. Add Project to Resume
            if (!resume.projects) resume.projects = [];
            resume.projects.unshift({
                title: body.title,
                description: body.description, // Use the short description
                techStack: body.techStack,
                link: `/projects/${body.slug}`
            });

            await resume.save();
            console.log(`[Auto-Sync] Updated Resume with project: ${body.title}`);
        }
    } catch (syncError) {
        console.error('[Auto-Sync] Failed to update resume:', syncError);
        // We don't block the response, just log the error
    }
    // ---------------------------

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
