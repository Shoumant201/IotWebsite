import Image from 'next/image';

export default function FounderProfile() {
  return (
    <section className="w-full relative flex flex-col items-center bg-white py-8" data-aos="fade-up">
      <div className="relative max-w-[400px] w-3/4 bg-transparent bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl border border-gray-200 flex flex-row justify-between items-center p-4 shadow-2xl shadow-green-500/20 md:mb-16">
        {/* Profile Image */}
        <div className="h-8 md:h-12 w-8 md:w-12 aspect-square rounded-xl overflow-hidden flex items-center justify-center relative">
          <Image
            alt="Founder"
            src="/NareshSejwal.jpeg"
            fill
            className="object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="w-3/5">
          <div className="text-[12px] md:text-[18px] w-full text-left font-semibold text-gray-900">Naresh Sejwal</div>
          <div className="text-gray-600 w-full text-left text-[12px]">Founder</div>
        </div>

        {/* Social Link */}
        <a
          href="https://www.linkedin.com/in/naresh-sejwal/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 md:h-12 w-8 md:w-12 aspect-square rounded-xl overflow-hidden flex items-center justify-center relative bg-[#0A66C2] hover:bg-[#004182] hover:shadow-lg transition-all duration-200"
        >
          <svg className="w-4 md:w-5 h-4 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </section>
  );
}