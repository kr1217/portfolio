import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fazeeldev.vercel.app';

  // 1. Static Routes
  const routes = [
    '',
    '/projects',
    '/resume',
    '/contact',
    '/reviews',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Project Routes
  try {
    await connectToDatabase();
    const projects = await Project.find({}).select('slug createdAt');
    
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.createdAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error('Failed to generate project sitemap:', error);
    return routes;
  }
}
