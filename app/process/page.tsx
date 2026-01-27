'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Search, FileText, Code2, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discovery & Strategy',
    description: 'We start with a deep dive into your business goals, target audience, and technical requirements. I ask the right questions to ensure we build exactly what you need.',
    icon: Search,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    id: '02',
    title: 'Proposal & Roadmap',
    description: 'I provide a detailed project roadmap, timeline, and fixed-price quote. No hidden costs or surprises—you’ll know exactly what to expect before we start.',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    id: '03',
    title: 'Development & Updates',
    description: 'I build your application using modern, scalable tech. You get regular updates and demo links so you can see progress in real-time, not just at the end.',
    icon: Code2,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  },
  {
    id: '04',
    title: 'Review & Refinement',
    description: 'We test everything rigorously. I incorporate your feedback to polish the UI/UX and ensure every feature works flawlessly across all devices.',
    icon: MessageSquare,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    id: '05',
    title: 'Launch & Support',
    description: 'I handle the deployment to your server or cloud provider. Post-launch, I provide 30 days of support to ensure meaningful stability and peace of mind.',
    icon: Rocket,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            How I Work
          </h1>
          <p className="text-lg text-muted-foreground">
            A transparent, professional process designed to deliver high-quality results without the stress.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={step.id} className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Center Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background bg-primary z-10 items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-background" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                   <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${step.color}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                         <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Step {step.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                   </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
           <div className="bg-muted/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to start your project?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Now that you know how I work, let's discuss your ideas and put this process into motion.
              </p>
              <Button size="lg" className="rounded-full px-8 h-12 text-base" href="/contact">
                Start a Conversation
              </Button>
           </div>
        </div>

      </Container>
    </div>
  );
}
