'use client';

import { Heading } from '@/components/ui/Heading';
import { SettingsColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

interface SettingsClientProps {
  data: SettingsColumn[];
}

export const SettingsClient: React.FC<SettingsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Parametres de la page principale`}
          description="Modifer les images de votre shop"
        />
      </div>

      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
