import axios from 'axios';
let base = process.env.NEXT_PUBLIC_BASE_URL;
export default async function ProductList() {
  const response = await axios.get(`${base}/product`);
  // console.log("res",response)
  const products = response.data.data;
 
  

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product: { id: number; name: string; price: number }) => (
          <li key={product.id}>
            {product.name} - ₹ {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}



