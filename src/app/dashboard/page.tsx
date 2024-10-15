import { Toaster } from 'react-hot-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';

export default function DashboardPage() {
  return (
    <div className="bg-white text-black p-6 flex flex-row flex-wrap gap-2 justify-center">
      <Alert className="p-8 basis-[49%]">
        <Link href="/dashboard/billboards" className="text-lg flex flex-row">
          <div className="text-lg flex flex-row group">
            <AlertTitle className="font-bold">Billboards</AlertTitle>
            <ArrowRightIcon className="ml-2 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Link>

        <AlertDescription className="font-semibold text-slate-500">
          Manage the billboards of your application
        </AlertDescription>
      </Alert>
      <Alert className="p-8 basis-[49%]">
        <Link href="/dashboard/categories" className="text-lg flex flex-row">
          <div className="text-lg flex flex-row group">
            <AlertTitle className="font-bold">Categories</AlertTitle>
            <ArrowRightIcon className="ml-2 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Link>

        <AlertDescription className="font-semibold text-slate-500">
          Manage the categories of your store
        </AlertDescription>
      </Alert>
      <Alert className="p-8 basis-[49%]">
        <Link href="/dashboard/products" className="text-lg flex flex-row">
          <div className="text-lg flex flex-row group">
            <AlertTitle className="font-bold">Products</AlertTitle>
            <ArrowRightIcon className="ml-2 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Link>

        <AlertDescription className="font-semibold text-slate-500">
          Manage the products of your store
        </AlertDescription>
      </Alert>
      <Alert className="p-8 basis-[49%]">
        <Link href="/dashboard/orders" className="text-lg flex flex-row">
          <div className="text-lg flex flex-row group">
            <AlertTitle className="font-bold">Orders</AlertTitle>
            <ArrowRightIcon className="ml-2 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Link>

        <AlertDescription className="font-semibold text-slate-500">
          Manage the orders of your store
        </AlertDescription>
      </Alert>

      <Toaster />
    </div>
  );
}
