import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const connection = await connectDB();

  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE username = ?", [username]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "Username not found" }, { status: 404 });
    }

    const user = rows[0] as { password: string };
    if (user.password !== password) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }
    return NextResponse.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    connection.end();
  }
}
