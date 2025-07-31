import { axiosService, ApiResponse } from './axiosInstance';
import { API_ENDPOINTS } from './endpoints';

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  is_banned?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  is_banned?: boolean;
}

class ApiService {
  // Authentication methods
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const response = await axiosService.post<User>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      
      // Store token and user data if login successful
      if (response.success && response.token && response.user) {
        axiosService.setToken(response.token);
        axiosService.setUser(response.user);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }



  async verifyToken(): Promise<ApiResponse<User>> {
    try {
      return await axiosService.get<User>(API_ENDPOINTS.AUTH.VERIFY_TOKEN);
    } catch (error) {
      console.error('Token verification failed:', error);
      throw error;
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await axiosService.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      // Clear local storage regardless of API response
      axiosService.clearAuthData();
      
      return response;
    } catch (error) {
      // Clear local storage even if API call fails
      axiosService.clearAuthData();
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Profile management methods (both admin and super admin)
  async getProfile(): Promise<ApiResponse<User>> {
    try {
      return await axiosService.get<User>(API_ENDPOINTS.ADMIN.PROFILE);
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  async updateProfile(profileData: { name?: string; email?: string }): Promise<ApiResponse<User>> {
    try {
      return await axiosService.put<User>(
        API_ENDPOINTS.ADMIN.UPDATE_PROFILE,
        profileData
      );
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    try {
      return await axiosService.post(
        API_ENDPOINTS.ADMIN.CHANGE_PASSWORD,
        passwordData
      );
    } catch (error) {
      console.error('Change password failed:', error);
      throw error;
    }
  }

  // Admin management methods (super admin only)
  async getAllAdmins(): Promise<ApiResponse<User[]>> {
    try {
      return await axiosService.get<User[]>(API_ENDPOINTS.ADMIN.GET_ALL_ADMINS);
    } catch (error) {
      console.error('Get admins failed:', error);
      throw error;
    }
  }

  async createAdmin(adminData: { name: string; email: string; password: string }): Promise<ApiResponse<User>> {
    try {
      return await axiosService.post<User>(
        API_ENDPOINTS.ADMIN.CREATE_ADMIN,
        adminData
      );
    } catch (error) {
      console.error('Create admin failed:', error);
      throw error;
    }
  }

  async updateAdmin(id: string | number, adminData: { name?: string; email?: string }): Promise<ApiResponse<User>> {
    try {
      return await axiosService.put<User>(
        API_ENDPOINTS.ADMIN.UPDATE_ADMIN(id),
        adminData
      );
    } catch (error) {
      console.error('Update admin failed:', error);
      throw error;
    }
  }

  async deleteAdmin(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.ADMIN.DELETE_ADMIN(id));
    } catch (error) {
      console.error('Delete admin failed:', error);
      throw error;
    }
  }

  async banAdmin(id: string | number): Promise<ApiResponse<User>> {
    try {
      return await axiosService.patch<User>(API_ENDPOINTS.ADMIN.BAN_ADMIN(id));
    } catch (error) {
      console.error('Ban admin failed:', error);
      throw error;
    }
  }

  async unbanAdmin(id: string | number): Promise<ApiResponse<User>> {
    try {
      return await axiosService.patch<User>(API_ENDPOINTS.ADMIN.UNBAN_ADMIN(id));
    } catch (error) {
      console.error('Unban admin failed:', error);
      throw error;
    }
  }

  // System methods
  async healthCheck(): Promise<ApiResponse> {
    try {
      return await axiosService.get(API_ENDPOINTS.SYSTEM.HEALTH);
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  async getSystemStatus(): Promise<ApiResponse> {
    try {
      return await axiosService.get(API_ENDPOINTS.SYSTEM.STATUS);
    } catch (error) {
      console.error('Get system status failed:', error);
      throw error;
    }
  }

  // Utility methods
  getToken(): string | null {
    return axiosService.getToken();
  }

  getUser(): User | null {
    return axiosService.getUser();
  }

  setToken(token: string): void {
    axiosService.setToken(token);
  }

  setUser(user: User): void {
    axiosService.setUser(user);
  }

  removeToken(): void {
    axiosService.removeToken();
  }

  clearAuthData(): void {
    axiosService.clearAuthData();
  }

  // Content Management Methods
  
  // Heroes Management
  async getHeroes(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.HEROES.GET_ALL);
    } catch (error) {
      console.error('Get heroes failed:', error);
      throw error;
    }
  }

  async createHero(heroData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.HEROES.CREATE, heroData);
    } catch (error) {
      console.error('Create hero failed:', error);
      throw error;
    }
  }

  async updateHero(id: string | number, heroData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.HEROES.UPDATE(id), heroData);
    } catch (error) {
      console.error('Update hero failed:', error);
      throw error;
    }
  }

  async deleteHero(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.HEROES.DELETE(id));
    } catch (error) {
      console.error('Delete hero failed:', error);
      throw error;
    }
  }

  async toggleHero(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.HEROES.TOGGLE(id));
    } catch (error) {
      console.error('Toggle hero failed:', error);
      throw error;
    }
  }

  // Features Management
  async getFeatures(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.FEATURES.GET_ALL);
    } catch (error) {
      console.error('Get features failed:', error);
      throw error;
    }
  }

  async createFeature(featureData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.FEATURES.CREATE, featureData);
    } catch (error) {
      console.error('Create feature failed:', error);
      throw error;
    }
  }

  async updateFeature(id: string | number, featureData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.FEATURES.UPDATE(id), featureData);
    } catch (error) {
      console.error('Update feature failed:', error);
      throw error;
    }
  }

  async deleteFeature(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.FEATURES.DELETE(id));
    } catch (error) {
      console.error('Delete feature failed:', error);
      throw error;
    }
  }

  async toggleFeature(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.FEATURES.TOGGLE(id));
    } catch (error) {
      console.error('Toggle feature failed:', error);
      throw error;
    }
  }

  // Events Management
  async getEvents(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.EVENTS.GET_ALL);
    } catch (error) {
      console.error('Get events failed:', error);
      throw error;
    }
  }

  async createEvent(eventData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.EVENTS.CREATE, eventData);
    } catch (error) {
      console.error('Create event failed:', error);
      throw error;
    }
  }

  async updateEvent(id: string | number, eventData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.EVENTS.UPDATE(id), eventData);
    } catch (error) {
      console.error('Update event failed:', error);
      throw error;
    }
  }

  async deleteEvent(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.EVENTS.DELETE(id));
    } catch (error) {
      console.error('Delete event failed:', error);
      throw error;
    }
  }

  async toggleEvent(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.EVENTS.TOGGLE(id));
    } catch (error) {
      console.error('Toggle event failed:', error);
      throw error;
    }
  }

  // Team Management
  async getTeamMembers(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.TEAM.GET_ALL);
    } catch (error) {
      console.error('Get team members failed:', error);
      throw error;
    }
  }

  async createTeamMember(teamData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.TEAM.CREATE, teamData);
    } catch (error) {
      console.error('Create team member failed:', error);
      throw error;
    }
  }

  async updateTeamMember(id: string | number, teamData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.TEAM.UPDATE(id), teamData);
    } catch (error) {
      console.error('Update team member failed:', error);
      throw error;
    }
  }

  async deleteTeamMember(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.TEAM.DELETE(id));
    } catch (error) {
      console.error('Delete team member failed:', error);
      throw error;
    }
  }

  async toggleTeamMember(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.TEAM.TOGGLE(id));
    } catch (error) {
      console.error('Toggle team member failed:', error);
      throw error;
    }
  }

  // Testimonials Management
  async getTestimonials(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.TESTIMONIALS.GET_ALL);
    } catch (error) {
      console.error('Get testimonials failed:', error);
      throw error;
    }
  }

  async createTestimonial(testimonialData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.TESTIMONIALS.CREATE, testimonialData);
    } catch (error) {
      console.error('Create testimonial failed:', error);
      throw error;
    }
  }

  async updateTestimonial(id: string | number, testimonialData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.TESTIMONIALS.UPDATE(id), testimonialData);
    } catch (error) {
      console.error('Update testimonial failed:', error);
      throw error;
    }
  }

  async deleteTestimonial(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.TESTIMONIALS.DELETE(id));
    } catch (error) {
      console.error('Delete testimonial failed:', error);
      throw error;
    }
  }

  async toggleTestimonial(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.TESTIMONIALS.TOGGLE(id));
    } catch (error) {
      console.error('Toggle testimonial failed:', error);
      throw error;
    }
  }

  // Timeline Management
  async getTimelineEvents(): Promise<ApiResponse<any[]>> {
    try {
      return await axiosService.get<any[]>(API_ENDPOINTS.TIMELINE.GET_ALL);
    } catch (error) {
      console.error('Get timeline events failed:', error);
      throw error;
    }
  }

  async createTimelineEvent(timelineData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.post<any>(API_ENDPOINTS.TIMELINE.CREATE, timelineData);
    } catch (error) {
      console.error('Create timeline event failed:', error);
      throw error;
    }
  }

  async updateTimelineEvent(id: string | number, timelineData: any): Promise<ApiResponse<any>> {
    try {
      return await axiosService.put<any>(API_ENDPOINTS.TIMELINE.UPDATE(id), timelineData);
    } catch (error) {
      console.error('Update timeline event failed:', error);
      throw error;
    }
  }

  async deleteTimelineEvent(id: string | number): Promise<ApiResponse> {
    try {
      return await axiosService.delete(API_ENDPOINTS.TIMELINE.DELETE(id));
    } catch (error) {
      console.error('Delete timeline event failed:', error);
      throw error;
    }
  }

  async toggleTimelineEvent(id: string | number): Promise<ApiResponse<any>> {
    try {
      return await axiosService.patch<any>(API_ENDPOINTS.TIMELINE.TOGGLE(id));
    } catch (error) {
      console.error('Toggle timeline event failed:', error);
      throw error;
    }
  }

  // Image Upload Methods
  async uploadImage(
    file: File,
    type: 'hero' | 'feature' | 'event' | 'team' | 'testimonial' | 'image' = 'image',
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ url: string }>> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const endpoint = API_ENDPOINTS.UPLOAD[type.toUpperCase() as keyof typeof API_ENDPOINTS.UPLOAD];
      
      return await axiosService.upload(endpoint, formData, onProgress);
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  }

  async uploadHeroImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    return this.uploadImage(file, 'hero', onProgress);
  }

  async uploadFeatureImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    return this.uploadImage(file, 'feature', onProgress);
  }

  async uploadEventImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    return this.uploadImage(file, 'event', onProgress);
  }

  async uploadTeamImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    return this.uploadImage(file, 'team', onProgress);
  }

  async uploadTestimonialImage(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> {
    return this.uploadImage(file, 'testimonial', onProgress);
  }

  // File upload method (legacy)
  async uploadFile(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      return await axiosService.upload(endpoint, formData, onProgress);
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;

// Export types for use in components
export type { ApiResponse } from './axiosInstance';