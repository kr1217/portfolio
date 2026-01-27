import { Metadata } from 'next';
import AdminLayoutClient from '@/components/layouts/AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
