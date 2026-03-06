"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
export default function ProductForm() {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please select an image");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);

            const res = await axios.post("http://localhost:4000/api/products/food", formData);

            toast.success(res.data.message || "Product uploaded successfully!");

            // clear form
            setImage(null);
            setName("");
            setDescription("");
            setPrice("");
        } catch {
            console.error("Upload error:",);
            toast.error("Upload failed");
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center p-3  ">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Add Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">
                            Product Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Upload Product
                    </button>
                </form>
            </div>
        </div>
    );
}