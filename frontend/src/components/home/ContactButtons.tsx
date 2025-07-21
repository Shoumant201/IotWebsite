export default function ContactButtons() {
  return (
    <section className="w-full relative flex flex-row items-center justify-center bg-white text-gray-900 mb-8 py-8" data-aos="fade-up">
      <a
        href="mailto:iot.innovators@heraldcollege.edu.np"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-b from-[#75BF43] to-[#5a9f33] border border-gray-300 text-white px-5 py-3 rounded-full font-normal cursor-pointer text-[12px] md:text-[14px] mr-4 hover:shadow-lg transition-all duration-200"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        Get In Touch
      </a>
    </section>
  );
}