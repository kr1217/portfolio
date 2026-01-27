import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import connectToDatabase from '@/lib/db';
import Project, { IProject } from '@/models/Project';
import Contact, { IContact } from '@/models/Contact';
import { Plus, Pencil, Trash2, Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import clsx from 'clsx';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProjects() {
  await connectToDatabase();
  return Project.find({}).sort({ createdAt: -1 }).lean();
}

async function getMessages() {
  await connectToDatabase();
  return Contact.find({}).sort({ createdAt: -1 }).limit(50).lean();
}

async function deleteProject(id: string) {
  'use server';
  try {
     await connectToDatabase();
     await Project.findByIdAndDelete(id);
     revalidatePath('/admin');
     revalidatePath('/projects');
     revalidatePath('/'); // Revalidate home for featured
  } catch (e) {
     console.error("Delete failed", e);
  }
}

export default async function AdminDashboard() {
  const projects = await getProjects();
  const messages = await getMessages();

  return (
    <div className="space-y-12">
      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Projects
          </h2>
          <Button href="/admin/projects/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Project
          </Button>
        </div>

        <div className="overflow-hidden bg-card shadow sm:rounded-md border border-border">
          <ul role="list" className="divide-y divide-border">
            {projects.length > 0 ? (
              projects.map((project: any) => (
                <li key={project._id.toString()}>
                  <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        {project.images && project.images[0] && (
                            <img src={project.images[0]} alt="" className="h-12 w-16 object-cover rounded" />
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-medium text-primary">{project.title}</p>
                                {project.featured && (
                                    <span className="inline-flex items-center rounded-md bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300 ring-1 ring-inset ring-yellow-600/20">Featured</span>
                                )}
                            </div>
                            <p className="flex text-xs text-muted-foreground">
                                /{project.slug}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button href={`/admin/projects/${project._id}`} variant="outline" size="sm" className="flex items-center px-2 py-1">
                         <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <form action={deleteProject.bind(null, project._id.toString())}>
                        <button type="submit" className="text-destructive hover:text-destructive/80 p-2">
                            <Trash2 className="h-5 w-5" />
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-muted-foreground">No projects yet.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <MessageSquareIcon className="h-6 w-6 text-muted-foreground" />
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Recent Messages
          </h2>
        </div>
        
        <div className="overflow-hidden bg-card shadow sm:rounded-md border border-border">
           <ul role="list" className="divide-y divide-border">
             {messages.length > 0 ? (
                messages.map((msg: any) => (
                    <li key={msg._id.toString()} className="px-4 py-4 sm:px-6 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-semibold text-foreground">{msg.name}</h3>
                            <time className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</time>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{msg.email}</p>
                        <p className="text-sm text-foreground/80 whitespace-pre-wrap">{msg.message}</p>
                    </li>
                ))
             ) : (
                <li className="px-4 py-8 text-center text-muted-foreground">No messages yet.</li>
             )}
           </ul>
        </div>
      </div>
    </div>
  );
}

function MessageSquareIcon(props: any) {
    return <Mail {...props} />
}
