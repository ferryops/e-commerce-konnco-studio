import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const connection = await connectDB();
  const [rows] = await connection.query("SELECT * FROM products");
  connection.end();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { title, description, price, stock, status } = await req.json();

  const connection = await connectDB();
  await connection.query("INSERT INTO products (title, description, price, stock, status) VALUES (?,?,?,?,?)", [
    title,
    description,
    price,
    stock,
    status,
  ]);
  connection.end();
  const data = { title, description, price, stock, status };
  return NextResponse.json({ message: "Product created successfully", data });
}

export async function PUT(req: NextRequest) {
  const { id, title, description, price, stock, status } = await req.json();

  const connection = await connectDB();
  await connection.query("UPDATE products SET title=?, description=?, price=?, stock=?, status=? WHERE id=?", [
    title,
    description,
    price,
    stock,
    status,
    id,
  ]);
  connection.end();
  const data = { id, title, description, price, stock, status };
  return NextResponse.json({ message: "Product updated successfully", data });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const connection = await connectDB();
  await connection.query("DELETE FROM products WHERE id=?", [id]);
  connection.end();

  const data = { id };
  return NextResponse.json({ message: "Product deleted successfully", data });
}
