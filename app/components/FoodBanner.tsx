"use client";

import Image from "next/image";
import banner from "../../public/foodbanner.jpg"

export default function FoodBanner() {
    return (
        <section className="relative rounded-lg mt-5 w-full h-96 md:h-[500px] flex items-center justify-center text-center bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 overflow-hidden">
            <Image
                src={banner}
                alt="Delicious food"
                fill
                className="object-cover opacity-70"
            />
            <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                    Taste the Best Food in Town
                </h1>
                <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
                    Fresh, delicious, and delivered to your door
                </p>
                <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300">
                    Order Now
                </button>
            </div>
        </section>
    );
}
