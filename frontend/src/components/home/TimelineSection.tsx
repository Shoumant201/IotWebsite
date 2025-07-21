const timelineEvents = [
  {
    year: "2024",
    title: "Foundation Established",
    description: "IoT Innovators Foundation was founded at Herald College Kathmandu, marking the beginning of our journey to revolutionize IoT education and innovation.",
    side: "left"
  },
  {
    year: "Early 2024",
    title: "First DevFest",
    description: "Organized our inaugural DevFest, bringing together developers, students, and tech enthusiasts to explore the latest in IoT development and innovation.",
    side: "right"
  },
  {
    year: "Mid 2024",
    title: "Tech Connect Launch",
    description: "Launched Tech Connect initiative to bridge the gap between industry professionals and students, fostering meaningful connections and mentorship opportunities.",
    side: "left"
  },
  {
    year: "Late 2024",
    title: "Program Expansion",
    description: "Expanded our 6-month IoT Innovators Program, reaching over 500 students and establishing partnerships with 25+ industry leaders across multiple countries.",
    side: "right"
  },
  {
    year: "End 2024",
    title: "Second DevFest",
    description: "Successfully hosted our second DevFest with increased participation, featuring advanced IoT workshops, hackathons, and industry showcases.",
    side: "left"
  },
  {
    year: "2025 & Beyond",
    title: "Global Expansion",
    description: "Expanding our reach globally, establishing international partnerships, and continuing to innovate in IoT education and technology development.",
    side: "right",
    isFuture: true
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="w-full relative flex flex-col items-center bg-white text-gray-900 py-20" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Timeline Badge */}
          <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
            Timeline
          </p>
          <h2 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="300">
            Milestones in IoT Innovation
          </p>
        </div>

        {/* Desktop Timeline Container */}
        <div className="relative hidden md:block">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#75BF43] to-[#5a9f33] h-full"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-center" data-aos={event.side === "left" ? "fade-right" : "fade-left"} data-aos-delay={100 * (index + 1)}>
                {event.side === "left" ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 ${event.isFuture ? 'bg-gradient-to-br from-[#75BF43]/5 to-[#5a9f33]/5 border-[#75BF43]/20' : ''}`}>
                        <h3 className="text-xl font-bold text-[#75BF43] mb-2">{event.year}</h3>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </div>
                    </div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10 ${event.isFuture ? 'animate-pulse bg-gradient-to-r from-[#75BF43] to-[#5a9f33]' : ''}`}></div>
                    <div className="w-1/2 pl-8"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8"></div>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10 ${event.isFuture ? 'animate-pulse bg-gradient-to-r from-[#75BF43] to-[#5a9f33]' : ''}`}></div>
                    <div className="w-1/2 pl-8">
                      <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 ${event.isFuture ? 'bg-gradient-to-br from-[#75BF43]/5 to-[#5a9f33]/5 border-[#75BF43]/20' : ''}`}>
                        <h3 className="text-xl font-bold text-[#75BF43] mb-2">{event.year}</h3>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline for smaller screens */}
        <div className="md:hidden">
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`w-4 h-4 bg-[#75BF43] rounded-full mt-2 flex-shrink-0 ${event.isFuture ? 'animate-pulse' : ''}`}></div>
                <div className={`bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex-1 ${event.isFuture ? 'bg-gradient-to-br from-[#75BF43]/5 to-[#5a9f33]/5 border-[#75BF43]/20' : ''}`}>
                  <h3 className="text-lg font-bold text-[#75BF43] mb-1">{event.year}</h3>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}