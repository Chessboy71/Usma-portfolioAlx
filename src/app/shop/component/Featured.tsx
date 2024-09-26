import { Button } from '@/components/ui/button';
import Image from 'next/image';
import imgFeatured from '../../../../public/featured.jpg';
import prismadb from '@/lib/prismadb';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './ProductCard';

const Featured = async () => {
  const FeaturedProducts = await prismadb.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <div className="py-12 ml-12">
      <h2 className="text-black font-main text-4xl">Featured Products</h2>
      <Button
        className=" px-0 font-pop rounded-none text-mainBlack text-md  transition-colors duration-200 hover:no-underline border-b-[1px] border-transparent hover:border-mainBlack"
        variant="link">
        Shop now
      </Button>

      <div className="mt-6 w-screen flex flex-row">
        <Image
          src={imgFeatured}
          alt="Image for the featured section"
          className="rounded-[35px] w-1/2 h-[80vh] object-cover"
        />
        <div className="w-[40vw] h-[80vh] justify-center">
          <Carousel className="relative h-[80vh] flex justify-center">
            <CarouselContent className="flex mt-[15%] 2xl:mt-[25%]">
              {FeaturedProducts.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 justify-self-center pl-6">
                  <ProductCard
                    key={item.id}
                    title={item.name}
                    price={item.price.toNumber()}
                    img={item.images[0].url}
                    url={`/shop/${item.id}`}
                    type={item.category.name}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute top-[10%] 2xl:top-[20%] left-[95%]" />
            <CarouselPrevious className="absolute top-[10%] 2xl:top-[20%] left-[85%] 2xl:left-[89%]" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Featured;
