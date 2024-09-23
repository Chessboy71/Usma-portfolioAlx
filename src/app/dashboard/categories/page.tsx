import prismadb from '@/lib/prismadb';
import { CategoriesClient } from './components/client';

import { format } from 'date-fns';
import { CategoriesColumns } from './components/columns';

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      billboard: true,
    },
  });

  const formattedCategories: CategoriesColumns[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    billboardLabel: c.billboard.label,
    createdAt: format(c.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div>
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
