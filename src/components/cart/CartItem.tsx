"use client";

import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeFromCart, updateQuantity } from "@/lib/features/counterSlice";
import { CartItem as CartItemType } from "@/lib/features/counterSlice"; // Import the CartItem type

interface CartItemProps {
  item: CartItemType; // The cart item to display
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  // STEP 10A: Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    // Send action to Redux to update this item's quantity
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  // STEP 10B: Handle item removal
  const handleRemove = () => {
    // Send action to Redux to remove this item completely
    dispatch(removeFromCart(item.id));
  };

  // STEP 10C: Render the cart item
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              width={64}
              height={64}
              unoptimized
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              className="object-cover rounded-lg"
              priority={false}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{item.title}</h3>
            <p className="text-lg font-bold text-primary">${item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            {/* Decrease quantity button */}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1} // Can't go below 1
            >
              <Minus className="h-4 w-4" />
            </Button>

            {/* Quantity input field */}
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(Number.parseInt(e.target.value) || 1)
              }
              className="w-16 text-center"
              min="1"
            />

            {/* Increase quantity button */}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Price and Remove */}
          <div className="text-right">
            {/* Total price for this item (price × quantity) */}
            <p className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove item button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
