"use client";

import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          🍔 Food Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Overview of your food business performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-xl sm:text-2xl font-bold">$12,540</h2>
          </div>
          <FaDollarSign className="text-green-500 text-2xl sm:text-3xl" />
        </div>
        {/* Orders */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-xl sm:text-2xl font-bold">320</h2>
          </div>
          <FaShoppingCart className="text-blue-500 text-2xl sm:text-3xl" />
        </div>

        {/* Customers */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Customers</p>
            <h2 className="text-xl sm:text-2xl font-bold">1,120</h2>
          </div>
          <FaUsers className="text-purple-500 text-2xl sm:text-3xl" />
        </div>

        {/* Food Items */}
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Food Items</p>
            <h2 className="text-xl sm:text-2xl font-bold">85</h2>
          </div>
          <FaUtensils className="text-red-500 text-2xl sm:text-3xl" />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Orders</h2>

        {/* Scrollable table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b text-sm sm:text-base">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Food Item</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">#1021</td>
                <td>John Doe</td>
                <td>Pizza</td>
                <td>$25</td>
                <td className="text-green-600 font-semibold">Delivered</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">#1022</td>
                <td>Sarah Smith</td>
                <td>Burger</td>
                <td>$15</td>
                <td className="text-yellow-600 font-semibold">Pending</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2">#1023</td>
                <td>Michael Lee</td>
                <td>Pasta</td>
                <td>$18</td>
                <td className="text-red-600 font-semibold">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Top Selling Items</h2>
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>🍕 Margherita Pizza</span>
            <span className="font-semibold">120 Orders</span>
          </div>
          <div className="flex justify-between">
            <span>🍔 Cheese Burger</span>
            <span className="font-semibold">98 Orders</span>
          </div>
          <div className="flex justify-between">
            <span>🍝 Alfredo Pasta</span>
            <span className="font-semibold">75 Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
