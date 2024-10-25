'use client';

import Image from 'next/image';
import logo from '../../../../public/logo.png';
import { FaCartPlus } from 'react-icons/fa6';
import { useState } from 'react';
import { useEffect } from 'react';

const ShopNav = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full pr-12 pl-4 top-0 flex justify-between items-center fixed z-50 transition-all duration-300 
      ${scrolled ? 'h-[10vh] bg-mainRed' : 'h-[15vh] bg-transparent'}`}>
      <Image
        src={logo}
        alt="Site logo"
        className="h-3/4 lg:h-full w-auto mix-blend-screen"
      />
      <FaCartPlus
        className="text-white hover:text-mainBlack hover:scale-125 transition-all duration-300"
        size={30}
      />
    </nav>
  );
};

export default ShopNav;
