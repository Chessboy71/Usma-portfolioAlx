import Image from 'next/image';
import Logo from '@/../../public/logo.png';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer>
      <div className="h-[5vh] w-screen bg-mainRed"></div>
      <div className="h-[5vh]"></div>
      <div className="w-screen  flex flex-row bg-mainRed justify-between overflow-x-hidden">
        <div className="flex flex-row items-center font-main text-3xl max-w-[35vw] gap-6">
          <Image
            src={Logo}
            alt="Main logo"
            className="mix-blend-lighten ml-6 w-auto p-1 h-[20vh]"
          />
          <h1>Union Sportive de la Médina d'Alger</h1>
        </div>
        <ul className="w-1/2 flex flex-row items-center gap-12 font-main justify-end text-xl pr-12 2xl:text-2xl">
          <li className='className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all'>
            <FaFacebook
              size={30}
              className="hover:h-[40px] hover:w-[40px] transition-all duration-100"
            />
          </li>
          <li className='className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all'>
            <FaInstagram
              size={30}
              className="hover:h-[40px] hover:w-[40px] transition-all duration-100"
            />
          </li>
          <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
            Accueil
          </li>
          <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
            FansShop
          </li>
          <li className="hover:text-2xl hover:text-mainBlack 2xl:hover:text-3xl transition-all">
            Blog
          </li>
        </ul>
      </div>
    </footer>
  );
};
