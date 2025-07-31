// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Base configuration
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VERIFY_TOKEN: '/auth/verify-token',
  },
  
  // Admin management endpoints
  ADMIN: {
    // Profile management (both admin and super admin)
    PROFILE: '/admin/profile',
    UPDATE_PROFILE: '/admin/profile',
    CHANGE_PASSWORD: '/admin/change-password',
    
    // Admin management (super admin only)
    GET_ALL_ADMINS: '/admin/admins',
    CREATE_ADMIN: '/admin/admins',
    UPDATE_ADMIN: (id: string | number) => `/admin/admins/${id}`,
    DELETE_ADMIN: (id: string | number) => `/admin/admins/${id}`,
    BAN_ADMIN: (id: string | number) => `/admin/admins/${id}/ban`,
    UNBAN_ADMIN: (id: string | number) => `/admin/admins/${id}/unban`,
  },
  
  // System endpoints
  SYSTEM: {
    HEALTH: '/health',
    STATUS: '/status',
    VERSION: '/version',
  },
  
  // IoT Device endpoints (for future use)
  DEVICES: {
    GET_ALL: '/devices',
    GET_BY_ID: (id: string | number) => `/devices/${id}`,
    CREATE: '/devices',
    UPDATE: (id: string | number) => `/devices/${id}`,
    DELETE: (id: string | number) => `/devices/${id}`,
    GET_STATUS: (id: string | number) => `/devices/${id}/status`,
    CONTROL: (id: string | number) => `/devices/${id}/control`,
  },
  
  // Analytics endpoints (for future use)
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    USERS: '/analytics/users',
    DEVICES: '/analytics/devices',
    ACTIVITY: '/analytics/activity',
  },
  
  // Content Management endpoints
  HEROES: {
    GET_ALL: '/heroes',
    GET_BY_ID: (id: string | number) => `/heroes/${id}`,
    CREATE: '/heroes',
    UPDATE: (id: string | number) => `/heroes/${id}`,
    DELETE: (id: string | number) => `/heroes/${id}`,
    TOGGLE: (id: string | number) => `/heroes/${id}/toggle`,
  },
  
  FEATURES: {
    GET_ALL: '/features',
    GET_BY_ID: (id: string | number) => `/features/${id}`,
    CREATE: '/features',
    UPDATE: (id: string | number) => `/features/${id}`,
    DELETE: (id: string | number) => `/features/${id}`,
    TOGGLE: (id: string | number) => `/features/${id}/toggle`,
  },
  
  EVENTS: {
    GET_ALL: '/events',
    GET_BY_ID: (id: string | number) => `/events/${id}`,
    GET_GRAND_CURRENT: '/events/grand/current',
    CREATE: '/events',
    UPDATE: (id: string | number) => `/events/${id}`,
    DELETE: (id: string | number) => `/events/${id}`,
    TOGGLE: (id: string | number) => `/events/${id}/toggle`,
  },
  
  TEAM: {
    GET_ALL: '/team',
    GET_BY_ID: (id: string | number) => `/team/${id}`,
    GET_LEADERSHIP: '/team/leadership',
    GET_STEERING: '/team/steering',
    GET_ORGANIZED: '/team/organized',
    CREATE: '/team',
    UPDATE: (id: string | number) => `/team/${id}`,
    DELETE: (id: string | number) => `/team/${id}`,
    TOGGLE: (id: string | number) => `/team/${id}/toggle`,
  },
  
  TESTIMONIALS: {
    GET_ALL: '/testimonials',
    GET_BY_ID: (id: string | number) => `/testimonials/${id}`,
    CREATE: '/testimonials',
    UPDATE: (id: string | number) => `/testimonials/${id}`,
    DELETE: (id: string | number) => `/testimonials/${id}`,
    TOGGLE: (id: string | number) => `/testimonials/${id}/toggle`,
  },
  
  TIMELINE: {
    GET_ALL: '/timeline',
    GET_BY_ID: (id: string | number) => `/timeline/${id}`,
    CREATE: '/timeline',
    UPDATE: (id: string | number) => `/timeline/${id}`,
    DELETE: (id: string | number) => `/timeline/${id}`,
    TOGGLE: (id: string | number) => `/timeline/${id}/toggle`,
  },
  
  // Upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    HERO: '/upload/hero',
    FEATURE: '/upload/feature',
    EVENT: '/upload/event',
    TEAM: '/upload/team',
    TESTIMONIAL: '/upload/testimonial',
  },
  
  // Settings endpoints (for future use)
  SETTINGS: {
    GET_ALL: '/settings',
    UPDATE: '/settings',
    RESET: '/settings/reset',
  },
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Request timeout configurations
export const TIMEOUTS = {
  DEFAULT: 10000, // 10 seconds
  UPLOAD: 30000,  // 30 seconds
  DOWNLOAD: 60000, // 60 seconds
} as const;

// Response status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;
export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
export type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];