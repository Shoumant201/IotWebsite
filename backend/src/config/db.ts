import pkg from 'pg';
const { Pool } = pkg;
import type { Pool as PoolType } from 'pg';

let pool: PoolType | null = null;

export const initializeDB = (): PoolType => {
  console.log('Database config:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    hasConnectionString: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV
  });

  // Use DATABASE_URL for production (Railway) or individual params for development
  if (process.env.DATABASE_URL) {
    console.log('Using DATABASE_URL for connection');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  } else {
    console.log('Using individual database parameters');
    pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'iot_innovation_hub',
      password: process.env.DB_PASSWORD || 'password',
      port: parseInt(process.env.DB_PORT || '5432'),
    });
  }
  
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
  
  try {
    // Users table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id serial PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password text NOT NULL,
        role varchar(20) DEFAULT 'admin',
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        is_banned boolean DEFAULT false
      );
    `);

    // Heroes table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.heroes (
        id serial PRIMARY KEY,
        title varchar(255) NOT NULL,
        subtitle varchar(255) NOT NULL,
        description text NOT NULL,
        background_image varchar(500) NOT NULL,
        cta_text varchar(100) DEFAULT 'Get Started',
        cta_link varchar(500) DEFAULT '#',
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Features table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.features (
        id serial PRIMARY KEY,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        image varchar(500) NOT NULL,
        icon varchar(500),
        link varchar(500) DEFAULT '#',
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Events table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.events (
        id serial PRIMARY KEY,
        title varchar(255) NOT NULL,
        slug varchar(255) UNIQUE NOT NULL,
        description text NOT NULL,
        full_description text NOT NULL,
        image varchar(500) NOT NULL,
        date varchar(100) NOT NULL,
        time varchar(100) NOT NULL,
        location varchar(255) NOT NULL,
        duration varchar(100) NOT NULL,
        level varchar(50) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')) NOT NULL,
        prerequisites jsonb DEFAULT '[]',
        highlights jsonb DEFAULT '[]',
        agenda jsonb DEFAULT '[]',
        attendees varchar(100) DEFAULT 'TBD',
        speakers varchar(100) DEFAULT 'TBD',
        is_grand_event boolean DEFAULT false,
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Timeline events table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.timeline_events (
        id serial PRIMARY KEY,
        year varchar(10) NOT NULL,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        side varchar(10) CHECK (side IN ('left', 'right')) NOT NULL,
        is_future boolean DEFAULT false,
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Team members table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.team_members (
        id serial PRIMARY KEY,
        name varchar(255) NOT NULL,
        role varchar(255) NOT NULL,
        department varchar(255) NOT NULL,
        description text NOT NULL,
        image varchar(500) NOT NULL,
        type varchar(20) CHECK (type IN ('leadership', 'steering', 'member')) NOT NULL,
        year varchar(10) NOT NULL,
        social_links jsonb DEFAULT '{}',
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Testimonials table
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS public.testimonials (
        id serial PRIMARY KEY,
        name varchar(255) NOT NULL,
        role varchar(255) NOT NULL,
        company varchar(255) NOT NULL,
        content text NOT NULL,
        image varchar(500) NOT NULL,
        rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
        is_active boolean DEFAULT true,
        order_index integer DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_events_is_grand ON events(is_grand_event)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_team_type_year ON team_members(type, year)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_heroes ON heroes(is_active)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_features ON features(is_active)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_events ON events(is_active)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_timeline ON timeline_events(is_active)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_team ON team_members(is_active)');
    await currentPool.query('CREATE INDEX IF NOT EXISTS idx_active_records_testimonials ON testimonials(is_active)');

    console.log("All tables created successfully!");
    console.log("Tables created:");
    console.log("- users");
    console.log("- heroes");
    console.log("- features");
    console.log("- events");
    console.log("- timeline_events");
    console.log("- team_members");
    console.log("- testimonials");
    console.log("- Database indexes created for performance");
    
  } catch (err) {
    console.error("Error creating tables:", err);
    throw err;
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