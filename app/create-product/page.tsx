'use client'; // This component will handle client-side interactions

import { useState } from 'react';
import axios from 'axios';
let base = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState<string[]>(['']); // Initialize with one empty field

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("bbbbbbbbbbbbbb",base)
      await axios.post(`${base}/create`, { name, description, price, features });
      // Reset form fields
      setName('');
      setDescription('');
      setPrice(0);
      setFeatures(['']); // Reset features to one empty field
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Create Product
      </button>
    </form>
  );
}