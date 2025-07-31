import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Statistics {
  target: number;
  label: string;
}

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState<Statistics[]>([
    { target: 50, label: "Members" },
    { target: 20, label: "IoT Projects" },
    { target: 15, label: "Events" },
    { target: 3, label: "Years" },
    { target: 25, label: "Testimonials" },
    { target: 100, label: "Successful Deployments" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        // Fetch data from all APIs to calculate real statistics
        const [events, team, testimonials] = await Promise.all([
          api.events.getAll(),
          api.team.getAll(),
          api.testimonials.getAll()
        ]);

        // Calculate dynamic statistics
        const dynamicStats = [
          { target: team.length || 50, label: "Members" },
          { target: 20, label: "IoT Projects" }, // Keep static for now
          { target: events.length || 15, label: "Events" },
          { target: 3, label: "Years" }, // Keep static
          { target: testimonials.length || 25, label: "Testimonials" },
          { target: 100, label: "Successful Deployments" }, // Keep static
        ];

        setStatistics(dynamicStats);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        // Keep default statistics on error
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    // Counter animation with delay to ensure DOM is ready
    const initCounters = () => {
      const counters = document.querySelectorAll('.counter');
      if (counters.length === 0) {
        setTimeout(initCounters, 100);
        return () => { };
      }

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
            const target = parseInt(counter.getAttribute('data-target') || '0');
            let count = 0;
            const duration = 4000; // 4 seconds for slower animation
            const increment = target / (duration / 16); // 60fps animation

            // Reset counter to 0 when it comes into view
            counter.textContent = '0';

            const updateCount = () => {
              count += increment;
              if (count >= target) {
                count = target;
                // Format the final number
                let displayText = target.toString();
                if (target >= 1000) {
                  displayText = Math.floor(target / 1000) + 'K+';
                } else {
                  displayText = target + '+';
                }
                counter.textContent = displayText;
              } else {
                // Format current count
                let displayText = Math.floor(count).toString();
                if (target >= 1000) {
                  displayText = Math.floor(count / 1000) + 'K+';
                } else {
                  displayText = Math.floor(count) + '+';
                }
                counter.textContent = displayText;
                requestAnimationFrame(updateCount);
              }
            };

            updateCount();
          } else {
            // Reset counter when it goes out of view
            const counter = entry.target as HTMLElement;
            counter.textContent = '0';
          }
        });
      }, options);

      counters.forEach(counter => {
        observer.observe(counter);
      });

      return () => {
        observer.disconnect();
      };
    };

    const cleanup = initCounters();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id="about" className="w-full mt-40 relative flex flex-col items-center bg-white text-gray-900 py-20" data-aos="fade-up">
      {/* Events Badge */}
      <div className="text-center mb-8">
        <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
          Events
        </p>
      </div>
      <div className="w-full relative flex flex-col items-center bg-white text-gray-900">
        <div className="text-center z-20 flex flex-col items-center max-w-6xl px-4">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
            Our Impact
          </h1>

          {/* Description */}
          <p className="w-11/12 text-lg mb-8 text-[10px] md:text-[14px] text-gray-600 text-balance leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            &quot;IoT Innovators Program is the 6-month long hands-on IoT development program conducted by IoT Innovators Foundation, started in 2024, to help students and professionals get started with Internet of Things while encouraging innovation. Throughout the program, participants work on real IoT projects under the guidance of experienced mentors. Top participants get exciting opportunities and industry connections.&quot;
          </p>
        </div>
      </div>

      {/* Statistics Grid with Counter Animation */}
      <div className="w-full flex flex-wrap justify-center md:gap-8 gap-4 mt-8 mb-16">
        {statistics.map((stat, index) => (
          <div key={index} className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target={stat.target}>
              0
            </div>
            <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}