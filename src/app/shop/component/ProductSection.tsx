import prismadb from '@/lib/prismadb';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

const ProductSection = async () => {
  const products = await prismadb.product.findMany({
    include: {
      category: true,
      images: true,
    },
    take: 8,
  });

  return (
    <div className="w-screen px-12 mt-12 pb-24">
      <h2 className="text-black font-main text-4xl">Check Our Products</h2>
      <Button
        className=" px-0 font-pop rounded-none text-mainBlack text-md  transition-colors duration-200 hover:no-underline border-b-[1px] border-transparent hover:border-mainBlack"
        variant="link">
        Shop now
      </Button>
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
      <div className="w-full flex justify-center ">
        <Button
          className="px-12 py-4 my-4 font-pop bg-mainRed mx-0 hover:bg-transparent hover:border-mainBlack hover:border
         hover:text-mainBlack text-sm">
          Voir tous les produits
        </Button>
      </div>
    </div>
  );
};

export default ProductSection;
