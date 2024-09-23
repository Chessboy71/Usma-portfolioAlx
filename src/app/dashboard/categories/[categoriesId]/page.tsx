import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';

const CategoriesPage = async ({
  params,
}: {
  params: { categoriesId: string };
}) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoriesId,
    },
  });
  const billboards = await prisma?.billboard.findMany();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm initialData={categories.id} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
