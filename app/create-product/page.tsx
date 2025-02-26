'use client'; // This component will handle client-side interactions

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const base = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Keep price as a string
  const [images, setImages] = useState<File[]>([]); // State for images

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray); // Set the selected files
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach((image) => {
      formData.append('files', image); // Append each image
    });

    try {
      await axios.post(`${base}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setImages([]); // Reset images
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 mb-8">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <div>
        <label className="block mb-1">
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </label>
      </div>
      <div>
        <label className="block mb-1">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </label>
      </div>
      <div>
        <label className="block mb-1">
          Price:
          <input
            type="text" // Keep as text to handle decimal values easily
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </label>
      </div>
      <div>
        <label className="block mb-1">
          Upload Images:
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
          />
        </label>
      </div>
      <div className="flex flex-wrap space-x-2">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image
              src={URL.createObjectURL(image)} // Create a URL for the uploaded image
              alt={`Preview of ${image.name}`}
              layout="fill" // Fill the parent container
              objectFit="cover" // Cover the area without distortion
              className="rounded"
            />
          </div>
        ))}
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Create Product
      </button>
    </form>
  );
}