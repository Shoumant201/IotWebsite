'use client'
// pages/index.tsx
import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 50, // Reduced offset for faster loading
      duration: 800, // Faster animation duration
      easing: "ease-in-out-cubic",
      delay: 0, // No initial delay
      throttleDelay: 99, // Faster throttle for better performance
      debounceDelay: 50, // Faster debounce
      mirror: true, // Enable animations when scrolling from top
      anchorPlacement: 'top-bottom', // Trigger when element top hits viewport bottom
      disable: false, // Ensure AOS is enabled
    });

    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Navigation scroll functionality - Global function
    const handleNavClick = (targetId: string) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Make navigation function globally available
    (window as unknown as { handleNavClick: (targetId: string) => void }).handleNavClick = handleNavClick;

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
            // let animationId: number;

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
    <>
      <Head>
        <title>IoT Community</title>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Custom Scroll Indicator */}
        <ScrollIndicator />
        
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: 'url(/Group-XAj550kD.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* White Gradient Overlay - White at top and bottom */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
          />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
            {/* IoT Logo */}
            <img
              src="/iot.png"
              alt="IoT"
              className="h-60 w-auto mb-8"
              data-aos="zoom-in"
              data-aos-delay="100"
            />

            {/* Main Heading - Ignite IoT Innovation Together */}
            <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-black leading-tight mb-8" data-aos="fade-down" data-aos-delay="200">
              &quot;Ignite IoT Innovation Together&quot;
            </h1>

            {/* Quote */}
            {/* <p
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto font-light italic"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              "Pioneering the future of Internet of Things technology through innovation, research, and collaborative learning at Herald College Kathmandu."
            </p> */}

            {/* Apply Now Button - Fixed positioning issue */}
            <div className="relative z-30" data-aos="fade-up" data-aos-delay="600" data-aos-once="false">
              <button className="bg-[#75BF43] hover:bg-[#5a9f33] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-110 transform">
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-25 bg-white relative fade-section"
          id="features"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          {/* Image with fixed box shadow (no gradient border) */}
          <div
            className="w-10/12 mx-auto mb-8 rounded-3xl flex justify-center relative overflow-hidden"
            style={{
              height: "620px",
              boxShadow: "0 0 30px 8px rgba(117, 191, 67, 0.7)",
            }}
            data-aos="zoom-in-up"
          >
            <img
              src="/Group.jpg"
              alt="Community Visual"
              className="rounded-3xl object-cover w-full h-full"
              style={{
                border: "none",
              }}
            />
          </div>
        </section>

        {/* About Us Section - Moved below Group.jpg with white background */}
        <section id="about-us" className="w-full relative flex flex-col items-center bg-white text-gray-900 py-10" data-aos="fade-up">
          <div className="text-center z-20 flex flex-col items-center max-w-6xl px-4">
            {/* About Us Badge */}
            <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
              About Us
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
              &quot;Know About &quot;<br />
              &quot;IoT Innovators Foundation&quot;
            </h1>

            {/* Description */}
            <p className="w-11/12 text-lg mb-8 text-[10px] md:text-[14px] text-gray-600 text-balance leading-relaxed" data-aos="fade-up" data-aos-delay="400">
              Founded in 2024 at Herald College Kathmandu, IoT Innovators is a dynamic community dedicated to making Internet of Things technology accessible and innovative for all. With a mission to empower students and professionals through hands-on learning and cutting-edge research, we've built a vibrant ecosystem of tech enthusiasts, developers, and innovators. Our programs focus on practical IoT development, mentorship in emerging technologies, and career guidance in the rapidly evolving tech landscape. We collaborate with industry leaders and academic institutions to offer real-world project experiences, all while staying rooted in innovation, collaboration, and community growth. At IoT Innovators, every member's journey in technology is a shared success story. Join us in shaping a future where IoT innovation drives positive change, and where every idea has the potential to transform the world through connected technology.
            </p>
          </div>
        </section>

        {/* Contact Buttons Section */}
        <section className="w-full relative flex flex-row items-center justify-center bg-white text-gray-900 mb-8 py-8" data-aos="fade-up">
          <a
            href="mailto:iot.innovators@heraldcollege.edu.np"
            target="_blank"
            className="bg-gradient-to-b from-[#75BF43] to-[#5a9f33] border border-gray-300 text-white px-5 py-3 rounded-full font-normal cursor-pointer text-[12px] md:text-[14px] mr-4 hover:shadow-lg transition-all duration-200"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            Get In Touch
          </a>
          <a
            href="#"
            target="_blank"
            className="bg-transparent bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 text-gray-900 px-5 py-3 rounded-full font-normal cursor-pointer text-[12px] md:text-[14px] hover:shadow-lg transition-all duration-200"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            Visit Our Website
          </a>
        </section>

        {/* Founder Profile Section */}
        <section className="w-full relative flex flex-col items-center bg-white py-8" data-aos="fade-up">
          <div className="relative max-w-[400px] w-3/4 bg-transparent bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl border border-gray-200 flex flex-row justify-between items-center p-4 shadow-2xl shadow-green-500/20 md:mb-16">
            {/* Profile Image */}
            <div className="h-8 md:h-12 w-8 md:w-12 aspect-square rounded-xl overflow-hidden flex items-center justify-center relative">
              <img
                alt="Founder"
                className="w-full h-full object-cover"
                src="/NareshSejwal.jpeg"
              />
            </div>

            {/* Name and Title */}
            <div className="w-3/5">
              <div className="text-[12px] md:text-[18px] w-full text-left font-semibold text-gray-900">Naresh Sejwal</div>
              <div className="text-gray-600 w-full text-left text-[12px]">Founder</div>
            </div>

            {/* Social Link */}
            <a
              href="#"
              target="_blank"
              className="h-8 md:h-12 w-8 md:w-12 aspect-square rounded-xl overflow-hidden flex items-center justify-center relative bg-[#0A66C2] hover:bg-[#004182] hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-4 md:w-5 h-4 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 bg-white" data-aos="fade-up" data-aos-offset="30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-offset="30">
              <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We focus on cutting-edge IoT solutions and innovative technology development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  desc: "Developing cutting-edge IoT solutions that solve real-world problems",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  title: "Research",
                  desc: "Conducting advanced research in IoT technologies and applications",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: "Collaboration",
                  desc: "Building a community of IoT enthusiasts and technology innovators",
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-[0_10px_40px_rgba(117,191,67,0.15)] hover:shadow-[0_20px_50px_rgba(117,191,67,0.25)] transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  data-aos-offset="30"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#75BF43] to-[#5a9f33] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#75BF43] transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#75BF43]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
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
                "IoT Innovators Program is the 6-month long hands-on IoT development program conducted by IoT Innovators Foundation, started in 2024, to help students and professionals get started with Internet of Things while encouraging innovation. Throughout the program, participants work on real IoT projects under the guidance of experienced mentors. Top participants get exciting opportunities and industry connections."
              </p>
            </div>
          </div>

          {/* Statistics Grid with Counter Animation */}
          <div className="w-full flex flex-wrap justify-center md:gap-8 gap-4 mt-8 mb-16">
            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="500">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">Students Enrolled</div>
            </div>

            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="50">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">IoT Projects</div>
            </div>

            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="300">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="25">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">Industry Partners</div>
            </div>

            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="400">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="10">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">Countries Reached</div>
            </div>

            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="500">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="2000">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">LinkedIn Followers</div>
            </div>

            <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="600">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#75BF43] to-[#5a9f33] bg-clip-text text-transparent counter" data-target="100">
                0
              </div>
              <div className="text-gray-600 text-sm md:text-base">Successful Deployments</div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="w-5/6 grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-6 mt-[40px] md:mt-8 items-center justify-items-center max-w-7xl">
            {/* Event Card 1 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="100">
              <img
                alt="IoT Workshop"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                src="/FaceinFocus.png"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">IoT Workshop 2024</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">Hands-on learning experience</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>

            {/* Event Card 2 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="200">
              <img
                alt="Tech Conference"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700"
                src="/IOT_Tech_Hunt.png"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">Tech Conference 2024</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">Exploring the future of IoT</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>

            {/* Event Card 3 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="300">
              <img
                alt="Hackathon"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                src="/IOTOPENDOORS.png"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">IoT Hackathon</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">48-hour innovation challenge</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>

            {/* Event Card 4 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="400">
              <img
                alt="Networking Event"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700"
                src="/Talent_Acquisition_Techathon.png"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">Industry Networking</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">Connect with IoT professionals</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>

            {/* Event Card 5 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="500">
              <img
                alt="Product Launch"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                src="/Group.jpg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">Product Showcase</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">Demonstrating IoT innovations</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>

            {/* Event Card 6 */}
            <div className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" data-aos="fade-up" data-aos-delay="600">
              <img
                alt="Workshop"
                className="absolute right-0 top-0 w-full h-full object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700"
                src="/Group-XAj550kD.png"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">IoT Development Workshop</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">Learn to build IoT solutions</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
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

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#75BF43] to-[#5a9f33] h-full"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {/* Timeline Item 1 - Founding */}
                <div className="relative flex items-center" data-aos="fade-right" data-aos-delay="100">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">2024</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Foundation Established</h4>
                      <p className="text-gray-600 text-sm">IoT Innovators Foundation was founded at Herald College Kathmandu, marking the beginning of our journey to revolutionize IoT education and innovation.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* Timeline Item 2 - First DevFest */}
                <div className="relative flex items-center" data-aos="fade-left" data-aos-delay="200">
                  <div className="w-1/2 pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">Early 2024</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">First DevFest</h4>
                      <p className="text-gray-600 text-sm">Organized our inaugural DevFest, bringing together developers, students, and tech enthusiasts to explore the latest in IoT development and innovation.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 3 - Tech Connect */}
                <div className="relative flex items-center" data-aos="fade-right" data-aos-delay="300">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">Mid 2024</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Tech Connect Launch</h4>
                      <p className="text-gray-600 text-sm">Launched Tech Connect initiative to bridge the gap between industry professionals and students, fostering meaningful connections and mentorship opportunities.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* Timeline Item 4 - Program Expansion */}
                <div className="relative flex items-center" data-aos="fade-left" data-aos-delay="400">
                  <div className="w-1/2 pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">Late 2024</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Program Expansion</h4>
                      <p className="text-gray-600 text-sm">Expanded our 6-month IoT Innovators Program, reaching over 500 students and establishing partnerships with 25+ industry leaders across multiple countries.</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 5 - Second DevFest */}
                <div className="relative flex items-center" data-aos="fade-right" data-aos-delay="500">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">End 2024</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Second DevFest</h4>
                      <p className="text-gray-600 text-sm">Successfully hosted our second DevFest with increased participation, featuring advanced IoT workshops, hackathons, and industry showcases.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#75BF43] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* Timeline Item 6 - Future Vision */}
                <div className="relative flex items-center" data-aos="fade-left" data-aos-delay="600">
                  <div className="w-1/2 pr-8"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#75BF43] to-[#5a9f33] rounded-full border-4 border-white shadow-lg z-10 animate-pulse"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-gradient-to-br from-[#75BF43]/5 to-[#5a9f33]/5 p-6 rounded-2xl shadow-lg border border-[#75BF43]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-bold text-[#75BF43] mb-2">2025 & Beyond</h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Expansion</h4>
                      <p className="text-gray-600 text-sm">Expanding our reach globally, establishing international partnerships, and continuing to innovate in IoT education and technology development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Timeline for smaller screens */}
            <div className="md:hidden mt-16">
              <div className="space-y-8">
                {[
                  { year: "2024", title: "Foundation Established", desc: "IoT Innovators Foundation was founded at Herald College Kathmandu." },
                  { year: "Early 2024", title: "First DevFest", desc: "Organized our inaugural DevFest for developers and tech enthusiasts." },
                  { year: "Mid 2024", title: "Tech Connect Launch", desc: "Launched Tech Connect initiative to bridge industry and students." },
                  { year: "Late 2024", title: "Program Expansion", desc: "Expanded our IoT program reaching 500+ students globally." },
                  { year: "End 2024", title: "Second DevFest", desc: "Successfully hosted our second DevFest with increased participation." },
                  { year: "2025 & Beyond", title: "Global Expansion", desc: "Expanding globally with international partnerships." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="w-4 h-4 bg-[#75BF43] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex-1">
                      <h3 className="text-lg font-bold text-[#75BF43] mb-1">{item.year}</h3>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section id="team" className="w-full relative flex flex-col items-center bg-white text-gray-900 py-20" data-aos="fade-up" data-aos-offset="30">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              {/* Team Badge */}
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

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Team Member 1 - Founder */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="100" data-aos-offset="30">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/NareshSejwal.jpeg"
                    alt="Naresh Sejwal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Naresh Sejwal</h3>
                <p className="text-[#75BF43] text-center mb-3 font-semibold">Founder & CEO</p>
                <p className="text-gray-600 text-sm text-center mb-4">Visionary leader driving IoT innovation and community building at Herald College Kathmandu.</p>
                <div className="flex justify-center">
                  <a href="#" className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 2 - Co-Founder */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="200" data-aos-offset="30">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#75BF43] to-[#5a9f33] flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">John Doe</h3>
                <p className="text-[#75BF43] text-center mb-3 font-semibold">Co-Founder & CTO</p>
                <p className="text-gray-600 text-sm text-center mb-4">Technical expert specializing in IoT architecture and embedded systems development.</p>
                <div className="flex justify-center">
                  <a href="#" className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 3 - Lead Developer */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="300" data-aos-offset="30">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Jane Smith</h3>
                <p className="text-[#75BF43] text-center mb-3 font-semibold">Lead Developer</p>
                <p className="text-gray-600 text-sm text-center mb-4">Full-stack developer with expertise in IoT platforms and cloud integration solutions.</p>
                <div className="flex justify-center">
                  <a href="#" className="bg-[#0A66C2] hover:bg-[#004182] text-white p-2 rounded-lg transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* View All Team Button */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="400" data-aos-offset="30">
              <a
                href="/team"
                className="inline-flex items-center bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform shadow-[0_10px_30px_rgba(117,191,67,0.3)]"
              >
                View All Team Members
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full relative flex flex-col items-center bg-gradient-to-br from-gray-50 to-white text-gray-900 py-20" data-aos="fade-up">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              {/* Contact Badge */}
              <p className="text-lg mb-4 text-gray-600 bg-gray-100 text-[12px] inline-block px-4 py-2 rounded-full" data-aos="fade-down" data-aos-delay="100">
                Contact Us
              </p>
              <h2 className="text-3xl md:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="300">
                Ready to join the IoT revolution? Let's connect!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8" data-aos="fade-right" data-aos-delay="300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                  {/* Email */}
                  <div className="flex items-center mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-[#75BF43] rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a href="mailto:iot.innovators@heraldcollege.edu.np" className="text-[#75BF43] hover:underline">
                        iot.innovators@heraldcollege.edu.np
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-[#75BF43] rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">Herald College Kathmandu, Nepal</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center mb-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-[#75BF43] rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Follow Us</h4>
                      <div className="flex space-x-3 mt-2">
                        <a href="#" className="text-[#0A66C2] hover:text-[#004182] transition-colors duration-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a href="#" className="text-[#1DA1F2] hover:text-[#0d8bd9] transition-colors duration-200">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-left" data-aos-delay="400">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75BF43] focus:border-transparent transition-all duration-200"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75BF43] focus:border-transparent transition-all duration-200"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75BF43] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75BF43] focus:border-transparent transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#75BF43] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="bg-white text-gray-900 py-20"
          id="cta"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Innovate with Us?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of IoT innovators and be part of the technological revolution
            </p>
            <button className="bg-[#75BF43] hover:bg-[#5a9f33] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Get Started Today
            </button>
          </div>
        </section>
      </div>

      {/* Fade out effect styling */}
      <style jsx>{`
        .fade-section {
          position: relative;
        }

        .fade-section::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
