"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  status: number;
}

export default function Customer() {
  const [produk, setProduk] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data: Product[]) => setProduk(data));
  }, []);

  return (
    <main className="flex flex-col items-center p-16">
      <Header />
      <section className="border w-full p-4 flex flex-col gap-2">
        <p>Belanja murah ya di Konnco Studio</p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
          {produk.length ? (
            <>
              {produk
                .filter((product: Product) => product.status === 1)
                .map((product: Product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    stok={product.stock}
                  />
                ))}
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
