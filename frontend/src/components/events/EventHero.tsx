import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  level: string;
  prerequisites: string[];
  highlights: string[];
  agenda: Array<{ time: string; activity: string }>;
  attendees: string | undefined;
  speakers: string | undefined;
  is_grand_event: boolean;
  is_active: boolean;
}

interface EventHeroProps {
  event: Event;
}

export default function EventHero({ event }: EventHeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#75BF43] to-[#5a9f33] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{event.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">{event.full_description}</p>

            {/* Event Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">Date</span>
                </div>
                <p className="text-sm opacity-90">{event.date}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Time</span>
                </div>
                <p className="text-sm opacity-90">{event.time}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-sm opacity-90">{event.location}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-semibold">Level</span>
                </div>
                <p className="text-sm opacity-90">{event.level}</p>
              </div>
            </div>

            {/* Register Button */}
            <button className="bg-white text-[#75BF43] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 min-h-[44px]">
              Register Now
            </button>
          </div>

          {/* Event Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}