'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import clsx from 'clsx';
import { LayoutDashboard, Plus, Settings, FileText, LogOut } from 'lucide-react';

export default function AdminLayoutClient({
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
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950">
      <nav className="bg-gray-800 text-white shadow-md dark:bg-zinc-900 border-b border-white/10">
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
                      'px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors',
                      pathname === item.href
                        ? 'bg-gray-900 text-white dark:bg-zinc-800'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-zinc-800'
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
