import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export async function POST(req: NextRequest) {
  const { cartItems } = await req.json();

  try {
    const connection = await connectDB();

    for (const item of cartItems) {
      await connection.query("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.id]);
    }

    connection.end();

    return NextResponse.json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Failed to update stock:", error);
    return NextResponse.json({ error: "Failed to update stock" }, { status: 500 });
  }
}
