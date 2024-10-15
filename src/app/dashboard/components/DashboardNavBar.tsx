'use client';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardNavBar = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/dashboard/billboards`,
      label: 'Billboards',
      active: pathname === `/dashboard/billboards`,
    },
    {
      href: `/dashboard/categories`,
      label: 'Categories',
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/products`,
      label: 'Products',
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: 'Orders',
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/settings`,
      label: 'Parametres',
      active: pathname === `/dashboard/settings`,
    },
  ];
  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 justify-center gap-8">
        <nav className="flex gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-bold font-pop transition-colors hover:text-primary',
                route.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground'
              )}>
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4 scale-150 mr-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
