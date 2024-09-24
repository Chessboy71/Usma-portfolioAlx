'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  quantity: Number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const productId = row.original.id;
      return (
        <Link
          href={`/dashboard/products/${productId}`}
          className="hover:text-slate-900">
          {' '}
          {row.getValue('name')}{' '}
        </Link>
      );
    },
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
];
