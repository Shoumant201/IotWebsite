import Image from 'next/image';

export default function FeaturesSection() {
  return (
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
        <Image
          src="/Group.jpg"
          alt="Community Visual"
          fill
          className="rounded-3xl object-cover"
          style={{ border: "none" }}
        />
      </div>
    </section>
  );
}