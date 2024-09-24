'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
// import { ApiAlert } from '@/components/ui/api-alert';
// import { useOrigin } from '@/hooks/use-origin';
import { Billboard, Category } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? `Edit category` : 'Create category';
  const description = initialData ? 'Edit a category' : 'Add a new category';
  const toastMessage = initialData ? 'category updated' : 'category Created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`../../../api/categories/${params.categoryId}`);
      router.refresh();
      router.push('/dashboard/categories');
      toast.success('Category deleted');
    } catch (error) {
      toast.error('Make sure you removed all the Products using this category');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`../../../api/categories/${params.categoryId}`, data);
      } else {
        await axios.post('../../../api/categories/', data);
      }
      router.refresh();
      router.push('/dashboard/categories');
      toast.success(toastMessage);
    } catch (error) {
      toast.error('somethig went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}>
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full font-pop ml-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category"
                      {...field}
                      className="font-pop w-1/2 text-slate-900"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold pt-4">
                    Billboard
                  </FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-1/2">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
