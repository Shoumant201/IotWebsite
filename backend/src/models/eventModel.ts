import { getPool } from '../config/db.js';

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  prerequisites: string[];
  highlights: string[];
  agenda: { time: string; activity: string }[];
  attendees?: string;
  speakers?: string;
  is_grand_event: boolean;
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateEventData {
  title: string;
  slug: string;
  description: string;
  full_description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  prerequisites?: string[];
  highlights?: string[];
  agenda?: { time: string; activity: string }[];
  attendees?: string;
  speakers?: string;
  is_grand_event?: boolean;
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

export const findAllEvents = async (isGrandEvent?: boolean): Promise<Event[]> => {
  const pool = getPool();
  let query = 'SELECT * FROM events WHERE is_active = true';
  const params = [];

  if (isGrandEvent !== undefined) {
    query += ' AND is_grand_event = $1';
    params.push(isGrandEvent);
  }

  query += ' ORDER BY order_index ASC, created_at DESC';
  
  const result = await pool.query(query, params);
  return result.rows;
};

export const findEventById = async (id: number): Promise<Event | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

export const findEventBySlug = async (slug: string): Promise<Event | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM events WHERE slug = $1 AND is_active = true', [slug]);
  return result.rows[0];
};

export const findGrandEvent = async (): Promise<Event | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM events WHERE is_grand_event = true AND is_active = true ORDER BY created_at DESC LIMIT 1'
  );
  return result.rows[0];
};

export const createEvent = async (eventData: CreateEventData): Promise<Event> => {
  const pool = getPool();
  const {
    title,
    slug,
    description,
    full_description,
    image,
    date,
    time,
    location,
    duration,
    level,
    prerequisites = [],
    highlights = [],
    agenda = [],
    attendees = 'TBD',
    speakers = 'TBD',
    is_grand_event = false,
    is_active = true,
    order_index = 0
  } = eventData;

  const result = await pool.query(
    `INSERT INTO events (title, slug, description, full_description, image, date, time, location, 
     duration, level, prerequisites, highlights, agenda, attendees, speakers, is_grand_event, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
    [title, slug, description, full_description, image, date, time, location, duration, level,
     JSON.stringify(prerequisites), JSON.stringify(highlights), JSON.stringify(agenda),
     attendees, speakers, is_grand_event, is_active, order_index]
  );
  return result.rows[0];
};

export const updateEvent = async (id: number, eventData: UpdateEventData): Promise<Event | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(eventData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'prerequisites' || key === 'highlights' || key === 'agenda') {
        fields.push(`${key} = $${paramCount}`);
        values.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
      }
      paramCount++;
    }
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE events SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleEventStatus = async (id: number): Promise<Event | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE events SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};