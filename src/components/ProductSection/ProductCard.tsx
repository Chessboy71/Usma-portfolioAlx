import Image from 'next/image';
import { Button } from '../ui/button';

interface ProductCard {
  title: string;
  price: number;
  type: string;
  img: string;
  url: string;
}

export const ProductCard: React.FC<ProductCard> = ({
  title,
  price,
  type,
  img,
}) => {
  return (
    <div className="basis-1/4">
      <div className="relative group max-h-[20vw] max-w-[20vw] overflow-y-hidden">
        <div className="absolute bg-mainRed bg-opacity-10 backdrop-blur-md h-full w-full p-6 justify-center flex items-center  opacity-0 transition-all duration-200 group-hover:opacity-100">
          <Button variant="link" className="p-0 font-pop text-white">
            Voir Plus
          </Button>
        </div>
        <Image
          className="h-[20vw] w-auto basis-1/4 mt-6 aspect-square"
          src={img}
          alt="product"
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-row flex-wrap font-pop justify-between items-center pt-1">
        <h4 className="text-sm  font-bold  flex-grow text-balance w-[18vw]">
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
