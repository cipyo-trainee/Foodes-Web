"use client";

import React from "react";
import Image from "next/image";
import chefImage from '../../public/team1.jpg'

import team2 from '../../public/team2.jpg'
import team3 from '../../public/ceo.jpg'
import team4 from '../../public/malechef.jpg'
import team5 from '../../public/malechef1.jpg'

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Bringing delicious flavors to your doorstep with love and passion.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={chefImage}
            alt="Chef Cooking"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2020, our food delivery service was born out of a
            passion for fresh, wholesome meals that bring families and friends
            together. We carefully select ingredients, partner with local
            farmers, and cook each dish with love.
          </p>
          <p className="text-gray-700">
            Our goal is simple: to make gourmet-quality food accessible and
            convenient for everyone.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gray-50 p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          To deliver fresh, healthy, and delicious meals to your door while
          supporting local farmers and promoting sustainable food practices.
        </p>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Team Member */}
          {[
            { name: "Alice Johnson", role: "Head Chef", image: team2 },
            { name: "Michael Smith", role: "Founder & CEO", image: team3 },
            { name: "Sophia Lee", role: "Marketing Lead", image: team4 },
            { name: "David Kim", role: "Operations Manager", image: team5 },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-yellow-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Join Our Culinary Journey!</h2>
        <p className="text-gray-700 mb-4">
          Sign up for our newsletter and get exclusive recipes, deals, and updates.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Subscribe Now
        </button>
      </section>
    </div>
  );
}
