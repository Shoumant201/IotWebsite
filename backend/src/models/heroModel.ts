import { getPool } from '../config/db.js';

export interface Hero {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateHeroData {
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  cta_text?: string;
  cta_link?: string;
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateHeroData extends Partial<CreateHeroData> {}

export const findAllHeroes = async (): Promise<Hero[]> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM heroes WHERE is_active = true ORDER BY order_index ASC, created_at DESC'
  );
  return result.rows;
};

export const findHeroById = async (id: number): Promise<Hero | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM heroes WHERE id = $1', [id]);
  return result.rows[0];
};

export const createHero = async (heroData: CreateHeroData): Promise<Hero> => {
  const pool = getPool();
  const {
    title,
    subtitle,
    description,
    background_image,
    cta_text = 'Get Started',
    cta_link = '#',
    is_active = true,
    order_index = 0
  } = heroData;

  const result = await pool.query(
    `INSERT INTO heroes (title, subtitle, description, background_image, cta_text, cta_link, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [title, subtitle, description, background_image, cta_text, cta_link, is_active, order_index]
  );
  return result.rows[0];
};

export const updateHero = async (id: number, heroData: UpdateHeroData): Promise<Hero | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(heroData).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE heroes SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteHero = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM heroes WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleHeroStatus = async (id: number): Promise<Hero | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE heroes SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};