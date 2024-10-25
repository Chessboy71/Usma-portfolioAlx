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

import { Order, Product } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Phone must be a valid number',
    }), // Convert to number
  address: z.string().min(1, { message: 'Address is required' }),
  progress: z.string().min(1),
  productId: z.string().min(1),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: Order | null;
  products: Product[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  products,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = `Edit order`;
  const description = 'Edit a order';
  const toastMessage = 'order updated';
  const action = 'Save changes';

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      phone: '',
      address: '',
      progress: 'en_attente',
      productId: '',
    },
  });
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`../../../api/orders/${params.ordersId}`);
      router.refresh();
      router.push('/dashboard/orders');
      toast.success('order deleted');
    } catch (error) {
      toast.error('Make sure you removed all the Products using this order');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);
      
        await axios.patch(`../../../api/orders/${params.ordersId}`, data);
      
      router.refresh();
      router.push('/dashboard/orders');
      toast.success(toastMessage);
    } catch (error) {
      toast.error('somethig went wrong');
    } finally {
      setLoading(false);
    }
  };
  return initialData ? (
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold">
                    Numero de telephone
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Numero de telephone"
                      {...field}
                      className="font-pop w-1/2 text-slate-900"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold">
                    Addresse
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="address"
                      {...field}
                      className="font-pop w-1/2 text-slate-900"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold pt-4">
                    Produit
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
                          placeholder="Choisir le progress"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en_attente">En attente</SelectItem>
                      <SelectItem value="annulé">Annulé</SelectItem>
                      <SelectItem value="confrimé">Confirmé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 text-sm font-semibold pt-4">
                    Produit
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
                      {products?.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
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
  ) : (
    <>
      <div>Order not found</div>
    </>
  );
};
