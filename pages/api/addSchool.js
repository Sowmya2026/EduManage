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
    const connection = await connectDB();
    
    // Parse the form data using formidable
    const form = new IncomingForm();
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Extract form fields - these come from the actual form submission
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Check if email already exists
    const [existingSchools] = await connection.execute(
      'SELECT id FROM schools WHERE email_id = ?',
      [email_id]
    );
    
    if (existingSchools.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    let imagePath = null;
    
    // Handle image upload if present
    if (files && files.image) {
      const image = files.image;
      
      // Check if image is an array (multiple files) or single file
      const imageFile = Array.isArray(image) ? image[0] : image;
      
      if (imageFile.size > 0) { // Check if file was actually uploaded
        const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const ext = path.extname(imageFile.originalFilename || 'image.jpg');
        const filename = `school-${timestamp}${ext}`;
        imagePath = `/schoolImages/${filename}`;
        
        // Read the file and write to disk
        const fileData = fs.readFileSync(imageFile.filepath);
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, fileData);
      }
    }
    
    // Insert school into database with ACTUAL form data
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    );
    
    res.status(201).json({ 
      message: 'School added successfully', 
      schoolId: result.insertId 
    });
    
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}