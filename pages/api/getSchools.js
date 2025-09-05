import connectDB from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const pool = await connectDB();
    const [schools] = await pool.execute("SELECT * FROM schools ORDER BY name");

    res.status(200).json(schools);
  } catch (error) {
    console.error("❌ Error fetching schools:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
