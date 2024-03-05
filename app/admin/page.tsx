"use client";
import React, { useState } from "react";

const produkData = [
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

const Admin = () => {
  const [produk, setProduk] = useState(produkData);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    stok: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduk = {
      id: produk.length + 1,
      title: formData.title,
      description: formData.description,
      price: parseInt(formData.price),
      stok: parseInt(formData.stok),
      status: parseInt(formData.status),
    };
    setProduk([...produk, newProduk]);
    setFormData({
      id: "",
      title: "",
      description: "",
      price: "",
      stok: "",
      status: "",
    });
  };

  const handleDelete = (id: number) => {
    const updatedProduk = produk.filter((item) => item.id !== id);
    setProduk(updatedProduk);
  };

  return (
    <main className="flex flex-col items-center p-16">
      <section className="border w-full p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold">Admin</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} />
          <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} />
          <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} />
          <input type="number" name="stok" value={formData.stok} placeholder="Stok" onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <button type="submit">Tambah Produk</button>
        </form>
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stok</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.price}</td>
                <td className="border p-2">{item.stok}</td>
                <td className="border p-2">{item.status === 1 ? "Active" : "Inactive"}</td>
                <td className="border p-2">
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Admin;
