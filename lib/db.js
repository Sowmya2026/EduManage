import mysql from "mysql2/promise";

let pool;

export default async function connectDB() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,       // e.g. aws.connect.psdb.cloud
        user: process.env.DB_USER,       // schooluser
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
          rejectUnauthorized: true,      // required for PlanetScale / AWS
        },
        connectionLimit: 10,
      });
      console.log("✅ MySQL pool created");
    } catch (err) {
      console.error("❌ DB Pool Creation Error:", err);
      throw err;
    }
  }
  return pool;
}
