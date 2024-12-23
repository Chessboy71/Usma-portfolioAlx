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
import { AlertModal } from '@/components/modals/alert-modal';
import { Settings } from '@prisma/client';
import { ImageUpload } from '@/components/ui/image-upload';

const formSchema = z.object({
  heroPicture: z.string().min(1),
  featuredImage: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Settings | null;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  //   const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? `Edit shop images` : 'Create shop images';
  const description = initialData
    ? 'Edit a shop images'
    : 'Add a new shop images';
  const toastMessage = initialData
    ? 'shop images updated'
    : 'shop images Created';
  const action = initialData ? 'Save change' : 'Create';

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      heroPicture: '',
      featuredImage: '',
    },
  });
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`../../../api/settings/${params.settingsId}`);
      router.refresh();
      router.push('/dashboard/settings');
      toast.success('settings deleted');
    } catch (error) {
      toast.error(
        'Make sure you removed all the categories using this billboard'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`../../../api/settings/${params.settingsId}`, data);
      } else {
        await axios.post('../../../api/settings/', data);
      }
      router.refresh();
      router.push('/dashboard/settings');
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
            name="heroPicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 text-sm font-semibold">
                  Image principale
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 text-sm font-semibold">
                  Mise en avent
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
