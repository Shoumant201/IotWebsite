'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '@/services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; isBanned?: boolean }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      const token = apiService.getToken();
      const userData = apiService.getUser();
      
      if (token && userData) {
        try {
          // Verify token with backend
          const response = await apiService.verifyToken();
          if (response.success) {
            setUser(userData);
          } else {
            // Token is invalid, clear storage
            apiService.removeToken();
            setUser(null);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          apiService.removeToken();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; isBanned?: boolean }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.login(email, password);
      
      if (response.success && response.token && response.user) {
        // Store token and user data
        apiService.setToken(response.token);
        apiService.setUser(response.user);
        setUser(response.user);
        return { success: true };
      } else {
        const errorMessage = response.message || 'Login failed';
        setError(errorMessage);
        
        // Check if it's a banned user error
        const isBanned = errorMessage.toLowerCase().includes('banned');
        
        return { 
          success: false, 
          error: errorMessage,
          isBanned 
        };
      }
    } catch (error: unknown) {
      console.error('🚨 AuthContext login error:', error);
      
      let errorMessage = 'Login failed';
      let isBanned = false;
      
      // Handle different types of errors
      if (error && typeof error === 'object') {
        const err = error as any;
        
        if (err.statusCode === 403 || (err.message && err.message.toLowerCase().includes('banned'))) {
          errorMessage = 'Your account has been banned. Please contact an administrator.';
          isBanned = true;
        } else if (err.statusCode === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (err.statusCode === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.message) {
          errorMessage = err.message;
        } else if (err.code === 'NETWORK_ERROR') {
          errorMessage = 'Network error - please check your connection and try again.';
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.error('🔍 Final error message:', errorMessage);
      setError(errorMessage);
      console.error('Login error:', error);
      
      return { 
        success: false, 
        error: errorMessage,
        isBanned 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call backend logout endpoint
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call result
      apiService.removeToken();
      setUser(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}