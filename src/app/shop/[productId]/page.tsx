import prismadb from '@/lib/prismadb';
import { ProductCard } from '../component/ProductCard';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import OrderForm from '../component/OrderForm';
import OrderFormWrapper from '../component/OrderFormWrapper';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      images: true,
    },
  });
  const similarProducts = await prismadb.product.findMany({
    where: {
      categoryId: product?.categoryId,
    },
    include: {
      category: true,
      images: true,
    },
    take: 4,
  });
  return (
    <div className="relative">
      <div className="h-[15vh] bg-mainRed w-screen"></div>
      <div className="lg:h-[90vh] lg:p-12 lg:flex">
        <Image
          src={product?.images[0].url || ''}
          alt="product img"
          height={2000}
          width={2000}
          className="w-full lg:w-1/2 h-full object-cover lg:rounded-3xl"
        />
        <div className="p-6 lg:pl-6 lg:pt-2 lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-black font-main text-5xl">{product?.name}</h2>
            <h4 className="text-slate-600 font-pop text-lg mt-2 uppercase font-light tracking-[0.2em]">
              {product?.category.name}
            </h4>
          </div>
          <div className="">
            <p className="font-pop text-gray-700 font-semibold">
              <span className="text-3xl font-bold pr-4 text-black">
                {product?.quantity.toNumber()}
              </span>
              Left
            </p>
            <Separator className="my-4" />
            <h3 className="font-pop font-bold text-gray-500 text-2xl">
              {product?.price.toNumber()} DA
            </h3>

            <OrderFormWrapper />
          </div>
        </div>
      </div>
      <Separator />
      <div className="w-screen lg:px-12 mt-6 pb-12">
        <h2 className="text-black font-main text-2xl pl-2 lg:text-4xl">
          Check Our Products
        </h2>

        <div className="flex flex-row flex-wrap mt-6">
          {similarProducts.map((item) => (
            <div key={item.id} className="w-1/2 lg:w-1/4 mb-6">
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
    </div>
  );
};

export default ProductPage;
