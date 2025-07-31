'use client';

interface EventHighlightsProps {
    highlights: string[];
}

export default function EventHighlights({ highlights }: EventHighlightsProps) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-[#75BF43] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{highlight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}