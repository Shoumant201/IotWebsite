'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface Hero {
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

export default function HeroesManagement() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_image: '',
    cta_text: 'Get Started',
    cta_link: '#'
  });

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const response = await apiService.getHeroes();
      if (response.success && response.data) {
        setHeroes(response.data);
      } else {
        toast.error('Failed to fetch heroes');
      }
    } catch (error) {
      toast.error('Error fetching heroes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingHero) {
        const response = await apiService.updateHero(editingHero.id, formData);
        if (response.success) {
          toast.success('Hero updated successfully');
          fetchHeroes();
        } else {
          toast.error('Failed to update hero');
        }
      } else {
        const response = await apiService.createHero(formData);
        if (response.success) {
          toast.success('Hero created successfully');
          fetchHeroes();
        } else {
          toast.error('Failed to create hero');
        }
      }
      
      setShowForm(false);
      setEditingHero(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        background_image: '',
        cta_text: 'Get Started',
        cta_link: '#'
      });
    } catch (error) {
      toast.error('Error saving hero');
    }
  };

  const handleEdit = (hero: Hero) => {
    setEditingHero(hero);
    setFormData({
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      background_image: hero.background_image,
      cta_text: hero.cta_text,
      cta_link: hero.cta_link
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this hero?')) return;
    
    try {
      const response = await apiService.deleteHero(id);
      if (response.success) {
        toast.success('Hero deleted successfully');
        fetchHeroes();
      } else {
        toast.error('Failed to delete hero');
      }
    } catch (error) {
      toast.error('Error deleting hero');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const response = await apiService.toggleHero(id);
      if (response.success) {
        toast.success('Hero status updated');
        fetchHeroes();
      } else {
        toast.error('Failed to update hero status');
      }
    } catch (error) {
      toast.error('Error updating hero status');
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
        <h2 className="text-2xl font-bold text-gray-900">Heroes Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add New Hero
        </button>
      </div>

      {/* Heroes List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {heroes.map((hero) => (
            <li key={hero.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{hero.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        hero.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {hero.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{hero.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{hero.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>CTA: {hero.cta_text}</span>
                    <span>•</span>
                    <span>Link: {hero.cta_link}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleToggle(hero.id)}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      hero.is_active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {hero.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleEdit(hero)}
                    className="bg-[#75BF43]/10 text-[#75BF43] hover:bg-[#75BF43]/20 px-3 py-1 text-xs font-medium rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hero.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 text-xs font-medium rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {heroes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No heroes found. Create your first hero!</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingHero ? 'Edit Hero' : 'Add New Hero'}
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
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
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
                  currentImage={formData.background_image}
                  onImageUploaded={(url) => setFormData({ ...formData, background_image: url })}
                  uploadType="hero"
                  label="Background Image"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                    <input
                      type="text"
                      required
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA Link</label>
                    <input
                      type="text"
                      required
                      value={formData.cta_link}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingHero(null);
                      setFormData({
                        title: '',
                        subtitle: '',
                        description: '',
                        background_image: '',
                        cta_text: 'Get Started',
                        cta_link: '#'
                      });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    {editingHero ? 'Update' : 'Create'}
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