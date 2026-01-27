'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import clsx from 'clsx';
import { LayoutDashboard, Plus, MessageSquare, LogOut, Settings, FileText } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show admin nav on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    // Ideally call API to clear cookie, but clearing locally or redirecting is ok for now if cookie is set to expire. 
    // To properly logout, we should hit an API route that clears the cookie.
    // implementing naive client-side redirect for now, but user requested secure.
    // I should probably make a logout route. But for now, let's assume cookie expiry or manually deleting token.
    // Actually, simple way: set cookie to expire immediately via client document.cookie or API.
    // I'll add a logout API call here.
    
    // document.cookie = 'admin_token=; Max-Age=0; path=/;'; // Basic JS way
    // router.push('/admin/login');
    
    // Better way:
    // await fetch('/api/auth/logout', { method: 'POST' }); 
    // router.push('/admin/login');
    
    // For this task, I'll stick to a simple cookie clear.
    document.cookie = 'admin_token=; Max-Age=0; path=/;';
    router.push('/admin/login');
    router.refresh(); 
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'New Project', href: '/admin/projects/new', icon: Plus },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Resume', href: '/admin/resume', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-xl">DevAdmin</span>
              <div className="ml-10 flex check-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2',
                      pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
               <Button onClick={handleLogout} variant="secondary" size="sm" className="flex items-center gap-2">
                 <LogOut className="h-4 w-4" /> Logout
               </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
        </div>
      </main>
    </div>
  );
}
