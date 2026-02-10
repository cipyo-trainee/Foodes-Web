"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../storecontect/Contectapi"; // Cart context
import { foodItems } from "../Data/FoodItem";

export default function CartItemPage() {
  const router = useRouter();
  const { cart, handleRemoveFromCart, totalPrice } = useCart();

  const getItem = (id: number) => foodItems.find((item) => item.id === id);

  return (
    <div className="h-150 w-screen flex flex-col ">
    
  

      {/* Main Cart Area */}
      <main className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center mt-20 text-xl">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-4 items-center font-semibold border-b pb-2 mb-2 bg-white rounded shadow">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Remove</div>

            {/* Cart Items */}
            {cart.map((cartItem) => {
              const item = getItem(cartItem.id);
              if (!item) return null;

              return (
                <div key={cartItem.id} className="contents">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="object-cover rounded"
                    />
                  </div>
                  <div>{item.name}</div>
                  <div>${item.price}</div>
                  <div>{cartItem.quantity}</div>
                  <div>
                    <button
                      onClick={() => handleRemoveFromCart(cartItem.id)}
                      className="text-red-500 font-bold hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer: Total and Checkout */}
      {cart.length > 0 && (
        <footer className="p-6 bg-white shadow flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold">
            Grand Total: ${totalPrice}
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Proceed to Checkout
          </button>
        </footer>
      )}
    </div>
  );
}
