'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';

  const navigation = [
    { name: 'Home', href: '/', section: 'home' },
    { name: 'About Us', href: '/', section: 'about-us' },
    { name: 'Events', href: '/', section: 'about' },
    { name: 'Timeline', href: '/', section: 'timeline' },
    { name: 'Team', href: '/', section: 'team' },
    { name: 'Testimonials', href: '/', section: 'testimonials' },
    { name: 'Contact Us', href: '/contact', section: null },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navigation[0]) => {
    // Handle Contact Us separately (goes to dedicated page)
    if (item.name === 'Contact Us') {
      setIsMenuOpen(false);
      return; // Let the default link behavior handle this
    }

    // For all other items with sections, navigate to home page and scroll to section
    if (item.section) {
      e.preventDefault();
      
      if (isHomePage) {
        // If already on home page, just scroll to section
        const targetElement = document.getElementById(item.section);
        if (targetElement) {
          const headerOffset = item.name === 'Home' ? 0 : 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If on another page, navigate to home page with hash
        window.location.href = `/#${item.section}`;
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'transparent',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Farthest Left (Near Screen Border) */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src="/DevCorp.png"
                  alt="DevCorp"
                  className="h-10 w-auto"
                />
                <div className="w-px h-8 bg-gray-400"></div>
                <img
                  src="/iot.png"
                  alt="IoT"
                  className="h-10 w-auto"
                />
              </div>
              {/* <span className="text-xl font-bold text-gray-900">IoT Innovators</span> */}
            </Link>
          </div>

          {/* Center Navigation with Translucent Background */}
          <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1 bg-[#75BF43]/20 backdrop-blur-sm rounded-full px-3 py-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-gray-700 bg-transparent border-transparent hover:text-gray-900 hover:bg-[#75BF43]/40 hover:border-[#75BF43]/60 px-5 py-3 text-sm font-medium transition-all duration-200 rounded-full border"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Apply Now Button - Farthest Right (Near Screen Border) */}
          <div className="hidden lg:flex">
            <Link
              href="/apply"
              className="text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, rgba(117, 191, 67, 1) 28%, rgba(90, 191, 67, 1) 84%)'
              }}
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#75BF43] focus:outline-none focus:text-[#75BF43] p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-gray-700 hover:text-white hover:bg-[#75BF43] block px-4 py-2 text-base font-medium transition-all duration-200 rounded-full"
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Apply Now Button */}
              <Link
                href="/apply"
                className="text-white font-semibold px-4 py-2 rounded-full text-base transition-all duration-200 block text-center mt-4"
                style={{
                  background: 'linear-gradient(90deg, rgba(117, 191, 67, 1) 28%, rgba(90, 191, 67, 1) 84%)'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}