"use client";

import React, { createContext, useContext, useState } from "react";
import { foodItems } from "../Data/FoodItem";

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  handleAddToCart: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
};


const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of cart
  const totalPrice = cart.reduce((sum, cartItem) => {
    const item = foodItems.find((f) => f.id === cartItem.id);
    return sum + (item ? item.price * cartItem.quantity : 0);
  }, 0);



  return (
    <CartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart anywhere
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
