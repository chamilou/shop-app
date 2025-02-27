"use client"; // Mark this component as a Client Component
import useCartStore from "../../store/cartStore";

export default function ProductPage({ params }) {
  const { id } = params;
  const addToCart = useCartStore((state) => state.addToCart);

  const product = {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "This is a great product!",
  };

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
