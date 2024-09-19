'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductSection/ProductCard';

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-[95vw] justify-between pl-6 flex flex-wrap py-[5vh] justify-self-center  ml-auto mr-auto">
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
