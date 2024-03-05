import { createConnection } from "mysql2/promise";
async function connectDB() {
  const connection = await createConnection({
    host: "localhost",
    user: process.env.NEXT_PUBLIC_USERNAME,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    database: "e_commerce",
  });

  try {
    await connection.execute("SELECT 1");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  return connection;
}

export { connectDB };
