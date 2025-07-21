'use client';

import { useEffect, useRef } from 'react';

// Leadership team data
const leadershipTeam = [
  {
    name: "Dipesh Shrestha",
    role: "DevCorp Head",
    department: "Herald College Kathmandu",
    image: "/team/Dipesh_Shrestha.png",
    description: "Leading strategic development initiatives and fostering innovation partnerships across the IoT ecosystem."
  },
  {
    name: "Subash Bista",
    role: "Academic Mentor",
    department: "Herald College Kathmandu",
    image: "/team/Subash_Bista.png",
    description: "Guiding academic excellence and research initiatives in IoT education and student development."
  }
];

// Steering leaders data
const steeringLeaders = [
  {
    name: "Bidhan Sapkota",
    role: "Executive Lead",
    department: "Engineering Department",
    image: "/team/Bidhan.jpg",
    description: "Overseeing technical architecture and IoT system implementations."
  },
  {
    name: "Bibisha Sapkota",
    role: "Event Planning Lead",
    department: "Research & Development",
    image: "/team/Bibisha_sapkota.jpg",
    description: "Leading cutting-edge research in IoT technologies and innovation."
  },
  {
    name: "Shoumant Khadka",
    role: "Development Lead",
    department: "Operations Department",
    image: "/team/ShoumantKhadka.png",
    description: "Managing day-to-day operations and ensuring smooth project execution."
  },
  {
    name: "Luniva Shrestha",
    role: "Design Lead",
    department: "Community Relations",
    image: "/team/LunivaShrestha.jpg",
    description: "Building and nurturing the IoT community and stakeholder relationships."
  },
  {
    name: "Jyoti Karnjit",
    role: "Marketing Lead",
    department: "Innovation Lab",
    image: "/team/Jyoti_Karanjit.png",
    description: "Driving innovation initiatives and emerging technology adoption."
  },
  {
    name: "Narendra Ghimire",
    role: "Documentation Head",
    department: "Innovation Lab",
    image: "/team/innovation-head.jpg",
    description: "Driving innovation initiatives and emerging technology adoption."
  }
];

export default function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadershipTeam.map((leader, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105" 
                data-aos="fade-up" 
                data-aos-delay={100 * (index + 1)}
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center">
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
                          parent.innerHTML = `<span class="text-white text-3xl font-bold">${leader.name.split(' ').map((n: string) => n[0]).join('')}</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-white text-3xl font-bold">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{leader.name}</h3>
                <p className="text-[#75BF43] text-center mb-2 font-semibold">{leader.role}</p>
                <p className="text-gray-500 text-center mb-4 text-sm">{leader.department}</p>
                <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">{leader.description}</p>
                <div className="flex justify-center">
                  <a href="#" className="bg-[#0A66C2] hover:bg-[#004182] text-white p-3 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
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

          {/* Auto-scrolling Steering Leaders */}
          <div className="relative">
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