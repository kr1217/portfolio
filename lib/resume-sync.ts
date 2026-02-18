import connectToDatabase from './db';
import Resume from '../models/Resume';
import { revalidatePath } from 'next/cache';

export async function syncProjectToResume(project: {
  title: string;
  description: string;
  techStack: string[];
  slug: string;
}) {
  await connectToDatabase();
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
        console.warn('[Auto-Sync] No resume found to sync with.');
        return;
    }

    // 1. Sync Tech Stack (Add new skills with case-insensitive check)
    const newTechItems = project.techStack || [];
    if (newTechItems.length > 0) {
      const currentSkillsLowercase = new Set((resume.skills || []).map((s: string) => s.toLowerCase()));
      let skillsUpdated = false;
      
      newTechItems.forEach((skill: string) => {
        if (!currentSkillsLowercase.has(skill.toLowerCase())) {
          resume.skills.push(skill);
          currentSkillsLowercase.add(skill.toLowerCase());
          skillsUpdated = true;
        }
      });
    }

    // 2. Add or Update Project in Resume
    if (!resume.projects) resume.projects = [];
    
    const existingProjectIndex = resume.projects.findIndex((p: any) => p.title === project.title);
    
    const projectEntry = {
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      link: `/projects/${project.slug}`
    };

    if (existingProjectIndex !== -1) {
      // Update existing project entry
      resume.projects[existingProjectIndex] = projectEntry;
    } else {
      // Add new project to the top of the list
      resume.projects.unshift(projectEntry);
    }

    await resume.save();
    console.log(`[Auto-Sync] Successfully synced project: ${project.title}`);

    // 3. Revalidate paths to reflect changes immediately
    try {
        revalidatePath('/resume');
        revalidatePath('/projects');
        revalidatePath('/');
    } catch (revalidateError) {
        // revalidatePath might fail if called outside of a request context (e.g., in a script)
        console.log('[Auto-Sync] Revalidation skipped or failed (likely not in request context)');
    }
    
  } catch (error) {
    console.error('[Auto-Sync] Failed to sync project to resume:', error);
    // We don't necessarily want to crash the whole process, but we log it
  }
}
