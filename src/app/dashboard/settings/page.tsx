import prismadb from '@/lib/prismadb';
import { SettingsClient } from './components/client';
import { SettingsColumn } from './components/columns';

const SettingsPage = async () => {
  const settings = await prismadb.settings.findMany();

  const formattedSettings: SettingsColumn[] = settings.map((b) => ({
    id: b.id,
    heroPicture: b.heroPicture,
    featuredImage: b.featuredImage,
  }));

  return (
    <div className="flex-col">
      <div>
        <SettingsClient data={formattedSettings} />
      </div>
    </div>
  );
};

export default SettingsPage;
