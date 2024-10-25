import { Button } from '@/components/ui/button';
import Image from 'next/image';
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
  const imgFeatured = await prismadb.settings.findFirst();

  return (
    <div
      className="py-6
    lg:py-12 lg:ml-12">
      <h2
        className="text-black font-main text-3xl ml-4
      lg:text-4xl lg:ml-0">
        Featured Products
      </h2>
      <Button
        className="px-0 ml-4 font-pop rounded-none text-mainBlack text-sm 
        transition-colors duration-200 hover:no-underline border-b-[1px] border-transparent 
        hover:border-mainBlack lg:ml-0 lg:text-lg"
        variant="link">
        Shop now
      </Button>

      <div className="mt-6 w-screen flex flex-col lg:flex-row">
        <Image
          src={imgFeatured?.featuredImage || ''}
          alt="Image for the featured section"
          height={2000}
          width={2000}
          className="lg:rounded-[35px] w-[100vw] h-[100vw] object-cover
          lg:h-[80vh] lg:w-1/2"
        />
        <div
          className="w-[80vw] justify-center
        lg:w-[40vw]">
          <Carousel className="relative mb-12 lg:h-[80vh] flex justify-center lg:w-full w-[96vw]">
            <CarouselContent className="flex mt-[75px] 2xl:mt-[25%]">
              {FeaturedProducts.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 justify-self-center pl-4 lg:pl-6">
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
            <CarouselNext
              className="
                                    absolute top-[35px] left-[85%]
                                    lg:top-[10%] lg:left-[95%]
                                    2xl:top-[20%] "
            />
            <CarouselPrevious
              className="absolute top-[35px] left-[5%]
            lg:left-[85%] lg:top-[10%] 
            2xl:top-[20%] 2xl:left-[89%]"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Featured;
