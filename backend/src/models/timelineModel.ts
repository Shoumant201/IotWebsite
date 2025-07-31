import { getPool } from '../config/db.js';

export interface Timeline {
  id: number;
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  is_future: boolean;
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTimelineData {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  is_future?: boolean;
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateTimelineData extends Partial<CreateTimelineData> {}

export const findAllTimelineEvents = async (): Promise<Timeline[]> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM timeline_events WHERE is_active = true ORDER BY order_index ASC, created_at ASC'
  );
  return result.rows;
};

export const findTimelineEventById = async (id: number): Promise<Timeline | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM timeline_events WHERE id = $1', [id]);
  return result.rows[0];
};

export const createTimelineEvent = async (timelineData: CreateTimelineData): Promise<Timeline> => {
  const pool = getPool();
  const {
    year,
    title,
    description,
    side,
    is_future = false,
    is_active = true,
    order_index = 0
  } = timelineData;

  const result = await pool.query(
    `INSERT INTO timeline_events (year, title, description, side, is_future, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [year, title, description, side, is_future, is_active, order_index]
  );
  return result.rows[0];
};

export const updateTimelineEvent = async (id: number, timelineData: UpdateTimelineData): Promise<Timeline | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(timelineData).forEach(([key, value]) => {
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

  const query = `UPDATE timeline_events SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTimelineEvent = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM timeline_events WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleTimelineEventStatus = async (id: number): Promise<Timeline | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE timeline_events SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};