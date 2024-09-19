import Image from 'next/image';

interface HonoursCardProps {
  number: number;
  name: string;
  imgSrc: StaticImageData;
}

export const HonoursCard: React.FC<HonoursCardProps> = ({
  number,
  name,
  imgSrc,
}) => {
  return (
    <div className=" relative h-[80vh] justify-end border-2 border-l-0 border-white basis-[20%] flex flex-col font-pop p-4 pb-8 first:border-l-2 group">
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute h-full w-full bg-gradient-to-b from-mainBlack to-mainRed top-0 left-0 z-10 opacity-40"></div>
        <Image
          src={imgSrc}
          alt={name}
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
        />
      </div>

      <h3 className=" font-main text-8xl text-right mb-auto z-10">{number}</h3>
      <h4 className="font-main text-3xl z-20">{name}</h4>
    </div>
  );
};
