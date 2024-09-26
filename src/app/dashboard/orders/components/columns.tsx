'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  name: string;
  phone: string;
  address: string;
  progress: string;
  price: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const orderId = row.original.id;
      return (
        <Link
          href={`/dashboard/orders/${orderId}`}
          className="hover:text-slate-900">
          {' '}
          {row.getValue('name')}{' '}
        </Link>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'progress',
    header: 'Order Progress',
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
];
