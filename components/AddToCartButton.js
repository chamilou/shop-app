"use client"; // ✅ Enables client-side interactivity
import { useCart } from "@/context/CartContext";
export default function AddToCartButton({ recipe }) {
  const { addToCart } = useCart();
  const handleClick = () => {
    addToCart(recipe);
    // alert(`Added ${recipe} to cart!`);
  };

  return (
    <button onClick={handleClick} className="addToCartButton">
      Add to Cart
    </button>
  );
}
