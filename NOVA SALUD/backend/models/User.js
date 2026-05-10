const pool = require('../config/db');

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async create({ nombre, apellido, email, password_hash, rol_id = 1 }) {
    const query = `
      INSERT INTO users (nombre, apellido, email, password_hash, rol_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, apellido, email, rol_id
    `;
    const result = await pool.query(query, [nombre, apellido, email, password_hash, rol_id]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, nombre, apellido, email, rol_id FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;