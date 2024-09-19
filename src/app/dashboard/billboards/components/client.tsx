'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/Heading';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

export const BillboardClient = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billbaord"
          description="Manage billboards for your Store"
        />
        <Button
          onClick={() => router.push(`./billboards/new`)}
          className="font-pop font-semibold m-3">
          Add new
          <FaPlus className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </>
  );
};
