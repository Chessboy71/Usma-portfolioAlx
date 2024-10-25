import prismadb from '@/lib/prismadb';
import { OrderForm } from './components/order-form';
import { Product } from '@prisma/client';

const OrdersPage = async ({ params }: { params: { ordersId: string } }) => {
  const orders = await prismadb.order.findUnique({
    where: {
      id: params.ordersId,
    },
  });
  const products: Product[] = await prismadb.product.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <OrderForm initialData={orders} products={products || []} />
      </div>
    </div>
  );
};

export default OrdersPage;
