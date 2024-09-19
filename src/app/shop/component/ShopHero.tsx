import Image from 'next/image';
import shopHero from '../../../../public/shopHero.jpg';
const ShopHero = () => {
  return (
    <div className="relative">
      <h2 className="text-6xl font-main text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        Main Shop
      </h2>

      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10"></div>
      <div className="absolute bg-black h-full w-full opacity-80 z-10"></div>
      <Image
        className="h-[50vh] w-screen object-cover"
        src={shopHero}
        alt="mainImg"
      />
    </div>
  );
};

export default ShopHero;
