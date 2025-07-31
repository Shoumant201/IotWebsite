import { getPool } from '../config/db.js';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTestimonialData {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating?: number;
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {}

export const findAllTestimonials = async (): Promise<Testimonial[]> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM testimonials WHERE is_active = true ORDER BY order_index ASC, created_at DESC'
  );
  return result.rows;
};

export const findTestimonialById = async (id: number): Promise<Testimonial | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
  return result.rows[0];
};

export const createTestimonial = async (testimonialData: CreateTestimonialData): Promise<Testimonial> => {
  const pool = getPool();
  const {
    name,
    role,
    company,
    content,
    image,
    rating = 5,
    is_active = true,
    order_index = 0
  } = testimonialData;

  const result = await pool.query(
    `INSERT INTO testimonials (name, role, company, content, image, rating, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, role, company, content, image, rating, is_active, order_index]
  );
  return result.rows[0];
};

export const updateTestimonial = async (id: number, testimonialData: UpdateTestimonialData): Promise<Testimonial | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(testimonialData).forEach(([key, value]) => {
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

  const query = `UPDATE testimonials SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTestimonial = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleTestimonialStatus = async (id: number): Promise<Testimonial | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE testimonials SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};