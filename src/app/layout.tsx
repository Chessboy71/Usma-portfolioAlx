import type { Metadata } from 'next';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { ToasterProvider } from '../../providers/toast-provider';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
