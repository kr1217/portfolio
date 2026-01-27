import { ProjectForm } from '@/components/admin/ProjectForm';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  
  let project;
  try {
      project = await Project.findById(id).lean();
  } catch (error) {
      notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <ProjectForm mode="edit" initialData={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
