import prismadb from '@/lib/prismadb';
import { BillboardClient } from './components/client';
import { BillbaordColumn } from './components/columns';
import { format } from 'date-fns';

const BillboardsPage = async () => {
  const billboards = await prismadb.billboard.findMany();

  const formattedBillboard = billboards.map((b) => ({
    id: b.id,
    label: b.label,
    createdAt: format(b.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div>
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;
