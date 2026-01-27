import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Project, { IProjectData } from '@/models/Project';
import connectToDatabase from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await connectToDatabase();
  const { slug } = await params;
  const project = await Project.findOne({ slug }).lean();
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | DevPortfolio`,
    description: project.description,
  };
}

async function getProject(slug: string) {
  await connectToDatabase();
  try {
    const project = await Project.findOne({ slug }).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: IProjectData | null = await getProject(slug) as IProjectData | null;

  if (!project) {
    notFound();
  }

  const imageUrl = project.images && project.images.length > 0 
    ? project.images[0] 
    : 'https://placehold.co/800x600';

  return (
    <div className="bg-background py-16 sm:py-24">
      <Container>
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            <div>
               <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">{project.title}</h1>
               <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map(tech => (
                     <span key={tech} className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary">
                        {tech}
                     </span>
                  ))}
               </div>
               
               <div className="prose prose-lg text-muted-foreground mb-10">
                 <p>{project.description}</p>
                 
                 <h3 className="text-foreground font-semibold mt-8 mb-4">The Problem</h3>
                 <p>{project.problem}</p>
                 
                 <h3 className="text-foreground font-semibold mt-8 mb-4">The Solution</h3>
                 <p>{project.solution}</p>
               </div>

               <div className="flex gap-4">
                  {project.githubUrl && (
                    <Button href={project.githubUrl} variant="outline">
                        <Github className="mr-2 h-4 w-4" /> View Code
                    </Button>
                  )}
                  {project.liveDemoUrl && (
                    <Button href={project.liveDemoUrl}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Visit Live Demo
                    </Button>
                  )}
               </div>

               {project.videoUrl && (
                <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
                    <div className="p-4 border-b border-border">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Project Demo
                        </h3>
                    </div>
                    <div className="aspect-video bg-black relative">
                        <video 
                            src={project.videoUrl} 
                            controls 
                            className="w-full h-full"
                            // poster={project.images?.[0] || ''} 
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
              )}
            </div>
            
            <div className="mt-10 lg:mt-0">
               <div className="rounded-2xl overflow-hidden bg-muted shadow-xl ring-1 ring-border">
                  <Image 
                     src={imageUrl} 
                     alt={project.title} 
                     width={800} 
                     height={600} 
                     className="w-full h-full object-cover"
                  />
               </div>
               
               {/* Optional: Add a carousel helper if multiple images exist */}
            </div>
        </div>

        {/* Image Gallery Section */}
        {project.images && project.images.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8">Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.images.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-border aspect-[16/9] bg-muted">
                   <Image 
                     src={image} 
                     alt={`${project.title} screenshot ${index + 1}`} 
                     width={800} 
                     height={600} 
                     className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
                   />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
