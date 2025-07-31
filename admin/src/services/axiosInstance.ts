import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import { API_ENDPOINTS, TIMEOUTS, STATUS_CODES } from './endpoints';

// Types for better type safety
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

class AxiosService {
  private axiosInstance: AxiosInstance;
  private readonly TOKEN_KEY = 'admin-token';
  private readonly USER_KEY = 'admin-user';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINTS.BASE_URL,
      timeout: TIMEOUTS.DEFAULT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Add auth token to requests
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error: AxiosError) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle responses and errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        }

        return response;
      },
      (error: AxiosError<ApiError>) => {
        const { response, request, message } = error;

        // Handle different error scenarios
        if (response) {
          // Server responded with error status
          const { status, data } = response;
          
          console.error(`❌ API Error ${status}:`, data?.message || message);

          // Handle specific status codes
          switch (status) {
            case STATUS_CODES.UNAUTHORIZED:
              // Token expired or invalid - clear auth data
              this.clearAuthData();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
              break;
              
            case STATUS_CODES.FORBIDDEN:
              console.error('Access denied - insufficient permissions');
              break;
              
            case STATUS_CODES.NOT_FOUND:
              console.error('Resource not found');
              break;
              
            case STATUS_CODES.INTERNAL_SERVER_ERROR:
              console.error('Server error - please try again later');
              break;
          }

          return Promise.reject({
            success: false,
            message: data?.message || 'An error occurred',
            error: data?.error,
            statusCode: status,
          } as ApiError);
        } else if (request) {
          // Network error - no response received
          console.error('❌ Network Error:', message);
          return Promise.reject({
            success: false,
            message: 'Network error - please check your connection',
            error: 'NETWORK_ERROR',
          } as ApiError);
        } else {
          // Request setup error
          console.error('❌ Request Setup Error:', message);
          return Promise.reject({
            success: false,
            message: 'Request configuration error',
            error: message,
          } as ApiError);
        }
      }
    );
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload with progress
  async upload<T = any>(
    url: string, 
    formData: FormData, 
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: TIMEOUTS.UPLOAD,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  // Token management
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // User data management
  getUser(): any | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  setUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  // Clear all auth data
  clearAuthData(): void {
    this.removeToken();
    this.removeUser();
  }

  // Get axios instance for custom requests
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // Update base URL (useful for environment switching)
  updateBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  // Set request timeout
  setTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout;
  }
}

// Create and export singleton instance
export const axiosService = new AxiosService();
export default axiosService;