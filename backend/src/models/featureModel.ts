import { getPool } from '../config/db.js';

export interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  icon?: string;
  link: string;
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFeatureData {
  title: string;
  description: string;
  image: string;
  icon?: string;
  link?: string;
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateFeatureData extends Partial<CreateFeatureData> {}

export const findAllFeatures = async (): Promise<Feature[]> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM features WHERE is_active = true ORDER BY order_index ASC, created_at DESC'
  );
  return result.rows;
};

export const findFeatureById = async (id: number): Promise<Feature | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM features WHERE id = $1', [id]);
  return result.rows[0];
};

export const createFeature = async (featureData: CreateFeatureData): Promise<Feature> => {
  const pool = getPool();
  const {
    title,
    description,
    image,
    icon,
    link = '#',
    is_active = true,
    order_index = 0
  } = featureData;

  const result = await pool.query(
    `INSERT INTO features (title, description, image, icon, link, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, description, image, icon, link, is_active, order_index]
  );
  return result.rows[0];
};

export const updateFeature = async (id: number, featureData: UpdateFeatureData): Promise<Feature | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(featureData).forEach(([key, value]) => {
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

  const query = `UPDATE features SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteFeature = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM features WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleFeatureStatus = async (id: number): Promise<Feature | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE features SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};