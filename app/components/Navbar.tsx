"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../storecontect/Contectapi";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import { ShoppingCart, Menu, X } from "@deemlol/next-icons";

type NavLink = {
  name: string;
  path: string;
};

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Contact", path: "/Contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gray-800 text-white rounded-b-lg">
      {/* Top Row (logo + hamburger on mobile) */}
      <div className="w-full flex items-center justify-between md:w-auto">
        {/* Logo (UNCHANGED) */}
        <Link href="/" className="text-xl font-bold hover:text-yellow-400">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full mr-2"
          />
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* EVERYTHING ELSE (unchanged content) */}
      <div
        className={`w-full md:w-auto flex-col md:flex-row items-center gap-3 md:gap-8
        ${open ? "flex" : "hidden"} md:flex`}
      >
        {/* Links */}
        <ul className="flex flex-col md:flex-row gap-6">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                onClick={() => setOpen(false)}
                className={`hover:text-gray-300 ${
                  pathname === link.path ? "text-yellow-400" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <form className="relative">
          <input
            type="text"
            placeholder="Search food..."
            className="px-3 py-1 rounded-l-md focus:outline-none text-white bg-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 px-3 py-1 rounded-r-md font-bold hover:bg-yellow-500"
          >
            Search
          </button>
        </form>

        {/* Cart */}
        <Link href="/CartItem" className="relative hover:text-yellow-400">
          <ShoppingCart size={24} color="#0ca019" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
