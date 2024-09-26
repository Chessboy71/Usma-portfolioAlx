import prismadb from '@/lib/prismadb';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CategorySection = async () => {
  const category = await prismadb.category.findFirst({
    include: {
      billboard: true,
    },
  });
  const products = await prismadb.product.findMany({
    include: {
      category: true,
      images: true,
    },
    where: {
      categoryId: category?.id,
    },

    take: 4,
  });

  return (
    <div className="w-screen px-12">
      <div className="relative rounded-3xl">
        <div
          className="h-full w-full bg-black opacity-40
         z-20 absolute top-0 left-0 rounded-3xl"></div>
        <Image
          src={category?.billboard.imageUrl || ''}
          alt="CategoryImg"
          className="w-full h-[20vw] object-cover z-0 rounded-3xl"
          width={500}
          height={500}
        />
        <h4
          className="absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 text-white font-pop text-3xl font-bold z-30">
          {category?.name}
        </h4>
      </div>
      <div className="flex flex-row flex-wrap mt-6">
        {products.map((item) => (
          <div key={item.id} className="w-1/4 mb-6">
            <ProductCard
              key={item.id}
              title={item.name}
              type={item.category.name}
              img={item.images[0].url}
              price={item.price.toNumber()}
              url={`/shop/${item.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
