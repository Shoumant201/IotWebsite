'use client';

import { useState } from 'react';
import TeamScrollIndicator from '@/components/TeamScrollIndicator';
import TeamHero from '@/components/team/TeamHero';
import TeamContent from '@/components/team/TeamContent';

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState('2024');
  const years = ['2024', '2023', '2022']; // Recent dates first

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