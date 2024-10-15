import prismadb from '@/lib/prismadb';
import { ProductClient } from './components/client';
import { ProductsColumn } from './components/columns';
import { format } from 'date-fns';
import { formatter } from './utils';

const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      category: true,
    },
  });

  const formattedProducts: ProductsColumn[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    isFeatured: p.isFeatured,
    isArchived: p.isArchived,
    price: formatter.format(p.price.toNumber()),
    quantity: p.quantity.toNumber(),
    category: p.category.name,
    createdAt: format(p.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
