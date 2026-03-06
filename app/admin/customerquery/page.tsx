"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Query = {
  id: number;
  name: string;
  email: string;
  number: string;
  message: string;
  type?: "Order" | "Feedback" | "General";
};

export default function FoodQueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerQueries = async () => {
      try {
        const res = await axios.get<{ data: Query[] }>(
          "http://localhost:4000/api/query/getQuery",
        );
        setQueries(res.data.data);
      } catch (error) {
        console.error("Failed to fetch queries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerQueries();
  }, []);

  const getBadgeColor = (type?: string) => {
    switch (type) {
      case "Order":
        return "bg-red-200 text-red-800";
      case "Feedback":
        return "bg-green-200 text-green-800";
      case "General":
      default:
        return "bg-blue-200 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
          Foodies Customer Queries
        </h1>
        <p className="text-gray-700 text-sm sm:text-lg">
          Review all customer questions and feedback related to orders.
        </p>
      </header>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-green-200 text-green-900 font-semibold uppercase text-sm sm:text-base">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left">ID</th>
              <th className="py-3 px-2 sm:px-4 text-left">Name</th>
              <th className="py-3 px-2 sm:px-4 text-left hidden sm:table-cell">
                Email
              </th>
              <th className="py-3 px-2 sm:px-4 text-left hidden md:table-cell">
                Phone
              </th>
              <th className="py-3 px-2 sm:px-4 text-left">Message</th>
              <th className="py-3 px-2 sm:px-4 text-left">Type</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading queries...
                </td>
              </tr>
            ) : queries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No customer queries yet.
                </td>
              </tr>
            ) : (
              queries.map((q) => (
                <tr
                  key={q.id}
                  className="block sm:table-row hover:bg-yellow-100 transition cursor-pointer border-b sm:border-b-0 sm:border-t-0 sm:border-l-0 sm:border-r-0 sm:border-gray-200"
                >
                  <td className="py-2 px-2 sm:px-4 block sm:table-cell font-medium">
                    {q.id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 block sm:table-cell">
                    {q.name}
                  </td>
                  <td className="py-2 px-2 sm:px-4 hidden sm:table-cell">
                    {q.email}
                  </td>
                  <td className="py-2 px-2 sm:px-4 hidden md:table-cell">
                    {q.number}
                  </td>
                  <td className="py-2 px-2 sm:px-4 block sm:table-cell">
                    {q.message}
                  </td>
                  <td className="py-2 px-2 sm:px-4 block sm:table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${getBadgeColor(q.type)}`}
                    >
                      {q.type || "General"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-600 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Foodies. All rights reserved.
      </footer>
    </div>
  );
}
