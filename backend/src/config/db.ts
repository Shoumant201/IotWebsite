import pkg from 'pg';
const { Pool } = pkg;
import type { Pool as PoolType } from 'pg';

let pool: PoolType | null = null;

export const initializeDB = (): PoolType => {
  console.log('Database config:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });
  
  return pool;
};

export const getPool = (): PoolType => {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDB() first.');
  }
  return pool;
};

export const createTables = async (): Promise<void> => {
  const currentPool = getPool(); // This will throw if not initialized
  
  const queryText = `
    CREATE TABLE IF NOT EXISTS public.users (
      id serial PRIMARY KEY,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      password text NOT NULL,
      role varchar(20) DEFAULT 'admin',
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      is_banned boolean DEFAULT false
    );
  `;

  try {
    await currentPool.query(queryText);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

export const testDBConnection = async (): Promise<void> => {
  const currentPool = getPool(); // This will throw if not initialized
  
  try {
    const res = await currentPool.query('SELECT NOW()');
    console.log('Database connected at:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

// Export a function that returns the pool instead of the pool directly
export const getPoolInstance = (): PoolType => getPool();

export default getPoolInstance;