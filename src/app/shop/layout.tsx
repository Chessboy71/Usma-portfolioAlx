import ShopNav from './component/ShopNav';
import ShopFooter from './component/ShopFooter';
import React from 'react';

export default function shopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-x-hidden bg-white">
      <ShopNav />
      {children}
      <ShopFooter />
    </div>
  );
}
