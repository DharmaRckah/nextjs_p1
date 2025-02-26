'use client'; // This component will handle client-side interactions

import { useState } from 'react';
import axios from 'axios';

const base = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Keep price as a string
  const [features, setFeatures] = useState<string[]>(['']); // Initialize with one empty field
  const [images, setImages] = useState<File[]>([]); // State for images

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']); // Add a new empty field
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

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
    features.forEach((feature) => {
      formData.append('features[]', feature); // Append each feature
    });
    images.forEach((image) => {
      formData.append('files', image); // Append each image
    });

    try {
      
     const res =      await axios.post(`${base}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setFeatures(['']); // Reset features to one empty field
      setImages([]); // Reset images
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4">
      <div>
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="text" // Keep as text to handle decimal values easily
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div>
        <label>Features:</label>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="border p-2 w-full"
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Feature
        </button>
      </div>
      <div>
        <label>
          Upload Images:
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <button type="submit" className="bg-green-500 text-white py- 2 px-4 rounded">
        Create Product
      </button>
    </form>
  );
}