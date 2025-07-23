"use client";
import { useGetProductsQuery } from "@/lib/features/authApiSlice";
import React from "react";
import ProductsCard from "@/components/product/ProductsCard";
export default function Page() {
  const { data, isLoading, error } = useGetProductsQuery();
  console.log("data :>> ", data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-xl shadow-lg flex flex-col items-center max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
        <h2 className="text-xl font-bold mb-2">Failed to load products</h2>
        <p className="text-sm text-red-600 mb-4">There was a problem fetching the product list. Please try again later.</p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    </div>
  );
  if (!data || data.length === 0) {
    return <p>No products available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 p-6">
      {data.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
}
