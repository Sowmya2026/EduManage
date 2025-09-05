import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const [schools] = await pool.execute(
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY name"
    );

    res.status(200).json(schools);
  } catch (err) {
    console.error("❌ Error fetching schools:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
