import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

import { OrderColumn } from './components/columns';
import { OrderClient } from './components/client';
import { formatter } from '../products/utils';

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      product: true,
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
    product: o.product.name,
    price: formatter.format(o.product.price.toNumber()),
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
