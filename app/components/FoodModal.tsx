"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import pizza from "../../public/pizza.png";
import { IoMdClose } from "react-icons/io";

export default function FoodModal() {
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-fadeIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 bg-white/80 hover:bg-white p-2 rounded-full shadow"
            >
              <IoMdClose
                size={24}
                className="text-gray-700 hover:text-red-500"
              />
            </button>

            {/* IMAGE */}
            <div className="relative w-full h-72 md:h-96 lg:h-[500px]">
              <Image
                src={pizza}
                alt="Food Modal Image"
                fill
                className="object-cover object-center" 
                priority
              />
            </div>

            {/* CONTENT */}
            <div className="p-8 text-center md:text-left md:flex md:flex-col md:items-start">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
                🍔 Welcome to Foodies
              </h2>

              <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-xl">
                Enjoy <span className="font-semibold">30% OFF</span> on your
                first order! Order now and get your favorite food delivered
                fast. 🍕🍟
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full md:w-auto px-8 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Start Ordering
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
