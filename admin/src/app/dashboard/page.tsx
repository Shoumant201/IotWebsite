'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import AdminManagement from '@/components/AdminManagement';
import ProfileManagement from '@/components/ProfileManagement';
import HeroesManagement from '@/components/HeroesManagement';
import FeaturesManagement from '@/components/FeaturesManagement';
import EventsManagement from '@/components/EventsManagement';
import TeamManagement from '@/components/TeamManagement';
import TestimonialsManagement from '@/components/TestimonialsManagement';
import TimelineManagement from '@/components/TimelineManagement';
import ProtectedRoute from '@/components/ProtectedRoute';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  is_banned: boolean;
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSuperAdmin = user?.role === 'super_admin';

  const fetchAdmins = async () => {
    if (!isSuperAdmin) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAllAdmins();
      if (response.success && response.data) {
        setAdmins(response.data);
      } else {
        const errorMsg = response.message || 'Failed to fetch admins';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch admins';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admins' && isSuperAdmin) {
      fetchAdmins();
    }
  }, [activeTab, isSuperAdmin]);

  const handleLogout = async () => {
    toast.promise(
      logout(),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully!',
        error: 'Logout failed, but you will be redirected anyway.'
      }
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#75BF43] to-[#5a9f33] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">IoT Innovation Hub - Admin Panel</h1>
              <span className="ml-4 px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm">
                {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'profile'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              👤 Profile
            </button>
            <button
              onClick={() => setActiveTab('heroes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'heroes'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              🦸 Heroes
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'features'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              ⭐ Features
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'events'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              📅 Events
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'team'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              👥 Team
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'testimonials'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              💬 Testimonials
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'timeline'
                  ? 'border-[#75BF43] text-[#75BF43]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              📈 Timeline
            </button>
            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab('admins')}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'admins'
                    ? 'border-[#75BF43] text-[#75BF43]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                🔧 Admin Management
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'profile' && (
          <ProfileManagement user={user} />
        )}

        {activeTab === 'heroes' && (
          <HeroesManagement />
        )}

        {activeTab === 'features' && (
          <FeaturesManagement />
        )}

        {activeTab === 'events' && (
          <EventsManagement />
        )}

        {activeTab === 'team' && (
          <TeamManagement />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsManagement />
        )}

        {activeTab === 'timeline' && (
          <TimelineManagement />
        )}

        {activeTab === 'admins' && isSuperAdmin && (
          <AdminManagement
            admins={admins}
            loading={loading}
            error={error}
            onRefresh={fetchAdmins}
          />
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}