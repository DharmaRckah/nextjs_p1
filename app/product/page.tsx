import React from 'react';

const base = process.env.NEXT_PUBLIC_BASE_URL;

interface Product {
  id: number;
  name: string;
  price: number;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${base}/product`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.data; // Adjust based on your API response structure
}

export default async function ProductList() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₹ {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}