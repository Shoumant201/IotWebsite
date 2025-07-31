'use client';

import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import { api, TeamMember } from '@/lib/api';

interface TeamData {
    [year: string]: {
        steeringLeaders: TeamMember[];
        members: TeamMember[];
    };
}

// Fallback team data for when API fails
const fallbackTeamData: TeamData = {
    2025: {
        steeringLeaders: [
            {
                id: 1,
                name: "Dr. Rajesh Kumar",
                role: "Founder & CEO",
                department: "Executive Leadership",
                image: "/team/founder.jpg",
                description: "Visionary leader with 15+ years of experience in IoT and emerging technologies.",
                type: 'leadership',
                year: '2025',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/rajeshkumar",
                    email: "rajesh@iot-hub.com"
                },
                order_index: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ],
        members: [
            {
                id: 2,
                name: "Priya Sharma",
                role: "Technical Lead",
                department: "Engineering",
                image: "/team/tech-lead.jpg",
                description: "Leading our technical team in developing cutting-edge IoT solutions.",
                type: 'member',
                year: '2025',
                is_active: true,
                social_links: {
                    github: "https://github.com/priya-sharma",
                    email: "priya@iot-hub.com"
                },
                order_index: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    },
    2024: {
        steeringLeaders: [
            {
                id: 1,
                name: "Amit Thapa",
                role: "Technical Lead",
                department: "Engineering Department",
                image: "/team/technical-lead.jpg",
                description: "Overseeing technical architecture and IoT system implementations.",
                type: 'steering',
                year: '2024',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/amit-thapa",
                    email: "amit@iotinnovationhub.com"
                },
                order_index: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 2,
                name: "Priya Gurung",
                role: "Research Director",
                department: "Research & Development",
                image: "/team/research-director.jpg",
                description: "Leading cutting-edge research in IoT technologies and innovation.",
                type: 'steering',
                year: '2024',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/priya-gurung",
                    email: "priya@iotinnovationhub.com"
                },
                order_index: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 3,
                name: "Bikash Shrestha",
                role: "Operations Manager",
                department: "Operations Department",
                image: "/team/operations-manager.jpg",
                description: "Managing day-to-day operations and ensuring smooth project execution.",
                type: 'steering',
                year: '2024',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/bikash-shrestha",
                    email: "bikash@iotinnovationhub.com"
                },
                order_index: 3,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ],
        members: [
            {
                id: 4,
                name: "Rajesh Kumar",
                role: "Senior Developer",
                department: "Development Team",
                image: "/team/member1.jpg",
                description: "Full-stack developer specializing in IoT applications.",
                type: 'member',
                year: '2024',
                is_active: true,
                social_links: {
                    github: "https://github.com/rajesh-kumar",
                    email: "rajesh@iotinnovationhub.com"
                },
                order_index: 4,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 5,
                name: "Anita Sharma",
                role: "UI/UX Designer",
                department: "Design Team",
                image: "/team/member2.jpg",
                description: "Creating intuitive interfaces for IoT dashboards.",
                type: 'member',
                year: '2024',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/anita-sharma",
                    email: "anita@iotinnovationhub.com"
                },
                order_index: 5,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: 6,
                name: "Suresh Tamang",
                role: "Data Analyst",
                department: "Analytics Team",
                image: "/team/member3.jpg",
                description: "Analyzing IoT data patterns and insights.",
                type: 'member',
                year: '2024',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/suresh-tamang",
                    email: "suresh@iotinnovationhub.com"
                },
                order_index: 6,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    },
    2023: {
        steeringLeaders: [
            {
                id: 7,
                name: "Sita Maharjan",
                role: "Community Lead",
                department: "Community Relations",
                image: "/team/community-lead.jpg",
                description: "Building and nurturing the IoT community and stakeholder relationships.",
                type: 'steering',
                year: '2023',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/sita-maharjan",
                    email: "sita@iotinnovationhub.com"
                },
                order_index: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ],
        members: [
            {
                id: 8,
                name: "Kiran Basnet",
                role: "Frontend Developer",
                department: "Development Team",
                image: "/team/member7.jpg",
                description: "Specializing in React and modern frontend technologies.",
                type: 'member',
                year: '2023',
                is_active: true,
                social_links: {
                    github: "https://github.com/kiran-basnet",
                    email: "kiran@iotinnovationhub.com"
                },
                order_index: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    },
    2022: {
        steeringLeaders: [
            {
                id: 9,
                name: "Ramesh Pandey",
                role: "Former Technical Lead",
                department: "Engineering Department",
                image: "/team/former-tech-lead.jpg",
                description: "Led the initial technical foundation of our IoT platform.",
                type: 'steering',
                year: '2022',
                is_active: true,
                social_links: {
                    linkedin: "https://linkedin.com/in/ramesh-pandey",
                    email: "ramesh@iotinnovationhub.com"
                },
                order_index: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ],
        members: [
            {
                id: 10,
                name: "Gita Neupane",
                role: "Junior Developer",
                department: "Development Team",
                image: "/team/member11.jpg",
                description: "Started as intern, contributed to core IoT modules.",
                type: 'member',
                year: '2022',
                is_active: true,
                social_links: {
                    github: "https://github.com/gita-neupane",
                    email: "gita@iotinnovationhub.com"
                },
                order_index: 2,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }
};

interface TeamContentProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    years: string[];
}

export default function TeamContent({ activeSection, setActiveSection, years }: TeamContentProps) {
    const [teamData, setTeamData] = useState<TeamData>(fallbackTeamData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setLoading(true);
                const teamMembers = await api.team.getAll();

                // Organize team members by year and type
                const organizedData: TeamData = {};

                console.log('Raw team members from API:', teamMembers);

                teamMembers.forEach((member: TeamMember) => {
                    const year = member.year; // year is already a string from API

                    if (!organizedData[year]) {
                        organizedData[year] = {
                            steeringLeaders: [],
                            members: []
                        };
                    }

                    if (member.type === 'steering' || member.type === 'leadership') {
                        organizedData[year].steeringLeaders.push(member);
                    } else {
                        organizedData[year].members.push(member);
                    }
                });

                console.log('Organized team data:', organizedData);

                // If no data from API, use fallback
                if (Object.keys(organizedData).length === 0) {
                    console.log('No API data, using fallback');
                    setTeamData(fallbackTeamData);
                } else {
                    console.log('Using API data');
                    setTeamData(organizedData);
                }
            } catch (err) {
                console.error('Error fetching team data:', err);
                setError('Failed to load team data');
                setTeamData(fallbackTeamData);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const year of years) {
                const element = document.getElementById(`year-${year}`);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(year);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [years, setActiveSection]);

    if (loading) {
        return (
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#75BF43] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading team members...</p>
                </div>
            </div>
        );
    }



    return (
        <>
            {/* Team Sections by Year */}
            {years.map((year) => {
                const data = teamData[year];

                // Skip year if no data available
                if (!data || (!data.steeringLeaders.length && !data.members.length)) {
                    return null;
                }

                return (
                    <section key={year} id={`year-${year}`} className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Year Header */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{year}</h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#75BF43] to-[#5a9f33] mx-auto"></div>
                            </div>

                            {/* Steering Leaders Section */}
                            {data.steeringLeaders.length > 0 && (
                                <div className="mb-16">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                                        Steering Leaders
                                    </h3>
                                    <div className={`flex flex-wrap justify-center max-w-7xl mx-auto ${data.steeringLeaders.length === 3 ? 'gap-3' : 'gap-6'
                                        }`}>
                                        {data.steeringLeaders.map((leader, index) => (
                                            <div key={leader.id || index} className={`w-full h-80 ${data.steeringLeaders.length === 3
                                                ? 'sm:w-60 md:w-64 lg:w-72 xl:w-80 max-w-xs'
                                                : data.steeringLeaders.length === 2
                                                    ? 'sm:w-80 md:w-96 lg:w-80 xl:w-96 max-w-sm'
                                                    : 'sm:w-80 md:w-96 lg:w-96 xl:w-96 max-w-md'
                                                }`}>
                                                <TeamCard member={leader} isLeader={true} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Members Section */}
                            {data.members.length > 0 && (
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                                        Team Members
                                    </h3>
                                    <div className={`flex flex-wrap justify-center gap-6 ${data.members.length <= 3 ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'
                                        }`}>
                                        {data.members.map((member, index) => (
                                            <div key={member.id || index} className="w-full sm:w-72 md:w-80 h-72">
                                                <TeamCard member={member} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </>
    );
}