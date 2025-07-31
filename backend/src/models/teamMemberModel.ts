import { getPool } from '../config/db.js';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  description: string;
  image: string;
  type: 'leadership' | 'steering' | 'member';
  year: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  is_active: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTeamMemberData {
  name: string;
  role: string;
  department: string;
  description: string;
  image: string;
  type: 'leadership' | 'steering' | 'member';
  year: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateTeamMemberData extends Partial<CreateTeamMemberData> {}

export const findAllTeamMembers = async (type?: string, year?: string): Promise<TeamMember[]> => {
  const pool = getPool();
  let query = 'SELECT * FROM team_members WHERE is_active = true';
  const params = [];
  let paramCount = 1;

  if (type) {
    query += ` AND type = $${paramCount}`;
    params.push(type);
    paramCount++;
  }

  if (year) {
    query += ` AND year = $${paramCount}`;
    params.push(year);
    paramCount++;
  }

  query += ' ORDER BY order_index ASC, created_at DESC';
  
  const result = await pool.query(query, params);
  return result.rows;
};

export const findTeamMembersOrganized = async (): Promise<Record<string, Record<string, TeamMember[]>>> => {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM team_members WHERE is_active = true ORDER BY year DESC, order_index ASC'
  );
  
  const organized: Record<string, Record<string, TeamMember[]>> = {};
  
  result.rows.forEach((member: TeamMember) => {
    if (!organized[member.year]) {
      organized[member.year] = {
        leadership: [],
        steering: [],
        members: []
      };
    }
    
    const categoryKey = member.type === 'member' ? 'members' : member.type;
    organized[member.year][categoryKey].push(member);
  });
  
  return organized;
};

export const findLeadershipTeam = async (): Promise<TeamMember[]> => {
  const pool = getPool();
  const currentYear = new Date().getFullYear().toString();
  const result = await pool.query(
    'SELECT * FROM team_members WHERE type = $1 AND year = $2 AND is_active = true ORDER BY order_index ASC',
    ['leadership', currentYear]
  );
  return result.rows;
};

export const findSteeringLeaders = async (): Promise<TeamMember[]> => {
  const pool = getPool();
  const currentYear = new Date().getFullYear().toString();
  const result = await pool.query(
    'SELECT * FROM team_members WHERE type = $1 AND year = $2 AND is_active = true ORDER BY order_index ASC',
    ['steering', currentYear]
  );
  return result.rows;
};

export const findTeamMemberById = async (id: number): Promise<TeamMember | undefined> => {
  const pool = getPool();
  const result = await pool.query('SELECT * FROM team_members WHERE id = $1', [id]);
  return result.rows[0];
};

export const createTeamMember = async (memberData: CreateTeamMemberData): Promise<TeamMember> => {
  const pool = getPool();
  const {
    name,
    role,
    department,
    description,
    image,
    type,
    year,
    social_links = {},
    is_active = true,
    order_index = 0
  } = memberData;

  const result = await pool.query(
    `INSERT INTO team_members (name, role, department, description, image, type, year, social_links, is_active, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [name, role, department, description, image, type, year, JSON.stringify(social_links), is_active, order_index]
  );
  return result.rows[0];
};

export const updateTeamMember = async (id: number, memberData: UpdateTeamMemberData): Promise<TeamMember | undefined> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let paramCount = 1;

  Object.entries(memberData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === 'social_links') {
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

  const query = `UPDATE team_members SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTeamMember = async (id: number): Promise<boolean> => {
  const pool = getPool();
  const result = await pool.query('DELETE FROM team_members WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const toggleTeamMemberStatus = async (id: number): Promise<TeamMember | undefined> => {
  const pool = getPool();
  const result = await pool.query(
    'UPDATE team_members SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};