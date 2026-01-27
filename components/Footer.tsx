import Link from 'next/link';
import { Container } from './ui/Container';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <Container className="py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://github.com/kr1217" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://www.linkedin.com/in/fazeel-mehdi-12b988210" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="mailto:fmehdi1217@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            <Link href="/admin" className="hover:text-foreground transition-colors" aria-label="Admin Access">
              &copy;
            </Link> {new Date().getFullYear()} DevPortfolio. All rights reserved. 
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
