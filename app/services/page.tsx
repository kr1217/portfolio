import { Container } from '@/components/ui/Container';
import { Code, Database, Globe, Brain } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | DevPortfolio',
  description: 'Full-stack web development, API design, and AI implementation services.',
};

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'End-to-end web application development using the MERN stack (MongoDB, Express, React, Node.js) and Next.js. I build responsive, accessible, and performant user interfaces backed by robust APIs.',
    icon: Globe,
  },
  {
    title: 'API Development & Integration',
    description: 'Designing RESTful and GraphQL APIs that are secure, scalable, and well-documented. Integration with third-party services like Stripe, Auth0, and AWS.',
    icon: Database,
  },
  {
    title: 'Python & AI Systems',
    description: 'Leveraging Python for data analysis, automation scripts, and integrating AI/ML models into web applications. Experience with TensorFlow and OpenAI APIs.',
    icon: Brain,
  },
  {
    title: 'Code Review & Consultation',
    description: 'Providing technical audits, code reviews, and architectural advice to ensure your codebase is clean, maintainable, and production-ready.',
    icon: Code,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Expertise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technical Services for Modern Businesses
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I deliver high-quality software solutions tailored to your specific needs. 
            No buzzwords, just code that works and scales.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary">
                    <service.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
