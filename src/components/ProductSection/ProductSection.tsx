'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ProductCard } from './ProductCard';
import { Separator } from '../ui/separator';

export const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="ml-[10vw] flex flex-col">
      <h3 className="font-main text-3xl p-6 pb-0 mt-6">Our products</h3>
      <div className="w-[88vw]  justify-between pl-6 flex flex-wrap  justify-self-center   ">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              type={p.category}
              img={p.image}
              price={p.price}
              url="/"
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};
