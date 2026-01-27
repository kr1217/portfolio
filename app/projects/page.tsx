import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ProjectCard';
import Project, { IProjectData } from '@/models/Project';
import connectToDatabase from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | DevPortfolio',
  description: 'Case studies and technical projects demonstrating full-stack capabilities.',
};

async function getProjects() {
  await connectToDatabase();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

// Ensure the page is dynamic to fetch latest projects
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-500">Portfolio</h2>
          <p className="mt-2 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
            Recent Projects & Case Studies
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
             A collection of my recent work in web development and AI systems.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {projects.length > 0 ? (
              projects.map((project: IProjectData) => (
                <ProjectCard key={String(project._id)} project={project} />
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-2">
                No projects found.
              </p>
            )}
        </div>
      </Container>
    </div>
  );
}
