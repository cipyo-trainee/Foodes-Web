"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo / Brand */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">MyApp</h2>
          <p className="text-gray-400 text-sm">
            Building modern web apps with Next.js & TypeScript.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-yellow-400">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">LinkedIn</a>
          </div>
        </div>

        {/* Newsletter / Email */}
        <div>
          <h3 className="font-semibold mb-2">Subscribe</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black w-full sm:w-auto text-white bg-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved. | 
        <Link href="/privacy" className="hover:text-yellow-400 ml-2">Privacy Policy</Link>
      </div>
    </footer>
  );
}
