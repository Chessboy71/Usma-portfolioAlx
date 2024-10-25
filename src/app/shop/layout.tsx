import ShopNav from './component/ShopNav';
import ShopFooter from './component/ShopFooter';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function shopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-x-hidden bg-white relative">
      <Toaster />
      <ShopNav />
      {children}
      <ShopFooter />
    </div>
  );
}
