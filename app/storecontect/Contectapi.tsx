"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

export type User = { email: string } | null;

export type CartContextType = {
  cart: CartItem[];
  foodItems: FoodItem[];
  handleAddToCart: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;
  totalItems: number;
  totalPrice: number;
  user: User;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const fetchFoodItems = async (): Promise<void> => {
      try {
        const res = await fetch("http://localhost:4000/api/products/ListData");
        const data = await res.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchFoodItems();
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // ✅ Total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Total price (match cart with products)
  const totalPrice = cart.reduce((sum, cartItem) => {
    const product = foodItems.find((f) => f.id === cartItem.id);
    return sum + (product ? product.price * cartItem.quantity : 0);
  }, 0);

  // ✅ Authentication helpers
  const login = (email: string, password: string): boolean => {
    // This is a placeholder implementation. Replace with real auth logic.
    setUser({ email });
    return true;
  };

  const signup = (email: string, password: string): boolean => {
    // In a real app you would call an API and handle errors.
    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        foodItems,
        handleAddToCart,
        handleRemoveFromCart,
        totalItems,
        totalPrice,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
