"use client";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/lib/features/authApiSlice";
import { ProductType } from "@/types/productType";
import React, { useState } from "react";

export default function Page() {
  const { data = [], isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState<{
    title: string;
    price: number;
    images: string[];
  }>({
    title: "",
    price: 0,
    images: [],
  });
  const [editing, setEditing] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) {
      await updateProduct({ id: editing, ...form });
    } else {
      await createProduct(form);
    }
    setForm({
      title: "",
      price: 0,
      images: [],
    });
    setEditing(null);
  };

  return (
    <div className=" mx-auto py-10 flex w-[90%] gap-10">
      <div className="w-[40%]">
        {" "}
        <h1 className="text-2xl font-bold mb-6">Product Manager</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Images (comma separated URLs)"
            value={form.images.join(",")}
            onChange={(e) =>
              setForm({ ...form, images: e.target.value.split(",") })
            }
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editing ? "Update Product" : "Create Product"}
          </button>
          {editing && (
            <button
              type="button"
              className="ml-4 px-4 py-2 rounded bg-gray-300"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="w-[60%] h-[100vh] overflow-scroll">
        {" "}
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-4">
            {data.map((product: ProductType) => (
              <li
                key={product.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{product.title}</div>
                  <div className="text-gray-500">${product.price}</div>
                  {/* Only show title, price, and images */}
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 rounded text-white"
                    onClick={() => {
                      setForm({
                        title: product.title,
                        price: product.price,
                        images: product.images || [],
                      });
                      setEditing(product.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 rounded text-white"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
