const bcrypt = require('bcryptjs');
const db = require('../config/database.js');

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists in the database
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    await db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // user from the database
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //hashed password
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Sign in successful', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
