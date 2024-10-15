import Image from 'next/image';
import { Button } from '@/components/ui/button';
import prismadb from '@/lib/prismadb';
const ShopHero = async () => {
  const shopHero = await prismadb.settings.findFirst();

  return (
    <div className="relative">
      {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10"></div> */}
      <div className="absolute bg-gradient-to-b from-[#00000050] to-black h-full w-full z-10"></div>
      <Image
        className="h-[100vh] w-screen object-cover bg-center"
        src={shopHero?.heroPicture || ''}
        alt="mainImg"
        height={2000}
        width={2000}
      />
      <div className="absolute top-[60vh] 2xl:top-[68vh] w-screen z-30 ml-12">
        <h2 className=" font-main text-6xl 2xl:text-8xl z-30 w-2/5 ">
          Militer pour notre Identité
        </h2>
        <Button
          className=" mt-4 font-pop py-5 text-white text-md hover:bg-mainRed hover:text-white hover:border-mainRed transition-colors duration-200 "
          variant="outline">
          Shop now
        </Button>
      </div>
    </div>
  );
};

export default ShopHero;
