import React from 'react';

const base = process.env.NEXT_PUBLIC_BASE_URL;

interface Product {
  _id: string; // Use _id instead of id to match your data structure
  name: string;
  description: string;
  price: number;
  files: string[]; // Array of image URLs
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
          <li key={product._id} className="mb-4 border p-4 rounded">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600">Price: ₹ {product.price}</p>
            <div className="flex space-x-2 mt-2">
              {product.files.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  alt={`Image of ${product.name}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}