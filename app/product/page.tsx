import axios from 'axios';

const base = process.env.NEXT_PUBLIC_BASE_URL;

// Define the Product interface
interface Product {
  id: number;
  name: string;
  price: number;
}

// Define the props for the ProductList component
interface ProductListProps {
  products: Product[];
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${base}/product`);
    const products: Product[] = response.data.data; // Type assertion

    return {
      props: { products }, // Pass products to the page component
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { products: [] }, // Return an empty array on error
    };
  }
}

// Use the ProductListProps type for the component props
export default function ProductList({ products }: ProductListProps) {
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