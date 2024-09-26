import Image from 'next/image';
import logo from '../../../../public/logo.png';
import { FaCartPlus } from 'react-icons/fa6';

const ShopNav = () => {
  return (
    <nav
      className="h-[15vh] w-full bg-transparent pr-12 pl-4 top-0 flex 
    justify-between items-center absolute z-20 transition-all duration-300 hover:bg-mainRed">
      <Image
        src={logo}
        alt="Site logo"
        className="h-full w-auto mix-blend-screen"
      />
      <FaCartPlus
        className="text-white hover:text-mainBlack hover:scale-125 transition-all duration-300"
        size={30}
      />
    </nav>
  );
};

export default ShopNav;
