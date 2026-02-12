"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../storecontect/Contectapi";

export default function SignupForm() {
  const router = useRouter();
  const { user, signup,logout } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    signup(email, password);
    setMessage("Signup successful! Redirecting...");
    setTimeout(() => router.push("/"), 1000);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-500"
      >
        Signup
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}

      <p className="mt-4 text-sm text-gray-300">
        Already have an account?{" "}
        <a href="/Login" className="text-yellow-400 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
