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

interface EventSidebarProps {
  event: Event;
}

export default function EventSidebar({ event }: EventSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Prerequisites */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
        <ul className="space-y-2">
          {event.prerequisites.map((prereq, index) => (
            <li key={index} className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-[#75BF43] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 text-sm">{prereq}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Info */}
      <div className="bg-[#75BF43]/5 border border-[#75BF43]/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold text-gray-900">{event.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Level:</span>
            <span className="font-semibold text-gray-900">{event.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Format:</span>
            <span className="font-semibold text-gray-900">In-Person</span>
          </div>
          {event.attendees && (
            <div className="flex justify-between">
              <span className="text-gray-600">Attendees:</span>
              <span className="font-semibold text-gray-900">{event.attendees}</span>
            </div>
          )}
          {event.speakers && (
            <div className="flex justify-between">
              <span className="text-gray-600">Speakers:</span>
              <span className="font-semibold text-gray-900">{event.speakers}</span>
            </div>
          )}
        </div>
      </div>

      {/* Register CTA */}
      <div className="bg-gradient-to-br from-[#75BF43] to-[#5a9f33] rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
        <p className="text-sm opacity-90 mb-4">Secure your spot in this exciting event!</p>
        <button className="w-full bg-white text-[#75BF43] py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 min-h-[44px]">
          Register Now
        </button>
      </div>
    </div>
  );
}