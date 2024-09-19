import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';
import Image from 'next/image';
import articleImage1 from '@/../../public/2.jpg';
import articleImage2 from '@/../../public/3.jpg';
import articleImage3 from '@/../../public/4.jpg';
import articleImage4 from '@/../../public/5.jpg';
import { ArticleCard } from './ArticleCard';
import { title } from 'process';

export const News = () => {
  const articles = [
    {
      id: 0,
      imgSrc: articleImage1,
      title: 'Article 1',
      description:
        'DummyJSON can be used with any type of front end project that needs products, carts, users, todos or any dummy data in JSON format',
    },
    {
      id: 1,
      imgSrc: articleImage2,
      title: 'Article 2',
      description:
        'DummyJSON can be used with any type of front end project that needs products, carts, users, todos or any dummy data in JSON format',
    },
    {
      id: 2,
      imgSrc: articleImage3,
      title: 'Article 3',
      description:
        'DummyJSON can be used with any type of front end project that needs products, carts, users, todos or any dummy data in JSON format',
    },
    {
      id: 3,
      imgSrc: articleImage4,
      title: 'Article 4',
      description:
        'DummyJSON can be used with any type of front end project that needs products, carts, users, todos or any dummy data in JSON format',
    },
    {
      id: 4,
      imgSrc: articleImage1,
      title: 'Article 5',
      description:
        'DummyJSON can be used with any type of front end project that needs products, carts, users, todos or any dummy data in JSON format',
    },
  ];
  return (
    <div className="ml-[10vw] pl-6 pt-12 bg-mainRed pb-12 relative">
      <h3 className="font-main text-3xl mb-2">Latest News</h3>
      <Carousel className="z-20">
        <CarouselContent className="w-[100vw] font-pop pl-4 ">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              ImgSrc={article.imgSrc}
              title={article.title}
              description={article.description}
            />
          ))}
        </CarouselContent>
        <CarouselNext
          className="absolute top-1/2 bg-mainBlack  text-4xl border-0 border-b-[12px]
        h-14 w-14 hover:bg-mainRed hover:border-t-[0px] hover:border-mainBlack hover:text-white
        border-mainRed hover:border-b-0 text-white left-[80vw] rounded-none transition-all duration-250"
        />
      </Carousel>
      <div className="bg-mainBlack h-full w-[5vw] absolute top-0  left-[85vw] z-[1]"></div>
    </div>
  );
};
