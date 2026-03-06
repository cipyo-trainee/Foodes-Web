"use client";

import React from "react";
import {
  FaWifi,
  FaParking,
  FaUtensils,
  FaMusic,
  FaCreditCard,
  FaUsers,
} from "react-icons/fa";

const RestaurantFacilities: React.FC = () => {
  const facilities = [
    {
      id: 1,
      title: "Free WiFi",
      description: "High-speed internet available for all guests.",
      icon: <FaWifi />,
    },
    {
      id: 2,
      title: "Parking Area",
      description: "Spacious and secure parking space.",
      icon: <FaParking />,
    },
    {
      id: 3,
      title: "Quality Food",
      description: "Fresh and hygienic meals prepared daily.",
      icon: <FaUtensils />,
    },
    {
      id: 4,
      title: "Live Music",
      description: "Enjoy live music performances every weekend.",
      icon: <FaMusic />,
    },
    {
      id: 5,
      title: "Online Payment",
      description: "Multiple digital payment options available.",
      icon: <FaCreditCard />,
    },
    {
      id: 6,
      title: "Private Dining",
      description: "Book private rooms for family & corporate events.",
      icon: <FaUsers />,
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Facilities
          </h2>
          <p className="text-gray-600 mt-2">
            We provide the best services to enhance your dining experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl shadow-md p-6  border border-gray-100"
            >
              <div className="text-orange-500 text-3xl mb-4">
                {facility.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {facility.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantFacilities;