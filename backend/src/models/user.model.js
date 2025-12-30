const db = require("../config/db");

async function findByEmail(email){
    const[rows]= await db.query(
        "SELECT * FROM users WHERE email= ?",[email]
    );
    return rows[0];
}

async function createUser(username, email, hashedPassword) {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  return result.insertId;
}
async function findById  (id) {
    const [rows] = await db.query(
      "SELECT id, username, email, password FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  };
  
async function updateUsername(id, username) {
    await db.query(
      "UPDATE users SET username = ? WHERE id = ?",
      [username, id]
    );
  };
  
  async function updatePassword(id, hashedPassword) {
    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, id]
    );
  };

module.exports = {
  findByEmail,
  createUser,
  findById,
  updateUsername,
  updatePassword
};
