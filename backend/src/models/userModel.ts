import { getPool } from '../config/db.js';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  is_banned: boolean;
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id: number): Promise<User | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (
  name: string, 
  email: string, 
  password: string, 
  role: string = 'admin'
): Promise<User> => {
  const pool = getPool();
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

export const validatePassword = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};