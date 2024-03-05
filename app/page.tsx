"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        const user = data.user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in:", user);

        if (user.role === "admin") {
          router.push("/admin");
        } else if (user.role === "customer") {
          router.push("/customer");
        }
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <main className="flex flex-col items-center p-24">
      <section>
        <form className="flex flex-col gap-4 border p-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="admin"
              className="p-2 border"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="p-2 border"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="p-1 bg-gray-100 text-sm">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
