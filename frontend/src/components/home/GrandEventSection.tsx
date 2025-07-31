'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api, Event } from '@/lib/api';

export default function GrandEventSection() {
  const [grandEvent, setGrandEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrandEvent = async () => {
      try {
        const eventData = await api.events.getCurrentGrand();
        setGrandEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching grand event:', err);
        setError('Failed to load grand event');
        setLoading(false);
        // Fallback to default event
        setGrandEvent({
          id: 1,
          title: "IoT Tech Connect",
          slug: "iot-tech-connect",
          description: "The Ultimate IoT Conference Experience",
          full_description: "Join us for the most anticipated IoT event of the year! A 3-day summit bringing together industry leaders, innovators, and enthusiasts from around the globe.",
          image: "/TechRace.png",
          date: "December 15-17, 2024",
          time: "Full 3 Days",
          location: "Herald College Kathmandu - Main Auditorium",
          duration: "3 Days",
          level: "All Levels" as const,
          prerequisites: [],
          highlights: [
            "Keynote speeches from global IoT leaders",
            "Hands-on workshops and masterclasses",
            "Startup pitch competition with $50,000 prize pool",
            "Networking sessions with industry professionals",
            "Latest IoT technology exhibitions",
            "Career fair with top tech companies"
          ],
          agenda: [],
          attendees: "500+ Expected Attendees",
          speakers: "50+ Industry Experts",
          is_grand_event: true,
          is_active: true,
          order_index: 1,
          created_at: "",
          updated_at: ""
        });
      }
    };

    fetchGrandEvent();
  }, []);

  if (loading) {
    return (
      <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
        <div className="w-full flex justify-center items-center">
          <div className="w-5/6 max-w-7xl">
            <div className="text-center mb-8">
              <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full">
                Grand Event
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Event</h2>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[calc(400px*3+48px)] rounded-3xl border border-gray-200 flex flex-col justify-center p-8 shadow-lg h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading grand event...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !grandEvent) {
    return (
      <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
        <div className="w-full flex justify-center items-center">
          <div className="w-5/6 max-w-7xl">
            <div className="text-center mb-8">
              <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full">
                Grand Event
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Event</h2>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[calc(400px*3+48px)] rounded-3xl border border-gray-200 flex flex-col justify-center p-8 shadow-lg h-96">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error || 'No grand event available'}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-[#75BF43] text-white px-4 py-2 rounded-lg hover:bg-[#5a9f33]"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Generate stats from event data
  const stats = [
    { number: grandEvent.duration, label: "Duration" },
    { number: grandEvent.speakers || "TBD", label: "Expert Speakers" },
    { number: grandEvent.attendees || "TBD", label: "Attendees" },
    { number: grandEvent.level, label: "Level" }
  ];
  return (
    <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
      <div className="w-full flex justify-center items-center">
        <div className="w-5/6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
              Grand Event
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
              Featured Event
            </h2>
          </div>

          {/* Grand Event Card - Takes width of 3 normal cards */}
          <div className="flex justify-center">
            <div
              className="group relative aspect-square w-full max-w-[calc(400px*3+48px)] rounded-3xl border border-gray-200 flex flex-col justify-center p-8 shadow-[0_20px_50px_rgba(255,215,0,0.4)] hover:shadow-[0_30px_60px_rgba(255,215,0,0.6)] overflow-hidden cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 transform text-white"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                backgroundImage: 'url("/TechRace.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 z-5"></div>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full"></div>
                <div className="absolute top-20 right-20 w-16 h-16 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-12 h-12 border border-white/30 rounded-full"></div>
              </div>

              {/* Event Badge - Always Visible */}
              <div className="absolute top-6 left-6 right-6 z-20">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/30">
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">{grandEvent.title}</h3>
                  <p className="text-sm md:text-base text-white/90 text-center mt-1">{grandEvent.description}</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 flex flex-col justify-center items-center text-center h-full pt-24 pb-6">
                {/* Event Icon */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>

                {/* Event Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full max-w-2xl">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-lg md:text-xl font-bold">{stat.number}</div>
                      <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 w-full max-w-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold text-sm">Date</span>
                    </div>
                    <p className="text-xs opacity-90">{grandEvent.date}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="font-semibold text-sm">Location</span>
                    </div>
                    <p className="text-xs opacity-90">Herald College</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    className="bg-white text-[#75BF43] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[44px] flex items-center justify-center flex-1"
                    style={{ touchAction: 'manipulation' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/events?event=${grandEvent.slug}`;
                    }}
                  >
                    Register Now
                  </button>
                  <button
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white hover:text-[#75BF43] transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[44px] flex items-center justify-center flex-1"
                    style={{ touchAction: 'manipulation' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/events?event=${grandEvent.slug}`;
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}