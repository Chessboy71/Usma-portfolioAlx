'use client';

import * as z from 'zod';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { FaRegClosedCaptioning } from 'react-icons/fa6';
import { Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';
import { FaWindowClose } from 'react-icons/fa';

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Phone must be a valid number',
    }), // Convert to number
  address: z.string().min(1, { message: 'Address is required' }),
});

const OrderForm = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (active: boolean) => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { productId } = useParams(); // Assuming you'll be passing a product ID in the params

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '', // Phone is an empty string by default
      address: '',
    },
  });

  // Submit handler
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const submissionData = {
        productId,
        progress: 'en_attente',
        ...data,
      };

      // Make a POST request to save the order
      await axios.post(`/api/orders/`, submissionData);
      toast.success('Order created successfully!');
      router.push(`/shop/${productId}`);
    } catch (error) {
      toast.error('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        active
          ? 'z-50 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-20 backdrop-blur-lg flex justify-center items-center'
          : 'hidden'
      }>
      <div
        className="w-full h-full absolute top-0 left-0 z-0"
        onClick={() => setActive(false)}></div>
      <div className="z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg font-pop">
        <FaWindowClose
          className="text-white bg-black border-white float-right h-4 w-4"
          onClick={() => setActive(false)}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre nom"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Numero de telephone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: 0653837343"
                      {...field}
                      className="text-black"
                      type="tel" // Setting type to tel for phone numbers
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre adresse"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="float-right px-6"
              disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OrderForm;
