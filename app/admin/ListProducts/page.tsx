"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Image from "next/image";
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(
        "http://localhost:4000/api/products/ListData",
      );
      setProducts(res.data);
      toast.success("Products loaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/products/deleteproducts/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      const data = await res.json();
      console.log("Deleted product:", data.product);

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.info("Product removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen p-8 ">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {products.length === 0 && (
        <p className="text-gray-500">No products available.</p>
      )}

      {/* Scrollable table container */}
      <div className="overflow-x-auto max-h-600px">
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="  bg-gray-200 sticky top-0">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt=""
                      width={80}
                      height={80}
                      unoptimized={true}
                      className="object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4 text-blue-600 font-bold">
                  ${product.price}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-8 h-8 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
