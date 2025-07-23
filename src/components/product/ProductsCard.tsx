import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/productType";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/counterSlice";

type ProductCardProps = {
  product: ProductType;
};
export default function ProductsCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isBouncing, setIsBouncing] = React.useState(false);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 350);
  };
  return (
    <div>
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
      >
        <Link key={product.id} href={`/products/${product.id}`}>
          <div key={product.id} className="rounded-xl overflow-hidden">
            <Image
              width={100}
              height={100}
              className="w-full object-cover h-48"
              src={
                product.images[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJOBc888horStIw5v_cpA6OOGG39NMeDgEg&s"
              }
              alt="image"
              unoptimized
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product.title || "Classic Sneakers"}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {product.description ||
                  "Comfortable and stylish sneakers perfect for everyday wear. Available in multiple colors."}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-4 mx-5">
          <span className="text-xl font-bold text-orange-500">
            ${product.price || "79.99"}
          </span>
          <button
            onClick={handleAddToCart}
            className={`bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200 ${isBouncing ? 'animate-bounce' : ''}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
