import connectDB from '../../lib/db';
import path from 'path';
import fs from 'fs';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pool = await connectDB();

    const form = new IncomingForm();

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const name = fields.name?.toString();
    const address = fields.address?.toString();
    const city = fields.city?.toString();
    const state = fields.state?.toString();
    const contact = fields.contact?.toString();
    const email_id = fields.email_id?.toString();

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await pool.execute(
      'SELECT id FROM schools WHERE email_id = ?',
      [email_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let imagePath = null;
    if (files.image) {
      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const ext = path.extname(imageFile.originalFilename || 'image.jpg');
      const filename = `school-${Date.now()}${ext}`;
      fs.writeFileSync(path.join(uploadDir, filename), fs.readFileSync(imageFile.filepath));
      imagePath = `/schoolImages/${filename}`;
    }

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    );

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });

  } catch (err) {
    console.error('❌ Error adding school:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}
