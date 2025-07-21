import Image from 'next/image';

const events = [
  {
    image: "/FaceinFocus.png",
    title: "IoT Workshop 2024",
    description: "Hands-on learning experience"
  },
  {
    image: "/IOT_Tech_Hunt.png",
    title: "Tech Conference 2024",
    description: "Exploring the future of IoT"
  },
  {
    image: "/IOTOPENDOORS.png",
    title: "IoT Hackathon",
    description: "48-hour innovation challenge"
  },
  {
    image: "/Talent_Acquisition_Techathon.png",
    title: "Industry Networking",
    description: "Connect with IoT professionals"
  },
  {
    image: "/Group.jpg",
    title: "Product Showcase",
    description: "Demonstrating IoT innovations"
  },
  {
    image: "/Group-XAj550kD.png",
    title: "IoT Development Workshop",
    description: "Learn to build IoT solutions"
  }
];

export default function EventsGrid() {
  return (
    <section className="w-full relative flex flex-col items-center bg-white text-gray-900 py-8">
      <div className="w-full flex justify-center items-center">
        <div className="w-5/6 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-6 mt-8 items-center justify-items-center max-w-7xl">
          {events.map((event, index) => (
            <div 
              key={index}
              className="group relative aspect-square max-w-[400px] w-full bg-white rounded-3xl border border-gray-200 flex flex-col justify-center p-4 shadow-[0_20px_50px_rgba(117,191,67,0.3)] hover:shadow-[0_30px_60px_rgba(117,191,67,0.5)] overflow-hidden cursor-pointer hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 transform" 
              data-aos="fade-up" 
              data-aos-delay={100 * (index + 1)}
            >
              <Image
                alt={event.title}
                src={event.image}
                fill
                className="object-cover z-10 rounded-3xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{event.title}</h3>
                <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">{event.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#75BF43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}