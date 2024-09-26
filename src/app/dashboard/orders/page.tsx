import prismadb from '@/lib/prismadb';
import { BillboardClient, OrderClient } from './components/client';
import { format } from 'date-fns';
import { formatter } from '../products/page';
import { OrderColumn } from './components/columns';

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrder: OrderColumn[] = orders.map((o) => ({
    id: o.id,
    name: o.name,
    phone: o.phone,
    address: o.address,
    products: o.orderItems.map((item) => item.product.name).join(', '),
    price: formatter.format(
      o.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    progress: o.progress,
    createdAt: format(o.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div>
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  );
};

export default OrdersPage;
