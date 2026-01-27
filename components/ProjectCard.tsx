import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { IProjectData } from '@/models/Project';
import { getTechBadgeColor } from '@/lib/techColors';

interface ProjectCardProps {
  project: Partial<IProjectData>;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Use placeholder if no image provided
  const imageUrl = project.images && project.images.length > 0 
    ? project.images[0] 
    : 'https://placehold.co/600x400';

  // Calculate time ago roughly or just show date
  const date = new Date(project.createdAt || Date.now());
  const timeAgo = (() => {
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  })();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.2)] hover:-translate-y-2">
      <div className="aspect-video w-full overflow-hidden bg-muted relative">
        <Image
          src={imageUrl}
          alt={project.title || 'Project Image'}
          width={600}
          height={400}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Overlay - Always dark, so button should be light for contrast */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <div className="bg-white text-black rounded-full px-6 py-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-bold flex items-center gap-2">
                    View Case Study <ArrowRight className="h-4 w-4" />
                </span>
             </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`}>
              <span className="absolute inset-0" />
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        
        <div className="mt-8">
             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4 opacity-80">
                <time dateTime={date.toISOString()} className="flex items-center gap-1">
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {timeAgo}
                </time>
             </div>
             <div className="flex flex-wrap gap-2">
                {project.techStack?.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTechBadgeColor(tech)} border border-transparent`}
                    >
                      {tech}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
