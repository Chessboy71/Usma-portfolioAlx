'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OrderForm from './OrderForm';

const OrderFormWrapper = () => {
  // State to manage whether the form is active (visible)
  const [formActive, setFormActive] = useState(false);

  return (
    <div>
      <Button
        className="w-full mt-6 font-pop bg-mainRed mx-0 hover:bg-transparent hover:border-mainBlack hover:border
         hover:text-mainBlack text-sm"
        onClick={() => {
          setFormActive(true);
        }}>
        Commander Maintenant
      </Button>

      <OrderForm active={formActive} setActive={setFormActive} />
    </div>
  );
};

export default OrderFormWrapper;
