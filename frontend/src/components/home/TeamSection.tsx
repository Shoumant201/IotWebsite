'use client';

import { useEffect, useRef, useState } from 'react';
import { api, TeamMember } from '@/lib/api';

export default function TeamSection() {
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>([]);
  const [steeringLeaders, setSteeringLeaders] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [leadership, steering] = await Promise.all([
          api.team.getLeadership(),
          api.team.getSteering()
        ]);
        
        setLeadershipTeam(leadership);
        setSteeringLeaders(steering);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
        setLoading(false);
        
        // Fallback to default data
        setLeadershipTeam([
          {
            id: 1,
            name: "Dipesh Shrestha",
            role: "DevCorp Head",
            department: "Herald College Kathmandu",
            image: "/team/Dipesh_Shrestha.png",
            description: "Leading strategic development initiatives and fostering innovation partnerships across the IoT ecosystem.",
            type: "leadership" as const,
            year: "2024",
            social_links: {},
            is_active: true,
            order_index: 1,
            created_at: "",
            updated_at: ""
          },
          {
            id: 2,
            name: "Subash Bista",
            role: "Academic Mentor",
            department: "Herald College Kathmandu",
            image: "/team/Subash_Bista.png",
            description: "Guiding academic excellence and research initiatives in IoT education and student development.",
            type: "leadership" as const,
            year: "2024",
            social_links: {},
            is_active: true,
            order_index: 2,
            created_at: "",
            updated_at: ""
          }
        ]);
        
        setSteeringLeaders([
          {
            id: 3,
            name: "Bidhan Sapkota",
            role: "Logistic Lead",
            department: "Engineering Department",
            image: "/team/Bidhan.jpg",
            description: "Overseeing technical architecture and IoT system implementations.",
            type: "steering" as const,
            year: "2024",
            social_links: {},
            is_active: true,
            order_index: 1,
            created_at: "",
            updated_at: ""
          },
          {
            id: 4,
            name: "Bibisha Sapkota",
            role: "Event Planning Lead",
            department: "Research & Development",
            image: "/team/Bibisha_sapkota.jpg",
            description: "Leading cutting-edge research in IoT technologies and innovation.",
            type: "steering" as const,
            year: "2024",
            social_links: {},
            is_active: true,
            order_index: 2,
            created_at: "",
            updated_at: ""
          }
        ]);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollIntervalId: NodeJS.Timeout;
    const cardWidth = 320 + 24; // Card width (320px) + gap (24px)
    const scrollStep = 1;
    const scrollDelay = 20; // Smooth scrolling

    const startScrolling = () => {
      scrollIntervalId = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollStep;

          // Create infinite scroll effect - reset when we've scrolled through one set
          const maxScroll = cardWidth * steeringLeaders.length;
          if (scrollContainer.scrollLeft >= maxScroll) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, scrollDelay);
    };

    const handleMouseEnter = () => {
      clearInterval(scrollIntervalId);
    };

    const handleMouseLeave = () => {
      startScrolling();
    };

    // Start scrolling after a short delay
    setTimeout(() => {
      startScrolling();
    }, 1000);

    // Add event listeners
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollIntervalId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  if (loading) {
    return (
      <section id="team" className="w-full relative flex flex-col items-center bg-white text-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full">
              Team
            </p>
            <h2 className="text-3xl md:text-6xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate minds behind IoT innovation</p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="w-full relative flex flex-col items-center bg-white text-gray-900 py-20" data-aos="fade-up" data-aos-offset="30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
            Team
          </p>
          <h2 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200" data-aos-offset="30">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="300" data-aos-offset="30">
            The passionate minds behind IoT innovation
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Upper Section - Leadership Team (2 Cards) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up" data-aos-delay="100">
              Leadership Team
            </h3>
            <p className="text-gray-600" data-aos="fade-up" data-aos-delay="200">
              Our visionary leaders guiding the IoT innovation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {leadershipTeam.map((leader, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-8 hover:shadow-xl transition-all duration-300 hover:scale-105" 
                data-aos="fade-up" 
                data-aos-delay={100 * (index + 1)}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-white text-2xl md:text-3xl font-bold">${leader.name.split(' ').map((n: string) => n[0]).join('')}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-white text-2xl md:text-3xl font-bold">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-2">{leader.name}</h3>
                <p className="text-[#75BF43] text-center mb-2 font-semibold text-sm md:text-base">{leader.role}</p>
                <p className="text-gray-500 text-center mb-3 md:mb-4 text-xs md:text-sm">{leader.department}</p>
                <p className="text-gray-600 text-xs md:text-sm text-center mb-4 md:mb-6 leading-relaxed">{leader.description}</p>
                <div className="flex justify-center gap-2">
                  {leader.social_links.linkedin && (
                    <a 
                      href={leader.social_links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 md:p-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {leader.social_links.github && (
                    <a 
                      href={leader.social_links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#333] hover:bg-[#24292e] text-white p-2 md:p-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {leader.social_links.email && (
                    <a 
                      href={`mailto:${leader.social_links.email}`}
                      className="bg-[#EA4335] hover:bg-[#d93025] text-white p-2 md:p-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.273L12 8.91l6.545-4.816v-.273h3.819c.904 0 1.636.732 1.636 1.636z"/>
                      </svg>
                    </a>
                  )}
                  {!leader.social_links.linkedin && !leader.social_links.github && !leader.social_links.email && (
                    <div className="bg-gray-300 text-gray-500 p-2 md:p-3 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Section - Steering Leaders (Side Scroll) */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up" data-aos-delay="100">
              Steering Leaders
            </h3>
            <p className="text-gray-600" data-aos="fade-up" data-aos-delay="200">
              Department heads driving excellence across all areas
            </p>
          </div>

          {/* Desktop Auto-scrolling Steering Leaders */}
          <div className="relative hidden md:block">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Double the leaders for seamless infinite loop */}
              {[...steeringLeaders, ...steeringLeaders].map((leader, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-white text-lg font-bold">${leader.name.split(' ').map((n: string) => n[0]).join('')}</span>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-white text-lg font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 text-center mb-2">{leader.name}</h4>
                  <p className="text-[#75BF43] text-center mb-1 font-semibold text-sm">{leader.role}</p>
                  <p className="text-gray-500 text-center mb-3 text-xs">{leader.department}</p>
                  <p className="text-gray-600 text-xs text-center leading-relaxed">{leader.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Grid Layout for Steering Leaders */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {steeringLeaders.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-white text-sm font-bold">${leader.name.split(' ').map((n: string) => n[0]).join('')}</span>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-gray-900 text-center mb-1">{leader.name}</h4>
                  <p className="text-[#75BF43] text-center mb-1 font-semibold text-xs">{leader.role}</p>
                  <p className="text-gray-500 text-center mb-2 text-xs">{leader.department}</p>
                  <p className="text-gray-600 text-xs text-center leading-relaxed">{leader.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Team Button */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="400" data-aos-offset="30">
          <a
            href="/team"
            className="inline-flex items-center bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform shadow-[0_10px_30px_rgba(117,191,67,0.3)]"
          >
            All Members
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}