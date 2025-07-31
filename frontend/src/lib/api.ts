// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// API utility function
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'API request failed');
    }

    return result.data as T;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Hero API types
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
  created_at: string;
  updated_at: string;
}

// Feature API types
export interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  icon?: string;
  link: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Event API types
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
  created_at: string;
  updated_at: string;
}

// Timeline API types
export interface Timeline {
  id: number;
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  is_future: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Team Member API types
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
  created_at: string;
  updated_at: string;
}

// Testimonial API types
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
  created_at: string;
  updated_at: string;
}

// API functions for Heroes
export const heroApi = {
  getAll: () => apiRequest<Hero[]>('/heroes'),
  getById: (id: number) => apiRequest<Hero>(`/heroes/${id}`),
  create: (data: Partial<Hero>) => apiRequest<Hero>('/heroes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Hero>) => apiRequest<Hero>(`/heroes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/heroes/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<Hero>(`/heroes/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// API functions for Features
export const featureApi = {
  getAll: () => apiRequest<Feature[]>('/features'),
  getById: (id: number) => apiRequest<Feature>(`/features/${id}`),
  create: (data: Partial<Feature>) => apiRequest<Feature>('/features', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Feature>) => apiRequest<Feature>(`/features/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/features/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<Feature>(`/features/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// API functions for Events
export const eventApi = {
  getAll: (isGrandEvent?: boolean) => {
    const params = isGrandEvent !== undefined ? `?isGrandEvent=${isGrandEvent}` : '';
    return apiRequest<Event[]>(`/events${params}`);
  },
  getById: (id: number) => apiRequest<Event>(`/events/${id}`),
  getBySlug: (slug: string) => apiRequest<Event>(`/events/slug/${slug}`),
  getCurrentGrand: () => apiRequest<Event>('/events/grand/current'),
  create: (data: Partial<Event>) => apiRequest<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Event>) => apiRequest<Event>(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/events/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<Event>(`/events/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// API functions for Timeline
export const timelineApi = {
  getAll: () => apiRequest<Timeline[]>('/timeline'),
  getById: (id: number) => apiRequest<Timeline>(`/timeline/${id}`),
  create: (data: Partial<Timeline>) => apiRequest<Timeline>('/timeline', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Timeline>) => apiRequest<Timeline>(`/timeline/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/timeline/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<Timeline>(`/timeline/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// API functions for Team
export const teamApi = {
  getAll: (type?: string, year?: string) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (year) params.append('year', year);
    const queryString = params.toString();
    return apiRequest<TeamMember[]>(`/team${queryString ? `?${queryString}` : ''}`);
  },
  getOrganized: () => apiRequest<Record<string, Record<string, TeamMember[]>>>('/team/organized'),
  getLeadership: () => apiRequest<TeamMember[]>('/team/leadership'),
  getSteering: () => apiRequest<TeamMember[]>('/team/steering'),
  getById: (id: number) => apiRequest<TeamMember>(`/team/${id}`),
  create: (data: Partial<TeamMember>) => apiRequest<TeamMember>('/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<TeamMember>) => apiRequest<TeamMember>(`/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/team/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<TeamMember>(`/team/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// API functions for Testimonials
export const testimonialApi = {
  getAll: () => apiRequest<Testimonial[]>('/testimonials'),
  getById: (id: number) => apiRequest<Testimonial>(`/testimonials/${id}`),
  create: (data: Partial<Testimonial>) => apiRequest<Testimonial>('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: Partial<Testimonial>) => apiRequest<Testimonial>(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => apiRequest<void>(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
  toggle: (id: number) => apiRequest<Testimonial>(`/testimonials/${id}/toggle`, {
    method: 'PATCH',
  }),
};

// Export all APIs
export const api = {
  heroes: heroApi,
  features: featureApi,
  events: eventApi,
  timeline: timelineApi,
  team: teamApi,
  testimonials: testimonialApi,
};