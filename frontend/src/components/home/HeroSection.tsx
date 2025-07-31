'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api, Hero } from '@/lib/api';

export default function HeroSection() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroData = await api.heroes.getAll();
        setHeroes(heroData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching heroes:', err);
        setError('Failed to load hero content');
        setLoading(false);
        // Fallback to default hero
        setHeroes([{
          id: 1,
          title: "Ignite IoT Innovation Together",
          subtitle: "Welcome to IoT Innovation Hub",
          description: "Join our community of innovators, developers, and tech enthusiasts as we explore the endless possibilities of Internet of Things technology.",
          background_image: "/Group-XAj550kD.png",
          cta_text: "Apply Now",
          cta_link: "#contact",
          is_active: true,
          order_index: 1,
          created_at: "",
          updated_at: ""
        }]);
      }
    };

    fetchHeroes();
  }, []);

  // Auto-rotate heroes if multiple exist
  useEffect(() => {
    if (heroes.length > 1) {
      const interval = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % heroes.length);
      }, 8000); // Change every 8 seconds

      return () => clearInterval(interval);
    }
  }, [heroes.length]);

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error || heroes.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No hero content available'}</p>
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

  const hero = heroes[currentHero];

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${hero.background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* White Gradient Overlay - White at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
        {/* IoT Logo */}
        <Image
          src="/iot.png"
          alt="IoT"
          width={240}
          height={240}
          className="mb-8"
          data-aos="zoom-in"
          data-aos-delay="100"
          priority
        />

        {/* Dynamic Hero Title */}
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight mb-4" 
          data-aos="fade-down" 
          data-aos-delay="200"
        >
          &quot;{hero.title}&quot;
        </h1>

        {/* Dynamic Hero Subtitle */}
        <h2 
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6" 
          data-aos="fade-up" 
          data-aos-delay="300"
        >
          {hero.subtitle}
        </h2>

        {/* Dynamic Hero Description */}
        <p 
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed" 
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          {hero.description}
        </p>

        {/* Dynamic CTA Button */}
        <div className="relative z-30" data-aos="fade-up" data-aos-delay="600" data-aos-once="false">
          <a 
            href={hero.cta_link}
            className="bg-[#75BF43] hover:bg-[#5a9f33] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-110 transform inline-block"
          >
            {hero.cta_text}
          </a>
        </div>

        {/* Hero Indicators (if multiple heroes) */}
        {heroes.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHero 
                    ? 'bg-[#75BF43] scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to hero ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}