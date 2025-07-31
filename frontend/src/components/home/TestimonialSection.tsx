'use client';

import { useEffect, useRef, useState } from 'react';
import { api, Testimonial } from '@/lib/api';

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const testimonialData = await api.testimonials.getAll();
                setTestimonials(testimonialData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Failed to load testimonials');
                setLoading(false);
                
                // Fallback to default testimonials
                setTestimonials([
                    {
                        id: 1,
                        name: "Rajesh Kumar",
                        role: "Software Engineer",
                        company: "Tech Solutions Nepal",
                        image: "/testimonial1.jpg",
                        content: "The IoT Innovators program completely transformed my understanding of connected devices. The hands-on approach and expert mentorship helped me land my dream job in IoT development.",
                        rating: 5,
                        is_active: true,
                        order_index: 1,
                        created_at: "",
                        updated_at: ""
                    },
                    {
                        id: 2,
                        name: "Priya Sharma",
                        role: "IoT Developer",
                        company: "Smart Systems Pvt Ltd",
                        image: "/testimonial2.jpg",
                        content: "Amazing community and learning experience! The 6-month program provided practical skills that I use daily in my current role. Highly recommend to anyone interested in IoT.",
                        rating: 5,
                        is_active: true,
                        order_index: 2,
                        created_at: "",
                        updated_at: ""
                    },
                    {
                        id: 3,
                        name: "Amit Thapa",
                        role: "Hardware Engineer",
                        company: "Innovation Labs",
                        image: "/testimonial3.jpg",
                        content: "The program's focus on real-world projects and industry connections made all the difference. I'm now working on cutting-edge IoT solutions thanks to this foundation.",
                        rating: 5,
                        is_active: true,
                        order_index: 3,
                        created_at: "",
                        updated_at: ""
                    }
                ]);
            }
        };

        fetchTestimonials();
    }, []);

    const scrollToTestimonial = (index: number) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const cardWidth = 344; // Card width (320px) + gap (24px)
        const targetScrollLeft = cardWidth * index;

        // Smooth scroll to the target testimonial
        scrollContainer.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });

        setCurrentIndex(index);
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollIntervalId: NodeJS.Timeout;
        let indexIntervalId: NodeJS.Timeout;
        const cardWidth = 344; // Card width (320px) + gap (24px)
        const scrollStep = 1;
        const scrollDelay = 20; // Smooth scrolling
        const testimonialDuration = 5000; // 5 seconds per testimonial

        const startScrolling = () => {
            if (isPaused) return;

            scrollIntervalId = setInterval(() => {
                if (scrollContainer && !isPaused) {
                    scrollContainer.scrollLeft += scrollStep;

                    // Create infinite scroll effect - reset when we've scrolled through one set
                    const maxScroll = cardWidth * testimonials.length;
                    if (scrollContainer.scrollLeft >= maxScroll) {
                        scrollContainer.scrollLeft = 0;
                    }
                }
            }, scrollDelay);
        };

        const startIndexTracking = () => {
            if (isPaused) return;

            indexIntervalId = setInterval(() => {
                if (!isPaused) {
                    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
                }
            }, testimonialDuration);
        };

        const handleMouseEnter = () => {
            setIsPaused(true);
            clearInterval(scrollIntervalId);
            clearInterval(indexIntervalId);
        };

        const handleMouseLeave = () => {
            setIsPaused(false);
            setTimeout(() => {
                startScrolling();
                startIndexTracking();
            }, 100);
        };

        // Start animations after a short delay
        setTimeout(() => {
            startScrolling();
            startIndexTracking();
        }, 500);

        // Add event listeners
        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(scrollIntervalId);
            clearInterval(indexIntervalId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isPaused]);

    if (loading) {
        return (
            <section id="testimonials" className="w-full relative flex flex-col items-center bg-gradient-to-br from-gray-50 to-white text-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full">
                            Testimonials
                        </p>
                        <h2 className="text-3xl md:text-6xl font-bold mb-4">What Our Students Say</h2>
                        <p className="text-lg text-gray-600">Hear from our successful graduates and their IoT journey</p>
                    </div>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading testimonials...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="testimonials" className="w-full relative flex flex-col items-center bg-gradient-to-br from-gray-50 to-white text-gray-900 py-20" data-aos="fade-up">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Testimonials Badge */}
                    <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
                        What Our Students Say
                    </h2>
                    <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="300">
                        Hear from our successful graduates and their IoT journey
                    </p>
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                </div>

                {/* Desktop Auto-scrolling Testimonials Container */}
                <div className="relative hidden md:block">
                    {/* Auto-scrolling Testimonials */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-hidden scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {/* Triple testimonials for seamless infinite loop */}
                        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                {/* Quote Icon */}
                                <div className="mb-4">
                                    <svg className="w-8 h-8 text-[#75BF43] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                    </svg>
                                </div>

                                {/* Testimonial Content */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    "{testimonial.content}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#75BF43] to-[#5a9f33] rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-lg font-bold">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                                        <p className="text-[#75BF43] text-xs font-medium">{testimonial.role}</p>
                                        <p className="text-gray-500 text-xs">{testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Static Grid Layout */}
                <div className="md:hidden">
                    <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
                        {testimonials.slice(0, 3).map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Quote Icon */}
                                <div className="mb-3">
                                    <svg className="w-6 h-6 text-[#75BF43] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                    </svg>
                                </div>

                                {/* Testimonial Content */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    "{testimonial.content}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#75BF43] to-[#5a9f33] rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm font-bold">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                                        <p className="text-[#75BF43] text-xs font-medium">{testimonial.role}</p>
                                        <p className="text-gray-500 text-xs">{testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Indicators - Clickable Dots (Desktop Only) */}
                <div className="hidden md:flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#75BF43]/50 min-h-[44px] min-w-[44px] flex items-center justify-center ${index === currentIndex
                                    ? 'bg-[#75BF43] scale-125 shadow-lg'
                                    : 'bg-gray-300 hover:bg-[#75BF43]/60'
                                }`}
                            style={{ touchAction: 'manipulation' }}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
                    <p className="text-gray-600 mb-6">Ready to start your IoT journey?</p>
                    <a
                        href="/apply"
                        className="inline-flex items-center bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] active:scale-95 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform shadow-[0_10px_30px_rgba(117,191,67,0.3)] min-h-[44px]"
                        style={{ touchAction: 'manipulation' }}
                    >
                        Join Our Program
                        <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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