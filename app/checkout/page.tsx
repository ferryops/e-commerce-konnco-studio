"use client";

import Header from "@/components/Header";
import { useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}
export default function Checkout() {
  const [status, setStatus] = useState(true);
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  const userString = localStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as { username: string }) : null;
  const data = {
    username: user?.username,
    amount: total,
  };

  const handlePay = () => {
    fetch("/api/midtrans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const paymentUrl = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${data.token}`;
          window.open(paymentUrl, "_blank");
          handlePaymentSuccess(cartItems);
          setStatus(true);
        } else {
          console.error("Failed to retrieve payment token:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error during payment process:", error);
      });
  };

  const handlePaymentSuccess = (cartItems: CartItem[]) => {
    const data = {
      cartItems: cartItems,
    };

    fetch("/api/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Stock updated successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to update stock:", error);
      });
  };

  return (
    <main className="flex flex-col items-center p-16 w-full md:w-1/2 m-auto">
      <Header />
      <section className="border w-full p-4 flex flex-col gap-2">
        <p>Checkout produk</p>
        {cartItems.length > 0 ? (
          <div>
            <p className="text-xs">Total Item: {cartItems.length}</p>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Nama Produk</th>
                  <th>Jumlah</th>
                  <th className="text-right">Harga</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm border-t text-right">Total Biaya: Rp {total}</p>
            <button className="m-auto flex border p-1" onClick={() => handlePay()}>
              Bayar
            </button>
            {status ? <p className="border-2 border-green-500 p-4 mt-4 text-center">Pembayaran mu berhasil🎉</p> : null}
          </div>
        ) : (
          <p className="text-sm">Keranjang belanja Anda kosong</p>
        )}
      </section>
    </main>
  );
}
