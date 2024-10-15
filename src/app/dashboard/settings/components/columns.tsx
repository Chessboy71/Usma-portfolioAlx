'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SettingsColumn = {
  id: string;
  heroPicture: string;
  featuredImage: string;
};

export const columns: ColumnDef<SettingsColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Settings',
    cell: ({ row }) => {
      const settingsId = row.original.id;
      return (
        <Link
          href={`/dashboard/settings/${settingsId}`}
          className="hover:text-slate-900">
          Modifier
        </Link>
      );
    },
  },
  {
    accessorKey: 'heroPicture',
    header: 'Image principale',
    cell: ({ row }) => (
      <Image
        src={row.original.heroPicture}
        alt="Image Principale"
        height={300}
        width={300}
      />
    ),
  },
  {
    accessorKey: 'featuredImage',
    header: 'Image mise en avent',
    cell: ({ row }) => (
      <Image
        src={row.original.featuredImage}
        alt="Image mise en avant"
        height={300}
        width={300}
      />
    ),
  },
];
