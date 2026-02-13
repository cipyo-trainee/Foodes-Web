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
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("loggedIn") === "true"
        ? JSON.parse(localStorage.getItem("user") || "null")?.email
        : null;
    }
    return null;
  });

  // Add item to cart
  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, cartItem) => {
    const item = foodItems.find((f) => f.id === cartItem.id);
    return sum + (item ? item.price * cartItem.quantity : 0);
  }, 0);

  // Signup
  const signup = (email: string, password: string) => {
    if (typeof window === "undefined") return;
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loggedIn", "true");
    setUser(email);
  };

  // Login
  const login = (email: string, password: string) => {
    if (typeof window === "undefined") return false;
    const userData = localStorage.getItem("user");
    if (!userData) return false;
    const userObj = JSON.parse(userData);
    if (userObj.email === email && userObj.password === password) {
      localStorage.setItem("loggedIn", "true");
      setUser(email);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
