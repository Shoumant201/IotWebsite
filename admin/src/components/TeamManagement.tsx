'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface TeamMember {
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
    github?: string;
    email?: string;
    twitter?: string;
  };
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    description: '',
    image: '',
    type: 'member' as 'leadership' | 'steering' | 'member',
    year: new Date().getFullYear().toString(),
    social_links: {
      linkedin: '',
      github: '',
      email: '',
      twitter: ''
    }
  });

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await apiService.getTeamMembers();
      if (response.success && response.data) {
        setTeamMembers(response.data);
      } else {
        toast.error('Failed to fetch team members');
      }
    } catch (error) {
      toast.error('Error fetching team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty social links
    const cleanedSocialLinks = Object.fromEntries(
      Object.entries(formData.social_links).filter(([_, value]) => value.trim() !== '')
    );
    
    const memberData = {
      ...formData,
      social_links: cleanedSocialLinks
    };
    
    try {
      if (editingMember) {
        const response = await apiService.updateTeamMember(editingMember.id, memberData);
        if (response.success) {
          toast.success('Team member updated successfully');
          fetchTeamMembers();
        } else {
          toast.error('Failed to update team member');
        }
      } else {
        const response = await apiService.createTeamMember(memberData);
        if (response.success) {
          toast.success('Team member created successfully');
          fetchTeamMembers();
        } else {
          toast.error('Failed to create team member');
        }
      }
      
      setShowForm(false);
      setEditingMember(null);
      resetForm();
    } catch (error) {
      toast.error('Error saving team member');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      department: '',
      description: '',
      image: '',
      type: 'member',
      year: new Date().getFullYear().toString(),
      social_links: {
        linkedin: '',
        github: '',
        email: '',
        twitter: ''
      }
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      description: member.description,
      image: member.image,
      type: member.type,
      year: member.year,
      social_links: {
        linkedin: member.social_links.linkedin || '',
        github: member.social_links.github || '',
        email: member.social_links.email || '',
        twitter: member.social_links.twitter || ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const response = await apiService.deleteTeamMember(id);
      if (response.success) {
        toast.success('Team member deleted successfully');
        fetchTeamMembers();
      } else {
        toast.error('Failed to delete team member');
      }
    } catch (error) {
      toast.error('Error deleting team member');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const response = await apiService.toggleTeamMember(id);
      if (response.success) {
        toast.success('Team member status updated');
        fetchTeamMembers();
      } else {
        toast.error('Failed to update team member status');
      }
    } catch (error) {
      toast.error('Error updating team member status');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'leadership':
        return 'bg-purple-100 text-purple-800';
      case 'steering':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedMembers = teamMembers.reduce((acc, member) => {
    if (!acc[member.type]) {
      acc[member.type] = [];
    }
    acc[member.type].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

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
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Member
        </button>
      </div>

      {/* Team Members by Type */}
      {Object.entries(groupedMembers).map(([type, members]) => (
        <div key={type} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {type} ({members.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {members.map((member) => (
              <div key={member.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-avatar.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-medium text-gray-900">{member.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(member.type)}`}>
                          {member.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{member.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Year: {member.year}</span>
                        {Object.entries(member.social_links).length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex space-x-2">
                              {Object.entries(member.social_links).map(([platform, url]) => (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 capitalize"
                                >
                                  {platform}
                                </a>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggle(member.id)}
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        member.is_active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {member.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(member)}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-xs font-medium rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 text-xs font-medium rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {teamMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No team members found. Add your first team member!</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
                  uploadType="team"
                  label="Team Member Image"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'leadership' | 'steering' | 'member' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="member">Member</option>
                      <option value="steering">Steering</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="text"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.social_links.linkedin}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, linkedin: e.target.value }
                        })}
                        placeholder="https://linkedin.com/in/username"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">GitHub</label>
                      <input
                        type="url"
                        value={formData.social_links.github}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, github: e.target.value }
                        })}
                        placeholder="https://github.com/username"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Email</label>
                      <input
                        type="email"
                        value={formData.social_links.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, email: e.target.value }
                        })}
                        placeholder="email@example.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Twitter</label>
                      <input
                        type="url"
                        value={formData.social_links.twitter}
                        onChange={(e) => setFormData({
                          ...formData,
                          social_links: { ...formData.social_links, twitter: e.target.value }
                        })}
                        placeholder="https://twitter.com/username"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                      resetForm();
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {editingMember ? 'Update' : 'Create'}
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