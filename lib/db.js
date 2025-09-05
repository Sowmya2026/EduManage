import mysql from "mysql2/promise";

// Create a pool using env variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // ✅ from .env / Vercel
  user: process.env.DB_USER,       // ✅ from .env / Vercel
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true       // ✅ PlanetScale requires SSL
  }
});

export default pool;
