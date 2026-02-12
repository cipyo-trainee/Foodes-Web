"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<typeof formData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      zipCode: "",
      country: "",
    };

    if (!formData.firstName) { newErrors.firstName = "First Name is required"; valid = false; }
    if (!formData.lastName) { newErrors.lastName = "Last Name is required"; valid = false; }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Valid email is required"; valid = false; }
    if (!formData.phone || !/^\d{10,15}$/.test(formData.phone)) { newErrors.phone = "Valid phone number is required"; valid = false; }
    if (!formData.address) { newErrors.address = "Address is required"; valid = false; }
    if (!formData.state) { newErrors.state = "State is required"; valid = false; }
    if (!formData.zipCode) { newErrors.zipCode = "Zip Code is required"; valid = false; }
    if (!formData.country) { newErrors.country = "Country is required"; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Order Submitted:", formData);

    router.push("/order-confirmation");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Address (full width) */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-gray-700">Street Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        {/* Zip Code */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1 text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 mt-4"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
