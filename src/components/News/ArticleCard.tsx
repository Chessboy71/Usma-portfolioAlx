import { CarouselItem } from '@/components/ui/carousel';
import { Button } from '../ui/button';
import Image, { StaticImageData } from 'next/image';

interface ArticleCardProps {
  key: number;
  ImgSrc: StaticImageData;
  title: string;
  description: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  ImgSrc,
  title,
  description,
}) => {
  return (
    <CarouselItem className="basis-1/4 border-mainBlack border-8 p-0 group relative mr-1">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <Image
        src={ImgSrc}
        alt="aritcle image"
        className="h-[70vh] object-cover"
      />
      <div className="absolute top-full group-hover:top-[65%] 2xl:group-hover:top-[75%] opacity-0 group-hover:opacity-100 pl-4 w-[22vw] transition-all duration-500">
        <h6 className="font-main text-3xl 2xl:text-4xl">{title}</h6>
        <p className="text-sm 2xl:text-base">{description}</p>
        <Button variant="link" className="text-white p-0 float-right">
          Read More
        </Button>
      </div>
    </CarouselItem>
  );
};
