const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Kiểm tra kết nối ban đầu
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Kết nối MySQL (Pool) thành công!');
    connection.release(); // trả lại pool
  } catch (err) {
    console.error('❌ Không thể kết nối tới MySQL (Pool):', err.message);
    process.exit(1); // Dừng server nếu không kết nối được
  }
})();

module.exports = pool.promise();
