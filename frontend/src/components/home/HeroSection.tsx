import Image from 'next/image';

export default function HeroSection() {
  return (
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

        {/* Main Heading - Ignite IoT Innovation Together */}
        <h1 
          className="text-2xl sm:text-2xl md:text-2xl font-bold text-black leading-tight mb-8" 
          data-aos="fade-down" 
          data-aos-delay="200"
        >
          &quot;Ignite IoT Innovation Together&quot;
        </h1>

        {/* Apply Now Button - Fixed positioning issue */}
        <div className="relative z-30" data-aos="fade-up" data-aos-delay="600" data-aos-once="false">
          <button className="bg-[#75BF43] hover:bg-[#5a9f33] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-110 transform">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}