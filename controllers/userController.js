const db = require('../db');

exports.getUsers = async (req, res) => {
  // const [rows] = await db.query('SELECT * FROM users');
  // res.json(rows);
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('❌ Lỗi truy vấn:', err.message);
    res.status(501).send('Lỗi máy chủ');
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  res.json({ message: 'User created' });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  res.json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'User deleted' });
};
