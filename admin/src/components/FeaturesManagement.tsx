'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  link: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export default function FeaturesManagement() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    icon: '',
    link: '#'
  });

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFeatures();
      if (response.success && response.data) {
        setFeatures(response.data);
      } else {
        toast.error('Failed to fetch features');
      }
    } catch (error) {
      toast.error('Error fetching features');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFeature) {
        const response = await apiService.updateFeature(editingFeature.id, formData);
        if (response.success) {
          toast.success('Feature updated successfully');
          fetchFeatures();
        } else {
          toast.error('Failed to update feature');
        }
      } else {
        const response = await apiService.createFeature(formData);
        if (response.success) {
          toast.success('Feature created successfully');
          fetchFeatures();
        } else {
          toast.error('Failed to create feature');
        }
      }
      
      setShowForm(false);
      setEditingFeature(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        icon: '',
        link: '#'
      });
    } catch (error) {
      toast.error('Error saving feature');
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature);
    setFormData({
      title: feature.title,
      description: feature.description,
      image: feature.image,
      icon: feature.icon,
      link: feature.link
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;
    
    try {
      const response = await apiService.deleteFeature(id);
      if (response.success) {
        toast.success('Feature deleted successfully');
        fetchFeatures();
      } else {
        toast.error('Failed to delete feature');
      }
    } catch (error) {
      toast.error('Error deleting feature');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const response = await apiService.toggleFeature(id);
      if (response.success) {
        toast.success('Feature status updated');
        fetchFeatures();
      } else {
        toast.error('Failed to update feature status');
      }
    } catch (error) {
      toast.error('Error updating feature status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Features Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add New Feature
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  feature.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feature.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{feature.description}</p>
              <div className="text-xs text-gray-500 mb-3">
                <p>Icon: {feature.icon}</p>
                <p>Link: {feature.link}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleToggle(feature.id)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    feature.is_active
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {feature.is_active ? 'Deactivate' : 'Activate'}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-xs font-medium rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 text-xs font-medium rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {features.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No features found. Create your first feature!</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingFeature ? 'Edit Feature' : 'Add New Feature'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <ImageUpload
                  currentImage={formData.image}
                  onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                  uploadType="feature"
                  label="Feature Image"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., connectivity-icon"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Link</label>
                  <input
                    type="text"
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingFeature(null);
                      setFormData({
                        title: '',
                        description: '',
                        image: '',
                        icon: '',
                        link: '#'
                      });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {editingFeature ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}