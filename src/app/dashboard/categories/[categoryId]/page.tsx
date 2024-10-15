import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';
import { Billboard } from '@prisma/client';

const CategoriesPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards: Billboard[] = await prismadb.billboard.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm initialData={categories} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
