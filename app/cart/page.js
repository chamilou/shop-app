"use client"; // Mark this as a Client Component

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate the total cost
  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id); // Remove the item if quantity is less than 1
    } else {
      updateQuantity(id, quantity); // Update the quantity
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.image_path}
                    alt={item.name}
                    width={100}
                    height={100}
                    className={styles.image}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalCost}>
            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
            <Link href="/checkout" className={styles.checkoutButton}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
