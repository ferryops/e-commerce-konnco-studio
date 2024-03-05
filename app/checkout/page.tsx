"use client";

export default function Checkout() {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <main className="flex flex-col items-center p-16">
      <section className="border w-full md:w-1/2 p-4 flex flex-col gap-2">
        <p>Checkout produk</p>
        {cartItems.length > 0 ? (
          <div>
            <p className="text-xs">Total Item: {cartItems.length}</p>
            <ul>
              <div className="flex justify-between border-b">
                <p>Nama Produk</p>
                <p>Jumlah</p>
                <p>Harga</p>
              </div>
              {cartItems.map((item: any) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <p>{item.title}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm border-t text-right">Total Biaya: Rp {total}</p>
            <button className="m-auto flex border p-1">Bayar</button>
          </div>
        ) : (
          <p className="text-sm">Keranjang belanja Anda kosong</p>
        )}
      </section>
    </main>
  );
}
