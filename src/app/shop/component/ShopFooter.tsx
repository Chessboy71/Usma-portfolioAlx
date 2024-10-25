import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa6';

const ShopFooter = () => {
  return (
    <div className="h-[15vh] bg-mainBlack flex justify-center mt-12">
      <h2 className="font-main text-mainRed ml-4 text-3xl lg:ml-12 w-1/2 justify-center mt-auto mb-auto">
        ElASSIMA
      </h2>
      <ul className="w-1/2 flex flex-row  items-center gap-4 lg:gap-12 font-main justify-end text-lg pr-4 lg:pr-12 2xl:text-xl">
        <li className='className="hover:text-xl hover:text-mainRed 2xl:hover:text-2xl transition-all'>
          <FaFacebook
            size={20}
            className="hover:h-[30px] hover:w-[30px] transition-all duration-100"
          />
        </li>
        <li className="hover:text-xl hover:text-mainRed 2xl:hover:text-2xl transition-all">
          <Link href="/">Accueil</Link>
        </li>

        <li className="hover:text-2xl hover:text-mainRed 2xl:hover:text-3xl transition-all">
          Blog
        </li>
      </ul>
    </div>
  );
};

export default ShopFooter;
