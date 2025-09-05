import mysql from "mysql2/promise";

let pool;

export default async function connectDB() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,       // e.g., aws.connect.psdb.cloud
        user: process.env.DB_USER,       // schooluser
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: {
          rejectUnauthorized: true      // required for PlanetScale / AWS cloud DB
        },
      });
      console.log("✅ MySQL pool created");
    } catch (err) {
      console.error("❌ DB Pool Creation Error:", err.message);
      throw err;
    }
  }
  return pool;
}
