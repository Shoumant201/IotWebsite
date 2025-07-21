'use client';

import { useEffect } from 'react';

export default function StatisticsClient() {
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
            const duration = 2000; // 2 seconds for animation
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
                if (target >= 1000 && count >= 1000) {
                  displayText = Math.floor(count / 1000) + 'K+';
                } else {
                  displayText = Math.floor(count) + '+';
                }
                counter.textContent = displayText;
                requestAnimationFrame(updateCount);
              }
            };

            updateCount();
            observer.unobserve(counter); // Only animate once
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

  return null; // This component doesn't render anything visible
}