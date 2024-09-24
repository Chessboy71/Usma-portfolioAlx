'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

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
import { Billboard } from '@prisma/client';
import { ImageUpload } from '@/components/ui/image-upload';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  //   const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? `Edit BillBoard` : 'Create billboard';
  const description = initialData ? 'Edit a Billboard' : 'Add a new billboard';
  const toastMessage = initialData ? 'BillBoard updated' : 'billboard Created';
  const action = initialData ? 'Save change' : 'Create';

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`../../../api/billboards/${params.billboardId}`);
      router.refresh();
      router.push('/');
      toast.success('Billboard deleted');
    } catch (error) {
      toast.error(
        'Make sure you removed all the categories using this billboard'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `../../../api/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post('../../../api/billboards/', data);
      }
      router.refresh();
      router.push('/dashboard/billboards');
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 text-sm font-semibold">
                  Background image
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChage={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold">
                    Label
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billbord label"
                      {...field}
                      className="font-pop w-1/2 text-slate-900"></Input>
                  </FormControl>
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
