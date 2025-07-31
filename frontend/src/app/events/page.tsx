'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    full_description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    level: string;
    prerequisites: string[];
    highlights: string[];
    agenda: Array<{ time: string; activity: string }>;
    attendees: string | undefined;
    speakers: string | undefined;
    is_grand_event: boolean;
    is_active: boolean;
}

// Fallback static events data for when API fails or event not found
const fallbackEventsData = {
    "face-in-focus": {
        title: "Face in Focus",
        image: "/FaceinFocus.png",
        description: "Hands-on learning experience",
        fullDescription: "Face in Focus is an innovative workshop that combines computer vision and IoT technologies. Participants learn to build facial recognition systems using modern AI frameworks and integrate them with IoT devices for real-world applications.",
        date: "March 15, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Herald College Kathmandu - IoT Lab",
        duration: "6 hours",
        level: "Intermediate",
        prerequisites: ["Basic Python knowledge", "Understanding of computer vision concepts", "Familiarity with IoT basics"],
        highlights: [
            "Build a complete facial recognition system",
            "Integration with IoT sensors and devices",
            "Real-time processing and analytics",
            "Hands-on coding sessions",
            "Industry expert mentorship"
        ],
        agenda: [
            { time: "10:00 AM", activity: "Welcome & Introduction to Computer Vision" },
            { time: "11:00 AM", activity: "Setting up Development Environment" },
            { time: "12:00 PM", activity: "Building Facial Recognition Models" },
            { time: "1:00 PM", activity: "Lunch Break" },
            { time: "2:00 PM", activity: "IoT Integration Workshop" },
            { time: "3:00 PM", activity: "Real-world Implementation" },
            { time: "4:00 PM", activity: "Project Showcase & Wrap-up" }
        ]
    },
    "iot-tech-hunt": {
        title: "IoT Tech Hunt",
        image: "/IOT_Tech_Hunt.png",
        description: "Exploring the future of IoT",
        fullDescription: "IoT Tech Hunt is an exciting treasure hunt-style competition where teams solve IoT-related challenges and puzzles. Participants explore cutting-edge IoT technologies while competing in a fun, educational environment.",
        date: "April 20, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Herald College Campus",
        duration: "9 hours",
        level: "All Levels",
        prerequisites: ["Basic understanding of IoT concepts", "Team collaboration skills", "Problem-solving mindset"],
        highlights: [
            "Interactive IoT challenges",
            "Team-based competition",
            "Prizes for winning teams",
            "Networking opportunities",
            "Industry insights"
        ],
        agenda: [
            { time: "9:00 AM", activity: "Registration & Team Formation" },
            { time: "10:00 AM", activity: "Challenge Briefing" },
            { time: "10:30 AM", activity: "Hunt Begins - Round 1" },
            { time: "12:30 PM", activity: "Lunch & Networking" },
            { time: "1:30 PM", activity: "Hunt Continues - Round 2" },
            { time: "4:00 PM", activity: "Final Challenge" },
            { time: "5:00 PM", activity: "Results & Prize Distribution" }
        ]
    },
    "iot-open-doors": {
        title: "IoT Open Doors",
        image: "/IOTOPENDOORS.png",
        description: "48-hour innovation challenge",
        fullDescription: "IoT Open Doors is an intensive 48-hour hackathon where participants develop innovative IoT solutions to real-world problems. Teams work around the clock to create prototypes that could shape the future of connected devices.",
        date: "May 10-12, 2024",
        time: "Friday 6:00 PM - Sunday 6:00 PM",
        location: "Herald College Innovation Hub",
        duration: "48 hours",
        level: "Advanced",
        prerequisites: ["Strong programming skills", "IoT development experience", "Hardware prototyping knowledge"],
        highlights: [
            "48-hour intensive hackathon",
            "Mentorship from industry experts",
            "Access to IoT hardware kits",
            "Substantial cash prizes",
            "Startup incubation opportunities"
        ],
        agenda: [
            { time: "Friday 6:00 PM", activity: "Opening Ceremony & Problem Statements" },
            { time: "Friday 8:00 PM", activity: "Team Formation & Ideation" },
            { time: "Saturday 9:00 AM", activity: "Development Phase Begins" },
            { time: "Saturday 7:00 PM", activity: "Mentor Check-ins" },
            { time: "Sunday 2:00 PM", activity: "Final Presentations" },
            { time: "Sunday 5:00 PM", activity: "Judging & Awards Ceremony" }
        ]
    },
    "talent-acquisition-techathon": {
        title: "Talent Acquisition Techathon",
        image: "/Talent_Acquisition_Techathon.png",
        description: "Connect with IoT professionals",
        fullDescription: "A unique event combining technical challenges with recruitment opportunities. Companies showcase their IoT projects while participants demonstrate their skills through practical challenges and networking sessions.",
        date: "June 5, 2024",
        time: "10:00 AM - 5:00 PM",
        location: "Herald College Auditorium",
        duration: "7 hours",
        level: "All Levels",
        prerequisites: ["Resume preparation", "Portfolio of projects", "Professional attire"],
        highlights: [
            "Direct interaction with hiring managers",
            "Technical skill assessments",
            "Portfolio review sessions",
            "Job placement opportunities",
            "Career guidance workshops"
        ],
        agenda: [
            { time: "10:00 AM", activity: "Registration & Welcome" },
            { time: "10:30 AM", activity: "Company Presentations" },
            { time: "12:00 PM", activity: "Technical Challenges" },
            { time: "1:00 PM", activity: "Networking Lunch" },
            { time: "2:00 PM", activity: "One-on-One Interviews" },
            { time: "4:00 PM", activity: "Career Guidance Session" },
            { time: "5:00 PM", activity: "Closing & Follow-up" }
        ]
    },
    "tech-connect": {
        title: "Tech Connect",
        image: "/Talent_Acquisition_Techathon.png",
        description: "Connect with IoT professionals",
        fullDescription: "Tech Connect is a networking-focused event that brings together IoT professionals, students, and industry leaders. The event features panel discussions, workshops, and structured networking sessions.",
        date: "July 15, 2024",
        time: "2:00 PM - 8:00 PM",
        location: "Herald College Conference Hall",
        duration: "6 hours",
        level: "All Levels",
        prerequisites: ["Interest in IoT industry", "Networking mindset", "Business cards (optional)"],
        highlights: [
            "Industry expert panels",
            "Structured networking sessions",
            "Mentorship matching",
            "Career development workshops",
            "Technology showcases"
        ],
        agenda: [
            { time: "2:00 PM", activity: "Welcome & Icebreaker" },
            { time: "2:30 PM", activity: "Industry Panel Discussion" },
            { time: "4:00 PM", activity: "Technology Showcase" },
            { time: "5:00 PM", activity: "Networking Session" },
            { time: "6:30 PM", activity: "Mentorship Matching" },
            { time: "7:30 PM", activity: "Closing Remarks" }
        ]
    },
    "3d-buzz": {
        title: "3D Buzz",
        image: "/3D Buzz.png",
        description: "Demonstrating IoT innovations",
        fullDescription: "3D Buzz explores the intersection of 3D printing technology and IoT. Participants learn to design, print, and integrate IoT sensors into custom 3D-printed enclosures and prototypes.",
        date: "August 22, 2024",
        time: "11:00 AM - 5:00 PM",
        location: "Herald College Maker Space",
        duration: "6 hours",
        level: "Beginner to Intermediate",
        prerequisites: ["Basic design software knowledge", "Interest in 3D printing", "Creative mindset"],
        highlights: [
            "3D design and printing workshop",
            "IoT sensor integration",
            "Custom enclosure creation",
            "Rapid prototyping techniques",
            "Take-home projects"
        ],
        agenda: [
            { time: "11:00 AM", activity: "Introduction to 3D Design" },
            { time: "12:00 PM", activity: "3D Printing Basics" },
            { time: "1:00 PM", activity: "Lunch Break" },
            { time: "2:00 PM", activity: "IoT Integration Workshop" },
            { time: "3:30 PM", activity: "Project Assembly" },
            { time: "4:30 PM", activity: "Testing & Troubleshooting" }
        ]
    },
    "short-circuit": {
        title: "Short Circuit",
        image: "/Shot Circuit.png",
        description: "Learn to build IoT solutions",
        fullDescription: "Short Circuit is an intensive electronics and IoT workshop focusing on circuit design, troubleshooting, and building robust IoT solutions. Perfect for those wanting to master the hardware side of IoT.",
        date: "September 18, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Herald College Electronics Lab",
        duration: "9 hours",
        level: "Intermediate to Advanced",
        prerequisites: ["Basic electronics knowledge", "Soldering experience", "Multimeter usage"],
        highlights: [
            "Advanced circuit design",
            "PCB design and fabrication",
            "IoT hardware troubleshooting",
            "Professional development tools",
            "Industry-standard practices"
        ],
        agenda: [
            { time: "9:00 AM", activity: "Circuit Design Fundamentals" },
            { time: "10:30 AM", activity: "PCB Design Workshop" },
            { time: "12:00 PM", activity: "Lunch Break" },
            { time: "1:00 PM", activity: "Hands-on Circuit Building" },
            { time: "3:00 PM", activity: "Troubleshooting Session" },
            { time: "4:30 PM", activity: "IoT Integration" },
            { time: "5:30 PM", activity: "Project Testing & Demo" }
        ]
    },
    "echo-bot": {
        title: "Echo Bot",
        image: "/Echo Bot.png",
        description: "Learn to build IoT solutions",
        fullDescription: "Echo Bot workshop teaches participants to build voice-controlled IoT devices. Learn about speech recognition, natural language processing, and voice-activated automation systems.",
        date: "October 25, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Herald College AI Lab",
        duration: "6 hours",
        level: "Intermediate",
        prerequisites: ["Python programming", "Basic AI/ML concepts", "IoT fundamentals"],
        highlights: [
            "Voice recognition systems",
            "Natural language processing",
            "IoT device automation",
            "Cloud integration",
            "Smart home applications"
        ],
        agenda: [
            { time: "10:00 AM", activity: "Voice Recognition Basics" },
            { time: "11:30 AM", activity: "NLP Implementation" },
            { time: "1:00 PM", activity: "Lunch Break" },
            { time: "2:00 PM", activity: "IoT Device Integration" },
            { time: "3:00 PM", activity: "Cloud Services Setup" },
            { time: "4:00 PM", activity: "Demo & Q&A Session" }
        ]
    },
    "tech-race": {
        title: "Tech Race",
        image: "/TechRace.png",
        description: "Learn to build IoT solutions",
        fullDescription: "Echo Bot workshop teaches participants to build voice-controlled IoT devices. Learn about speech recognition, natural language processing, and voice-activated automation systems.",
        date: "October 25, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Herald College AI Lab",
        duration: "6 hours",
        level: "Intermediate",
        prerequisites: ["Python programming", "Basic AI/ML concepts", "IoT fundamentals"],
        highlights: [
            "Voice recognition systems",
            "Natural language processing",
            "IoT device automation",
            "Cloud integration",
            "Smart home applications"
        ],
        agenda: [
            { time: "10:00 AM", activity: "Voice Recognition Basics" },
            { time: "11:30 AM", activity: "NLP Implementation" },
            { time: "1:00 PM", activity: "Lunch Break" },
            { time: "2:00 PM", activity: "IoT Device Integration" },
            { time: "3:00 PM", activity: "Cloud Services Setup" },
            { time: "4:00 PM", activity: "Demo & Q&A Session" }
        ]
    }
};

function EventDetailsContent() {
    const searchParams = useSearchParams();
    const eventSlug = searchParams.get('event');
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventSlug) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Try to fetch event by slug from API
                const events = await api.events.getAll();
                const foundEvent = events.find((e: Event) => e.slug === eventSlug);

                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    // Fallback to static data if not found in API
                    const fallbackEvent = fallbackEventsData[eventSlug as keyof typeof fallbackEventsData];
                    if (fallbackEvent) {
                        // Convert fallback data to Event format
                        setEvent({
                            id: 0,
                            title: fallbackEvent.title,
                            slug: eventSlug,
                            description: fallbackEvent.description,
                            full_description: fallbackEvent.fullDescription,
                            image: fallbackEvent.image,
                            date: fallbackEvent.date,
                            time: fallbackEvent.time,
                            location: fallbackEvent.location,
                            duration: fallbackEvent.duration,
                            level: fallbackEvent.level,
                            prerequisites: fallbackEvent.prerequisites,
                            highlights: fallbackEvent.highlights,
                            agenda: fallbackEvent.agenda,
                            attendees: '50+ Participants',
                            speakers: '5+ Expert Mentors',
                            is_grand_event: false,
                            is_active: true
                        });
                    } else {
                        setEvent(null);
                    }
                }
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Failed to load event details');
                // Try fallback data on API error
                const fallbackEvent = fallbackEventsData[eventSlug as keyof typeof fallbackEventsData];
                if (fallbackEvent) {
                    setEvent({
                        id: 0,
                        title: fallbackEvent.title,
                        slug: eventSlug,
                        description: fallbackEvent.description,
                        full_description: fallbackEvent.fullDescription,
                        image: fallbackEvent.image,
                        date: fallbackEvent.date,
                        time: fallbackEvent.time,
                        location: fallbackEvent.location,
                        duration: fallbackEvent.duration,
                        level: fallbackEvent.level,
                        prerequisites: fallbackEvent.prerequisites,
                        highlights: fallbackEvent.highlights,
                        agenda: fallbackEvent.agenda,
                        attendees: '50+ Participants',
                        speakers: '5+ Expert Mentors',
                        is_grand_event: false,
                        is_active: true
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventSlug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (!event) {
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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#75BF43] to-[#5a9f33] text-white pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">{event.title}</h1>
                            <p className="text-xl md:text-2xl opacity-90 mb-8">{event.full_description}</p>

                            {/* Event Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-semibold">Date</span>
                                    </div>
                                    <p className="text-sm opacity-90">{event.date}</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-semibold">Time</span>
                                    </div>
                                    <p className="text-sm opacity-90">{event.time}</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span className="font-semibold">Location</span>
                                    </div>
                                    <p className="text-sm opacity-90">{event.location}</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="font-semibold">Level</span>
                                    </div>
                                    <p className="text-sm opacity-90">{event.level}</p>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button className="bg-white text-[#75BF43] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 min-h-[44px]">
                                Register Now
                            </button>
                        </div>

                        {/* Event Image */}
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Details Sections */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* Highlights */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Highlights</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {event.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-[#75BF43] rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-gray-700">{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agenda */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Agenda</h2>
                                <div className="space-y-4">
                                    {event.agenda.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                                            <div className="bg-[#75BF43] text-white px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                                                {item.time}
                                            </div>
                                            <p className="text-gray-700 font-medium">{item.activity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">

                            {/* Prerequisites */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                                <ul className="space-y-2">
                                    {event.prerequisites.map((prereq, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <svg className="w-5 h-5 text-[#75BF43] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700 text-sm">{prereq}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-[#75BF43]/5 border border-[#75BF43]/20 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-semibold text-gray-900">{event.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Level:</span>
                                        <span className="font-semibold text-gray-900">{event.level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Format:</span>
                                        <span className="font-semibold text-gray-900">In-Person</span>
                                    </div>
                                </div>
                            </div>

                            {/* Register CTA */}
                            <div className="bg-gradient-to-br from-[#75BF43] to-[#5a9f33] rounded-2xl p-6 text-white text-center">
                                <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
                                <p className="text-sm opacity-90 mb-4">Secure your spot in this exciting event!</p>
                                <button className="w-full bg-white text-[#75BF43] py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 min-h-[44px]">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function EventsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        }>
            <EventDetailsContent />
        </Suspense>
    );
}