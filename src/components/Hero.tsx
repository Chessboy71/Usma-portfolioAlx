import heroImg from '@/../../public/15.jpg';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="block">
      <Image
        src={heroImg}
        alt="Hero image"
        className="h-[70vh] w-[100vw] object-cover"
      />
      <div className="w-screen  flex flex-row">
        <div className="w-[95vw] font-main text-6xl pl-[10vw] py-6 flex flex-row items-end justify-between pr-12">
          <h2>
            Militer <br /> pour notre identite
          </h2>
          <h6 className="text-lg font-pop font-extralight tracking-[.5em] uppercase text-slate-400 opacity-80">
            Depuis 1937
          </h6>
        </div>
        <div className="w-[5vw] bg-mainRed "></div>
      </div>
    </div>
  );
};
