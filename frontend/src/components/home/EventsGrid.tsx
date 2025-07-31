import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  is_active: boolean;
  is_grand_event: boolean;
}

export default function EventsGrid() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await api.events.getAll();
        // Filter only active, non-grand events and limit to 9 for the grid
        const activeEvents = eventsData.filter((event: Event) => event.is_active && !event.is_grand_event).slice(0, 9);
        setEvents(activeEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        // Fallback to static data if API fails
        setEvents([
          {
            id: 1,
            title: "Face in Focus",
            slug: "face-in-focus",
            description: "Hands-on learning experience",
            image: "/FaceinFocus.png",
            is_active: true,
            is_grand_event: false
          },
          {
            id: 2,
            title: "IoT Tech Hunt",
            slug: "iot-tech-hunt",
            description: "Exploring the future of IoT",
            image: "/IOT_Tech_Hunt.png",
            is_active: true,
            is_grand_event: false
          },
          {
            id: 3,
            title: "IoT Open Doors",
            slug: "iot-open-doors",
            description: "48-hour innovation challenge",
            image: "/IOTOPENDOORS.png",
            is_active: true,
            is_grand_event: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
        <div className="w-full flex justify-center items-center">
          <div className="w-5/6 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-6 mt-8 items-center justify-items-center max-w-7xl">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square max-w-[400px] w-full bg-gray-200 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#75BF43] text-white px-4 py-2 rounded-lg hover:bg-[#5a9f33]"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
      <div className="w-full flex justify-center items-center">
        <div className="w-5/6 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-6 mt-8 items-center justify-items-center max-w-7xl">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <Image
                alt={event.title}
                src={event.image}
                fill
                className="object-cover z-10 rounded-3xl"
              />
              {/* Event Name - Always Visible */}
              <div className="absolute top-4 left-4 right-4 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 text-center">{event.title}</h3>
                </div>
              </div>

              {/* Desktop Hover Overlay with Details */}
              <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{event.title}</h3>
                <p className="text-sm opacity-90 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">{event.description}</p>

                {/* Desktop View Details Button */}
                <button
                  className="bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-300 min-h-[44px] flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/events?event=${event.slug}`;
                  }}
                >
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Mobile Always-Visible Bottom Section */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 z-20 text-white">
                <p className="text-xs opacity-90 mb-3 text-center">{event.description}</p>

                {/* Mobile View Details Button - Always Visible */}
                <button
                  className="w-full bg-gradient-to-r from-[#75BF43] to-[#5a9f33] active:from-[#5a9f33] active:to-[#4a8a2a] text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 min-h-[44px] flex items-center justify-center shadow-lg"
                  style={{ touchAction: 'manipulation' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/events?event=${event.slug}`;
                  }}
                >
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}