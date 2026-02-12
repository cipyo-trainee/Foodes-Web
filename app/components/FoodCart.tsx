"use client";

import React from "react";
import Image from "next/image";
import { foodItems } from "../Data/FoodItem";
import { useCart } from "../storecontect/Contectapi";

export default function FoodCart() {
  const { cart, handleAddToCart, handleRemoveFromCart } = useCart();

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Food Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {foodItems.map((item) => {
          const cartItem = cart.find((c) => c.id === item.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm my-2">
                  {item.description}
                </p>
                <p className="font-bold">${item.price}</p>

                <div className="mt-3">
                  {quantity === 0 ? (
                    <button
                      className="w-full py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        −
                      </button>

                      <span className="font-bold text-lg">
                        {quantity}
                      </span>

                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
