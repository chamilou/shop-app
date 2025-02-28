"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Calculate total cost
  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Get total item count
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Add an item to the cart or increment its quantity if it already exists
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === recipe.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === recipe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...recipe, quantity: 1 }];
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCost,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
