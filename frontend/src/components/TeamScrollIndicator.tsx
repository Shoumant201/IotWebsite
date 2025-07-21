'use client';

import { useEffect, useState } from 'react';

interface TeamScrollIndicatorProps {
  activeSection: string;
  years: string[];
}

export default function TeamScrollIndicator({ activeSection, years }: TeamScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
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

          // Show label when entering new section
          if (activeSection !== showLabel) {
            setShowLabel(activeSection);
            
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(labelTimeout);
    };
  }, [activeSection, showLabel]);

  const scrollToSection = (year: string) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="scroll-indicator">
          {/* Main Timeline Line */}
          <div className="relative w-1 h-96 bg-gray-300 rounded-full">
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#75BF43] to-[#5a9f33] rounded-full transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />

            {/* Year Indicators */}
            {years.map((year, index) => {
              const isActive = activeSection === year;
              const position = (index / (years.length - 1)) * 100;
              const isPassed = scrollProgress >= position;
              const isHovered = hoveredSection === year;

              return (
                <div
                  key={year}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    top: `${position}%`,
                    left: '50%'
                  }}
                  onClick={() => scrollToSection(year)}
                  onMouseEnter={() => setHoveredSection(year)}
                  onMouseLeave={() => setHoveredSection('')}
                >
                  {/* Year Circle */}
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                      isPassed
                        ? 'bg-[#75BF43] scale-125'
                        : 'bg-gray-300 hover:bg-[#75BF43] hover:scale-110'
                    } ${isActive ? 'ring-4 ring-[#75BF43]/30 animate-pulse' : ''}`}
                  />

                  {/* Section Label - Only show when entering new section */}
                  <div
                    className={`absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                      showLabel === year && !isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{year}</span>
                      {/* Arrow pointing to circle */}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                        <div className="w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Tooltip - Only show on hover */}
                  <div
                    className={`absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                      isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4 pointer-events-none'
                    }`}
                  >
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      <span className="text-sm font-medium">{year}</span>
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
      </div>

    </>
  );
}