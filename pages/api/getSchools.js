import connectDB from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await connectDB();
    const [schools] = await connection.execute('SELECT * FROM schools ORDER BY name');
    
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}