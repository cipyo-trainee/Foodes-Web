"use client";

import React from "react";
import FoodCart from "./components/FoodCart";
import CouponCard from "./components/CouponCard";
import restaurantBanner from "../public/restorent.jpg";
import FoodBanner from "./components/FoodBanner";
import DownloadAppCard from "./components/DownloadCard";
import RestaurantFacilities from "./components/RestaurantFacilities";
import MeetOurChefs from "./components/MeetOurChefs";

export default function RootLayout() {
  return (
    <div className="min-h-screen p-5 rounded-lg m-5 ">
      <main>
        
        <FoodBanner />
        <FoodCart />
        <RestaurantFacilities/>
        <MeetOurChefs/>
        <DownloadAppCard />
        <CouponCard
          title="Flat 20% OFF on All Meals 🍔"
          description="Enjoy delicious food at a discount. Valid on orders above ₹499."
          code="FOOD20"
          image={restaurantBanner}
        />
      </main>
    </div>
  );
}
