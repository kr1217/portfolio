import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ProjectCard';
import Project, { IProjectData } from '@/models/Project';
import connectToDatabase from '@/lib/db';
import Link from 'next/link';
import { getTechBadgeColor } from '@/lib/techColors';

async function getFeaturedProjects() {
  await connectToDatabase();
  // Using lean() for better performance as we just need plain objects
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 }).limit(3).lean();
    // Convert _id and dates to string/number for serialization if strictly needed, 
    // but Next.js 14 handles simple objects well. Mongoose documents need serialization.
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

import Review from '@/models/Review';

async function getReviews() {
  await connectToDatabase();
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}

import Settings from '@/models/Settings';

async function getAvailability() {
  await connectToDatabase();
  try {
    const settings = await Settings.findOne({});
    // Default to true if no settings exist yet
    return settings ? settings.isAvailable : true;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return true; // Safe default
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const reviews = await getReviews();
  const isAvailable = await getAvailability();

  // Calculate Average Rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   {isAvailable ? (
                    <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Available for Freelance Projects
                    </div>
                   ) : (
                    <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-full text-sm font-semibold mb-4">
                        Currently Booked
                    </div>
                   )}
                   <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                      Hi, I'm{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Fazeel Mehdi
                      </span>
                   </h1>
                   <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl font-normal">
                      Full-Stack Developer with 2+ years of experience. I specialize in building efficient, scalable solutions using the MERN stack, Next.js, and Python.
                   </p>
                   <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-medium transition-all duration-200">
                        Start a Conversation <span className="ml-2">→</span>
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-full px-8 border-border hover:bg-accent hover:border-accent/50 transition-all duration-200" href="/resume">
                        View Resume
                      </Button>
                   </div>
                </div>
                <div className="relative">
                   <div className="relative z-10 p-2 bg-white/20 backdrop-blur-sm rounded-3xl">
                      <img
                        src="/hero-avatar.png"
                        alt="Fazeel Mehdi - Full Stack Developer"
                        className="rounded-2xl shadow-2xl w-full aspect-square object-cover"
                      />
                   </div>
                   <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-30" />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-border pt-12">
               {[
                  { label: "Years Experience", value: "2+", color: "text-foreground" },
                  { label: "Projects Completed", value: "15+", color: "text-foreground" },
                  { label: "Client Satisfaction", value: "100%", color: "text-emerald-500" },
                  { label: "Tech Stack", value: "MERN", color: "text-blue-600" }
               ].map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                      <div className={`text-4xl font-display font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
               ))}
            </div>
        </Container>
      </section>
      
      {/* Trust Strip - Audit Reccomendation: "Clarity before cleverness" */}
      <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm py-10">
        <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="md:w-1/3">
                     <h3 className="text-lg font-display font-semibold text-foreground">Specializing In</h3>
                     <p className="text-sm text-muted-foreground mt-1">High-performance scalable systems</p>
                </div>
                <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                     {['Next.js', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS'].map(tech => {
                         // Extract the text-color part from the badge style for the hover effect
                         // e.g. "bg-blue-100 text-blue-800 ..." -> "hover:text-blue-800"
                         const badgeClass = getTechBadgeColor(tech);
                         const textColorMatch = badgeClass.match(/text-([a-z]+)-[0-9]+/);
                         const hoverClass = textColorMatch ? `hover:${textColorMatch[0]}` : 'hover:text-foreground';
                         
                         return (
                             <span key={tech} className={`text-xl font-display font-bold text-foreground cursor-default transition-colors duration-300 ${hoverClass}`}>
                                 {tech}
                             </span>
                         );
                     })}
                </div>
            </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A showcase of my recent work and successful client collaborations
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project: IProjectData) => (
                <ProjectCard key={String(project._id)} project={project} />
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-2">
                No featured projects found.
              </p>
            )}
          </div>
          <div className="mt-16 flex justify-center">
             <Button href="/projects" size="lg" className="rounded-full px-8">View All Projects</Button>
          </div>
        </Container>
      </section>

      {/* Client Reviews Section (Dynamic) */}
      <section className="py-24 sm:py-32">
        <Container>
            <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Client Reviews</h2>
                
                {reviews.length > 0 && (
                   <div className="mt-4 flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                         <span className="text-2xl font-bold text-foreground">{averageRating}</span>
                         <div className="flex text-yellow-400">
                             {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                         </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Average based on {reviews.length} reviews</p>
                   </div>
                )}
                
                <p className="mt-4 text-lg text-muted-foreground">
                  {!reviews.length ? "Be the first to leave a review!" : "What clients say about working with me"}
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {reviews.length > 0 ? (
                    reviews.map((review: any, index: number) => (
                        <div key={review._id || index} className="flex flex-col justify-between rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border">
                            <div className="mb-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
                                <p className="text-lg font-medium text-foreground italic relative z-10">
                                    "{review.comment}"
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                                         <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? 'from-indigo-400 to-purple-400' : 'from-orange-400 to-red-400'}`}></div>
                                         <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                             {review.name.charAt(0)}
                                         </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm">{review.name}</h4>
                                        {review.company && <p className="text-xs text-muted-foreground">{review.company}</p>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground">
                                       {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                     <div className="col-span-2 text-center py-12 bg-muted/20 rounded-3xl border border-dashed border-border">
                         <p className="text-muted-foreground">No reviews yet. Why not submit one?</p>
                         <Button variant="ghost" href="/reviews" className="mt-2 text-primary hover:text-primary/80 hover:bg-transparent p-0 underline-offset-4 hover:underline">Leave a Review</Button>
                    </div>
                )}
            </div>
        </Container>
      </section>
    </div>
  );
}
