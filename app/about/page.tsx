import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | DevPortfolio',
  description: 'Professional background and skills of a full-stack web developer.',
};

export default function AboutPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About Me</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I am Fazeel Mehdi, an experienced Full-Stack Developer with a strong foundation in Computer Science. I combine technical expertise with hands-on experience in MERN stack development and Python automation.
            <br /><br />
            My journey includes impactful contributions at Signature Technologies and iFish Technologies, where I honed my skills in both frontend design and backend logic. Currently, I deliver high-quality freelance solutions for clients globally.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="flex flex-wrap gap-4 text-base font-semibold leading-7 text-foreground">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
              Available for Hire
            </span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              Based in Pakistan / Remote
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
              Full-Stack / AI
            </span>
          </div>

          <div className="mt-10 border-t border-border pt-10 sm:mt-16 sm:pt-16">
            <h3 className="text-2xl font-bold leading-9 tracking-tight text-foreground">Technical Skills</h3>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors">
                <h4 className="text-lg font-semibold text-primary">Frontend</h4>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Redux / Zustand</li>
                  <li>HTML5 / CSS3</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors">
                <h4 className="text-lg font-semibold text-primary">Backend</h4>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>Node.js / Express</li>
                  <li>MongoDB / Mongoose</li>
                  <li>PostgreSQL / Prisma</li>
                  <li>RESTful APIs</li>
                  <li>Authentication (Auth0/NextAuth)</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors">
                <h4 className="text-lg font-semibold text-primary">AI & Tools</h4>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>Python</li>
                  <li>TensorFlow / PyTorch</li>
                  <li>Git / GitHub</li>
                  <li>Docker</li>
                  <li>AWS / Vercel</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-primary/5 rounded-3xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Freelance Services</h3>
            <p className="text-muted-foreground mb-6">
              I offer professional MERN Stack development services on Fiverr, specializing in building modern, scalable, and high-performance web applications. Whether you need a full-scale platform or a specific feature enhancement, I am here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="http://www.fiverr.com/s/AyADNL3" size="lg" className="rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                Hire me on Fiverr
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="rounded-full">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
