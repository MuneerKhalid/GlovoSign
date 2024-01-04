import db from '../database/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, status } = req.body;

    // Validation checks
    if (!username || !email || !password || !status) {
      res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
      return;
    }

    // You can add more specific validation checks for email format, password strength, etc.

    const query = 'INSERT INTO user (username, email, password, status) VALUES (?, ?, ?. ?)';
    const values = [username, email, password, status];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return;
      }

      console.log('Data inserted successfully:', result);
      res.status(200).json({ success: true, message: 'Signup successful' });
    });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
