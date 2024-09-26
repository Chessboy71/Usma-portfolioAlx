'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillbaordColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillbaordColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
    cell: ({ row }) => {
      const billboardId = row.original.id;
      return (
        <Link
          href={`/dashboard/billboards/${billboardId}`}
          className="hover:text-slate-900">
          {' '}
          {row.getValue('label')}{' '}
        </Link>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
];
