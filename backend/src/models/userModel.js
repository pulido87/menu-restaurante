import { query } from '../config/db.js';

export const createUser = async ({ name, phone, email, passwordHash, role }) => {
  const sql = `
    INSERT INTO users (name, phone, email, password_hash, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, phone, email, role, rating, created_at
  `;
  const { rows } = await query(sql, [name, phone, email, passwordHash, role]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await query('SELECT id, name, phone, email, role, rating, created_at FROM users WHERE id = $1', [id]);
  return rows[0];
};

export const updateUserRating = async (id, rating) => {
  await query('UPDATE users SET rating = $1 WHERE id = $2', [rating, id]);
};
