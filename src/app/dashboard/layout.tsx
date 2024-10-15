import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import DashboardNavBar from './components/DashboardNavBar';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import logo from '@/../../public/logo.png';
import Image from 'next/image';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white font-pop text-slate-950">
        <Toaster />
        <SignedOut>
          <div className="flex flex-col h-screen w-screen bg-mainBlack text-mainRed items-center justify-center">
            <Image
              src={logo}
              alt="site logo"
              height={100}
              className="mix-blend-lighten absolute top-10"
            />
            <div className="h-1/2 w-screen bg-white bg-opacity-10 flex flex-col items-center justify-center gap-4">
              <h1 className="text-xl font-bold text-white">
                You are not currently signed in
              </h1>
              <div>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-mainRed hover:text-white w-24">
                  <SignInButton />
                </Button>
              </div>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <DashboardNavBar />
          {children}
        </SignedIn>
      </body>
    </html>
  );
}
