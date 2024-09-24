'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/Heading';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { ProductsColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

interface ProductClientProps {
  data: ProductsColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your Store"
        />
        <Button
          onClick={() => router.push(`./products/new`)}
          className="font-pop font-semibold m-3">
          Add new
          <FaPlus className="ml-2 h-3 w-3" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
