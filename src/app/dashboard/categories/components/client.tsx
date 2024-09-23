'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/Heading';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { CategoriesColumns, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

interface CategoriesColumnsProps {
  data: CategoriesColumns[];
}

export const CategoriesClient: React.FC<CategoriesColumnsProps> = ({
  data,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your Store"
        />
        <Button
          onClick={() => router.push(`./categories/new`)}
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
