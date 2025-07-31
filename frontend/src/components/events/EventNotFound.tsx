'use client';

export default function EventNotFound() {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
                <a
                    href="/"
                    className="inline-flex items-center bg-gradient-to-r from-[#75BF43] to-[#5a9f33] hover:from-[#5a9f33] hover:to-[#4a8a2a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}