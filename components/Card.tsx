import React, { useEffect, useState } from "react";

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  stok: number;
}

const Card: React.FC<CardProps> = ({ id, title, description, price, stok }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cartItems.find((item: any) => item.id === id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (stok > 0) {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push({ id, title, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const handleMinToCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === id);

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity -= 1;

        if (cartItems[existingItemIndex].quantity === 0) {
          cartItems.splice(existingItemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden border px-6 py-4">
      <div>
        <h1 className="font-bold text-xl mb-2">{title}</h1>
        <p className="text-base mb-1">{description}</p>
        <p className="text-base">Rp {price}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="p-0 text-xs">Stok {stok}</p>
        <div className="flex gap-2">
          <button onClick={handleMinToCart} disabled={quantity <= 0} className="border rounded-full px-1">
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              setQuantity(quantity + 1), handleAddToCart();
            }}
            disabled={quantity >= stok}
            className="border rounded-full px-1"
          >
            +
          </button>
        </div>
        <button className={`border px-2 text-sm ${stok <= 0 ? "p-0 border-red-500" : ""}`} disabled={stok <= 0}>
          {stok <= 0 ? "Habis" : "Beli"}
        </button>
      </div>
    </div>
  );
};

export default Card;
