export default function AboutSection() {
  return (
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
          Founded in 2024 at Herald College Kathmandu, IoT Innovators is a dynamic community dedicated to making Internet of Things technology accessible and innovative for all. With a mission to empower students and professionals through hands-on learning and cutting-edge research, we&apos;ve built a vibrant ecosystem of tech enthusiasts, developers, and innovators. Our programs focus on practical IoT development, mentorship in emerging technologies, and career guidance in the rapidly evolving tech landscape. We collaborate with industry leaders and academic institutions to offer real-world project experiences, all while staying rooted in innovation, collaboration, and community growth. At IoT Innovators, every member&apos;s journey in technology is a shared success story. Join us in shaping a future where IoT innovation drives positive change, and where every idea has the potential to transform the world through connected technology.
        </p>
      </div>
    </section>
  );
}