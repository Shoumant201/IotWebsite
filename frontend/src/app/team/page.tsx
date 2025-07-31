'use client';

import { useState, useEffect } from 'react';
import TeamScrollIndicator from '@/components/TeamScrollIndicator';
import TeamHero from '@/components/team/TeamHero';
import TeamContent from '@/components/team/TeamContent';
import { api } from '@/lib/api';

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState('2025');
  const [years, setYears] = useState(['2025', '2024', '2023', '2022']); // Default years
  
  useEffect(() => {
    // Fetch team data to determine available years
    const fetchAvailableYears = async () => {
      try {
        const teamMembers = await api.team.getAll();
        const availableYears = [...new Set(teamMembers.map(member => member.year))].sort((a, b) => parseInt(b) - parseInt(a));
        
        if (availableYears.length > 0) {
          setYears(availableYears);
          setActiveSection(availableYears[0]); // Set first year as active
        }
      } catch (error) {
        console.error('Error fetching years:', error);
        // Keep default years if API fails
      }
    };
    
    fetchAvailableYears();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <TeamScrollIndicator activeSection={activeSection} years={years} />
      
      {/* Hero Section */}
      <TeamHero />
      
      {/* Team Content */}
      <TeamContent 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        years={years} 
      />
    </div>
  );
}