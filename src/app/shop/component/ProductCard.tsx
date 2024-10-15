'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  title: string;
  price: number;
  type: string;
  img: string;
  url: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  type,
  img,
  url,
}) => {
  const router = useRouter();
  return (
    <div>
      <div className="relative group h-[20vw] aspect-square overflow-y-hidden rounded-lg">
        <div
          className="absolute bg-mainRed bg-opacity-10 backdrop-blur-md h-full w-full p-6 
        justify-center flex items-center rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100">
          <Button
            variant="link"
            className="p-0 font-pop text-white"
            onClick={() => router.push(url)}>
            Voir Plus
          </Button>
        </div>
        <Image
          className="h-full w-full object-cover"
          src={img}
          alt="product"
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-row flex-wrap font-pop justify-between items-center pt-1 text-black">
        <h4 className="text-md  font-bold  flex-grow text-balance w-[18vw]">
          {title}
        </h4>

        <h5 className="opacity-50 text-sm font-extralight tracking-widest basis-full">
          {type}
        </h5>
        <h6 className="text-sm font-bold tracking-wider">{price} DZ</h6>
      </div>
    </div>
  );
};
