'use client'
// pages/index.tsx
import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 150,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Head>
        <title>IoT Community</title>
      </Head>

      <div className="min-h-screen -mt-20">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center"
          style={{
            backgroundImage: 'url(/CircuitPrimary1.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

          <div className="relative z-10 flex flex-col items-center text-center px-4" data-aos="fade-up">
            <img src="/iot.png" alt="IoT" className="h-50 w-auto mb-4" data-aos="zoom-in" data-aos-delay="100" />

            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight" data-aos="fade-down">
              <span className="text-[#75BF43]">Ignite </span>
              <span className="text-[#75BF43]">IoT </span>
              Innovation <span className="text-[#75BF43]">Together</span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-white/90 mt-6 max-w-2xl font-light italic"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              "Pioneering the future of Internet of Things technology through innovation, research, and collaborative learning at Herald College Kathmandu."
            </p>

            <div className="mt-10" data-aos="fade-up" data-aos-delay="500">
              <button className="bg-[#75BF43] hover:bg-[#5a9f33] text-white px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:shadow-lg hover:scale-105">
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
            className="w-10/12 mx-auto mb-16 md:mb-24 rounded-3xl flex justify-center relative overflow-hidden"
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We focus on cutting-edge IoT solutions and innovative technology development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  desc: "Developing cutting-edge IoT solutions that solve real-world problems",
                  color: "blue",
                },
                {
                  title: "Research",
                  desc: "Conducting advanced research in IoT technologies and applications",
                  color: "purple",
                },
                {
                  title: "Collaboration",
                  desc: "Building a community of IoT enthusiasts and technology innovators",
                  color: "green",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 150}
                >
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`w-8 h-8 text-${item.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="bg-gray-900 text-white py-20 fade-section"
          id="cta"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Innovate with Us?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of IoT innovators and be part of the technological revolution
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
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
