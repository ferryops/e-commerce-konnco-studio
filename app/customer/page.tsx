"use client";
import Card from "@/components/Card";

export default function Customer() {
  return (
    <main className="flex flex-col items-center p-16">
      <section className="border w-full p-4 flex flex-col gap-2">
        <p>Belanja murah ya di Konnco Studio</p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
          {produk
            .filter((productActive) => productActive.status === 1)
            .map((data) => (
              <Card
                key={data.id}
                id={data.id}
                title={data.title}
                description={data.description}
                price={data.price}
                stok={data.stok}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

const produk = [
  {
    id: 1,
    title: "Produk 1",
    description: "Description 1",
    price: 10000,
    stok: 100,
    status: 1,
  },
  {
    id: 2,
    title: "Produk 2",
    description: "Description 2",
    price: 10000,
    stok: 30,
    status: 0,
  },
  {
    id: 3,
    title: "Produk 3",
    description: "Description 3",
    price: 10000,
    stok: 0,
    status: 1,
  },
  {
    id: 4,
    title: "Produk 4",
    description: "Description 4",
    price: 20000,
    stok: 10,
    status: 1,
  },
];
