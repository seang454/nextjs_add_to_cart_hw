"use client";
import { useGetProductsQuery } from "@/lib/features/authApiSlice";
import React from "react";
import ProductsCard from "@/components/product/ProductsCard";
export default function Page() {
  const { data = { products: [] }, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products</p>;

  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 p-6">
      {data.products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
}
