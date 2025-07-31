import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  is_active: boolean;
}

export default function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const featuresData = await api.features.getAll();
        // Filter only active features
        const activeFeatures = featuresData.filter((feature: any) => feature.is_active);
        setFeatures(activeFeatures);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features');
        // Fallback to default image if API fails
        setFeatures([{
          id: 1,
          title: "Community Visual",
          description: "Our IoT community",
          image: "/Group.jpg",
          is_active: true
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section
        className="py-25 bg-white relative fade-section"
        id="features"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div
          className="w-10/12 mx-auto mb-8 rounded-3xl flex justify-center relative overflow-hidden bg-gray-200 animate-pulse"
          style={{ height: "620px" }}
        />
      </section>
    );
  }

  if (error || features.length === 0) {
    return (
      <section
        className="py-25 bg-white relative fade-section"
        id="features"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {/* Fallback to default image */}
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

  return (
    <section
      className="py-25 bg-white relative fade-section"
      id="features"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      {/* Display feature images in a grid or carousel */}
      <div className="w-10/12 mx-auto space-y-8">
        {features.slice(0, 3).map((feature, index) => (
          <div
            key={feature.id}
            className="rounded-3xl flex justify-center relative overflow-hidden"
            style={{
              height: "620px",
              boxShadow: "0 0 30px 8px rgba(117, 191, 67, 0.7)",
            }}
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="rounded-3xl object-cover"
              style={{ border: "none" }}
              onError={(e) => {
                // Fallback to default image on error
                (e.target as HTMLImageElement).src = '/Group.jpg';
              }}
            />
            {/* Optional: Add title overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}