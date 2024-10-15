import prismadb from '@/lib/prismadb';
import { SettingsForm } from './components/settings-form';

const SettingsPage = async ({ params }: { params: { settingsId: string } }) => {
  const settings = await prismadb.settings.findUnique({
    where: {
      id: params.settingsId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
};

export default SettingsPage;
