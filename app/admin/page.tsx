"use client";
import Header from "@/components/Header";
import Unauthorized from "@/components/Unauthorized";
import React, { useState, useEffect, ChangeEvent } from "react";

const Admin = () => {
  const [produk, setProduk] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    status: 0,
  });
  const userString = localStorage.getItem("user");
  const userRole = userString ? (JSON.parse(userString) as { role: string }) : null;

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProduk(data));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        updateData(),
          setFormData({
            id: "",
            title: "",
            description: "",
            price: "",
            stock: "",
            status: 0,
          });
      });
  };

  const handleEdit = () => {
    fetch("/api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        setFormData({
          id: "",
          title: "",
          description: "",
          price: "",
          stock: "",
          status: 0,
        });
        updateData();
        setEditing(false);
      });
  };

  const enableEdit = (item: any) => {
    setEditing(true);
    setFormData({
      id: item.id ?? "",
      title: item.title ?? "",
      description: item.description ?? "",
      price: item.price ?? 0,
      stock: item.stock ?? 0,
      status: item.status ?? 0,
    });
  };

  const handleDelete = (id: number) => {
    const data = { id: id };
    fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      const updatedProduk = produk.filter((item: any) => item.id !== id);
      setProduk(updatedProduk);
    });
  };

  return (
    <main className="flex flex-col items-center p-16">
      {userRole?.role === "admin" ? (
        <>
          <Header />
          <section className="border w-full p-4 flex flex-col gap-2">
            <p className="text-lg font-semibold">Admin</p>
            <div className="flex flex-col gap-2 w-full md:w-1/2 m-auto">
              <input
                className="border p-1"
                type="text"
                name="title"
                value={formData.title}
                placeholder="Title"
                onChange={handleChange}
              />
              <textarea
                className="border p-1"
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
              />
              <input
                className="border p-1"
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                onChange={handleChange}
              />
              <input
                className="border p-1"
                type="number"
                name="stock"
                value={formData.stock}
                placeholder="Stok"
                onChange={handleChange}
              />
              <select className="border p-1" name="status" value={formData.status} onChange={handleChange}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
              {editing ? (
                <button className="border p-1" onClick={() => handleEdit()}>
                  Update
                </button>
              ) : (
                <button className="border p-1" onClick={() => handleSubmit()}>
                  Tambah Produk
                </button>
              )}
            </div>
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
                {produk.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border p-2 text-center">{item.id}</td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2">{item.price}</td>
                    <td className="border p-2">{item.stock}</td>
                    <td className="border p-2">{item.status === 1 ? "Active" : "Inactive"}</td>
                    <td className="border p-2 flex justify-center gap-2">
                      <button onClick={() => enableEdit(item)} className="text-xs border p-1">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-xs border p-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <Unauthorized />
      )}
    </main>
  );

  function updateData() {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProduk(data));
  }
};

export default Admin;
