'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

interface TimelineEvent {
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

export default function TimelineManagement() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    side: 'left' as 'left' | 'right',
    is_future: false
  });

  const fetchTimelineEvents = async () => {
    setLoading(true);
    try {
      const response = await apiService.getTimelineEvents();
      if (response.success && response.data) {
        setTimelineEvents(response.data.sort((a, b) => parseInt(a.year) - parseInt(b.year)));
      } else {
        toast.error('Failed to fetch timeline events');
      }
    } catch (error) {
      toast.error('Error fetching timeline events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimelineEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        const response = await apiService.updateTimelineEvent(editingEvent.id, formData);
        if (response.success) {
          toast.success('Timeline event updated successfully');
          fetchTimelineEvents();
        } else {
          toast.error('Failed to update timeline event');
        }
      } else {
        const response = await apiService.createTimelineEvent(formData);
        if (response.success) {
          toast.success('Timeline event created successfully');
          fetchTimelineEvents();
        } else {
          toast.error('Failed to create timeline event');
        }
      }
      
      setShowForm(false);
      setEditingEvent(null);
      resetForm();
    } catch (error) {
      toast.error('Error saving timeline event');
    }
  };

  const resetForm = () => {
    setFormData({
      year: '',
      title: '',
      description: '',
      side: 'left',
      is_future: false
    });
  };

  const handleEdit = (event: TimelineEvent) => {
    setEditingEvent(event);
    setFormData({
      year: event.year,
      title: event.title,
      description: event.description,
      side: event.side,
      is_future: event.is_future
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this timeline event?')) return;
    
    try {
      const response = await apiService.deleteTimelineEvent(id);
      if (response.success) {
        toast.success('Timeline event deleted successfully');
        fetchTimelineEvents();
      } else {
        toast.error('Failed to delete timeline event');
      }
    } catch (error) {
      toast.error('Error deleting timeline event');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const response = await apiService.toggleTimelineEvent(id);
      if (response.success) {
        toast.success('Timeline event status updated');
        fetchTimelineEvents();
      } else {
        toast.error('Failed to update timeline event status');
      }
    } catch (error) {
      toast.error('Error updating timeline event status');
    }
  };

  const currentYear = new Date().getFullYear();

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
        <h2 className="text-2xl font-bold text-gray-900">Timeline Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Timeline Event
        </button>
      </div>

      {/* Timeline Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline Preview</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`flex items-center ${event.side === 'right' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-5/12 ${event.side === 'right' ? 'text-right' : 'text-left'}`}>
                  <div className={`bg-white border rounded-lg p-4 shadow-sm ${!event.is_active ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-lg font-bold ${event.is_future ? 'text-blue-600' : 'text-gray-900'}`}>
                        {event.year}
                      </span>
                      <div className="flex items-center space-x-1">
                        {event.is_future && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Future
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          event.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {event.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-md font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => handleToggle(event.id)}
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          event.is_active
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {event.is_active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 text-xs font-medium rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 text-xs font-medium rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="relative flex items-center justify-center w-2/12">
                  <div className={`w-4 h-4 rounded-full border-4 ${
                    event.is_future 
                      ? 'bg-blue-500 border-blue-200' 
                      : 'bg-gray-500 border-gray-200'
                  } ${!event.is_active ? 'opacity-50' : ''}`}></div>
                </div>
                
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {timelineEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No timeline events found. Create your first timeline event!</p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingEvent ? 'Edit Timeline Event' : 'Add New Timeline Event'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="text"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        year: e.target.value,
                        is_future: parseInt(e.target.value) > currentYear
                      })}
                      placeholder="e.g., 2024"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Side</label>
                    <select
                      value={formData.side}
                      onChange={(e) => setFormData({ ...formData, side: e.target.value as 'left' | 'right' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_future"
                    checked={formData.is_future}
                    onChange={(e) => setFormData({ ...formData, is_future: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_future" className="ml-2 block text-sm text-gray-900">
                    Future Event (will be styled differently)
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
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
                    {editingEvent ? 'Update' : 'Create'}
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