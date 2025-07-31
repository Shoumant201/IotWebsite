'use client'
import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollIndicator from "@/components/ScrollIndicator";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import ContactButtons from "@/components/home/ContactButtons";
import FounderProfile from "@/components/home/FounderProfile";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import EventsGrid from "@/components/home/EventsGrid";
import GrandEventSection from "@/components/home/GrandEventSection";
import TimelineSection from "@/components/home/TimelineSection";
import TeamSection from "@/components/home/TeamSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true, // Animation happens only once per reload
      offset: 50,
      duration: 800,
      easing: "ease-in-out-cubic",
      delay: 0,
      throttleDelay: 99,
      debounceDelay: 50,
      mirror: false, // Disable mirror for one-time animations
      anchorPlacement: 'top-bottom',
      disable: false,
    });

    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Navigation scroll functionality - Global function
    const handleNavClick = (targetId: string) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80;
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

    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash) {
        // Wait a bit for the page to fully load and AOS to initialize
        setTimeout(() => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            const headerOffset = hash === 'home' ? 0 : 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 1000); // Wait 1 second for everything to load
      }
    };

    // Handle hash navigation on page load
    handleHashNavigation();

    // Handle hash changes (when user navigates with browser back/forward)
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
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
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Buttons */}
        <ContactButtons />

        {/* Founder Profile */}
        <FounderProfile />

        {/* What We Do Section */}
        <WhatWeDoSection />

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Events Grid */}
        <EventsGrid />

        {/* Grand Event Section */}
        <GrandEventSection />

        {/* Timeline Section */}
        <TimelineSection />

        {/* Team Section */}
        <TeamSection />

        {/* Testimonial Section */}
        <TestimonialSection />
      </div>
    </>
  );
}