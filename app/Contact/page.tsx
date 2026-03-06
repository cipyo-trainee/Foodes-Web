"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Query = {
  id: number;
  name: string;
  email: string;
  number: string; 
  message: string;
};


export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await axios.post<Query>(
      "http://localhost:4000/api/query/createQuery",
      formData
    );

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", number: "", message: "" });
  } catch (error) {
    console.error(error)
    toast.error("Failed to send message");
  }
};
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-green-600 py-20 text-center bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl text-gray-600">
          We’d love to hear from you! Reach out for any questions, feedback, or support.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 rounded-2xl shadow-md hover:from-green-500 hover:to-green-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-8">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p><span className="font-semibold">Address:</span> 123 Foodes Street, Flavor City, FC 12345</p>
            <p><span className="font-semibold">Email:</span> support@foodes.com</p>
            <p><span className="font-semibold">Phone:</span> +1 (123) 456-7890</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-bold">Facebook</a>
              <a href="#" className="text-blue-400 hover:text-blue-600 font-bold">Twitter</a>
              <a href="#" className="text-pink-500 hover:text-pink-700 font-bold">Instagram</a>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0867896551565!2d-122.41941508468107!3d37.77492977975953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c0c8f5f97%3A0x2c841f7344ec1aaf!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1678900000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}