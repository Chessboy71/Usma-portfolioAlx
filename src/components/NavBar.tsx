'use client';
import Image from 'next/image';
import Logo from '@/../../public/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const path = usePathname();
  return (
    <nav className="w-screen h-[15vh] flex flex-row bg-mainRed my-4 justify-between overflow-x-hidden">
      <Image
        src={Logo}
        alt="Main logo"
        className="mix-blend-lighten ml-6 w-auto p-1"
      />
      <ul className="w-1/2 flex flex-row items-center gap-12 font-main justify-end text-xl pr-12 2xl:text-2xl">
        <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
          <Link href="/" className={path === '/' ? 'text-mainBlack' : ''}>
            Accueil
          </Link>
        </li>
        <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
          <Link
            href="/shop"
            className={path === '/shop' ? 'text-mainBlack' : ''}>
            FansShop
          </Link>
        </li>

        <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
          Blog
        </li>
      </ul>
    </nav>
  );
};
