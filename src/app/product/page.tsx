"use client";
import ProductCard from "@/components/product/ProductCard";
import React from "react";
import Link from "next/link";
import { useGetProductsQuery } from "@/lib/features/authApiSlice";

export default function ProductPage() {
  // const res = await fetch(`${process.env.BASE_URL_API}products`);
  // if (!res.ok) {
  //   throw new Error('Failed to fetch products');
  // }
  // const data = await res.json();
  // const products: ProductType[] = data.products;

  // Using RTK Query to fetch products
  const { data = { products: [] }, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products</p>;
  console.log(data);

  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="font-bold text-[24px] text-blue-500 uppercase">
        Product Page
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {data.products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="no-underline"
          >
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnail={product.thumbnail}
              category={product.category}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
