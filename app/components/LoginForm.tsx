"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../storecontect/Contectapi";

export default function LoginForm() {
    const router = useRouter();
    const { user, login, signup, logout } = useCart();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage("Please fill all fields.");
            return;
        }
        const success = login(email, password);
        if (success) {
            setMessage("Login successful! Redirecting...");
            setTimeout(() => router.push("/"), 1000);
        } else {
            setMessage("Invalid email or password.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 focus:outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 focus:outline-none" />
            <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-500">Login</button>
            {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
    );
}
