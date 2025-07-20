'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  name: string;
  color: string;
}

const sections: Section[] = [
  { id: 'home', name: 'Home', color: '#75BF43' },
  { id: 'about-us', name: 'About Us', color: '#75BF43' },
  { id: 'about', name: 'Events', color: '#75BF43' },
  { id: 'timeline', name: 'Timeline', color: '#75BF43' },
  { id: 'team', name: 'Team', color: '#75BF43' },
  { id: 'contact', name: 'Contact Us', color: '#75BF43' },
];

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showLabel, setShowLabel] = useState('');
  const [hoveredSection, setHoveredSection] = useState('');

  useEffect(() => {
    let ticking = false;
    let labelTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));

          // Find active section based on custom ranges
          let currentSection = 'home';
          const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Better detection point

          // Define section ranges
          const homeElement = document.getElementById('home');
          const aboutUsElement = document.getElementById('about-us');
          const eventsElement = document.getElementById('about'); // Statistics/Events section
          const timelineElement = document.getElementById('timeline');
          const teamElement = document.getElementById('team');
          const contactElement = document.getElementById('contact');

          if (homeElement && aboutUsElement && eventsElement && timelineElement && teamElement && contactElement) {
            const homeTop = homeElement.offsetTop;
            const aboutUsTop = aboutUsElement.offsetTop;
            const eventsTop = eventsElement.offsetTop;
            const timelineTop = timelineElement.offsetTop;
            const teamTop = teamElement.offsetTop;
            const contactTop = contactElement.offsetTop;

            if (scrollPosition >= contactTop) {
              currentSection = 'contact';
            } else if (scrollPosition >= teamTop) {
              currentSection = 'team';
            } else if (scrollPosition >= timelineTop) {
              currentSection = 'timeline';
            } else if (scrollPosition >= eventsTop) {
              currentSection = 'about'; // Events section
            } else if (scrollPosition >= aboutUsTop) {
              currentSection = 'about-us';
            } else {
              currentSection = 'home';
            }
          }

          if (currentSection !== activeSection) {
            setActiveSection(currentSection);
            setShowLabel(currentSection);

            // Clear existing timeout
            clearTimeout(labelTimeout);

            // Hide label after 2 seconds
            labelTimeout = setTimeout(() => {
              setShowLabel('');
            }, 2000);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(labelTimeout);
    };
  }, [activeSection]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = sectionId === 'home' ? 0 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="scroll-indicator">
      {/* Main Timeline Line */}
      <div className="relative w-1 h-96 bg-gray-300 rounded-full">
        {/* Progress Fill */}
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#75BF43] to-[#5a9f33] rounded-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Section Circles */}
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const position = (index / (sections.length - 1)) * 100;
          const isPassed = scrollProgress >= position;
          const isHovered = hoveredSection === section.id;

          return (
            <div
              key={section.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                top: `${position}%`,
                left: '50%'
              }}
              onClick={() => handleSectionClick(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection('')}
            >
              {/* Section Circle */}
              <div
                className={`w-4 h-4 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${isPassed
                  ? 'bg-[#75BF43] scale-125'
                  : 'bg-gray-300 hover:bg-[#75BF43] hover:scale-110'
                  } ${isActive ? 'ring-4 ring-[#75BF43]/30 animate-pulse' : ''}`}
              />

              {/* Section Label - Only show when entering new section (not when active) */}
              <div
                className={`absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${showLabel === section.id && !isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 pointer-events-none'
                  }`}
              >
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">{section.name}</span>
                  {/* Arrow pointing to circle */}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Hover Tooltip - Only show on hover */}
              <div
                className={`absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${isHovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 pointer-events-none'
                  }`}
              >
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  <span className="text-sm font-medium">{section.name}</span>
                  {/* Arrow pointing to circle */}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}