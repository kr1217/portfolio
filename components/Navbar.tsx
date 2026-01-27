'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { Button } from './ui/Button';
import { ModeToggle } from '@/components/mode-toggle';
import clsx from 'clsx';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-border/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Code className="w-6 h-6 text-white" />
             </div>
             <span className="font-bold text-xl tracking-tight">Fazeel.Dev</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Projects
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/resume" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Resume
            </Link>
            <Link href="/process" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Process
            </Link>
            <Link href="/reviews" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Reviews
            </Link>
             <div className="pl-4 border-l border-border ml-2 flex items-center gap-4">
                <ModeToggle />
                <Button href="/contact" size="sm" className="rounded-full px-6 shadow-md">
                    Contact
                </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
            <Link
              href="/about"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/services"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/resume"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </Link>
            <Link
              href="/process"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="/reviews"
              className="text-left px-4 py-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </Link>
             <div className="flex items-center justify-between px-4 py-2">
               <span className="text-sm font-medium text-muted-foreground">Theme</span>
               <ModeToggle />
            </div>
            <Link
              href="/contact"
              className="text-left px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-4 text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
             <Link 
                href="/admin/login"
                className="text-center mt-2 text-xs text-muted-foreground/50 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
            >
                Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
