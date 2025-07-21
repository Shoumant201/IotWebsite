'use client';

import { useEffect } from 'react';
import TeamCard from './TeamCard';

// Team data organized by year
const teamData = {
    2024: {
        steeringLeaders: [
            {
                name: "Amit Thapa",
                role: "Technical Lead",
                department: "Engineering Department",
                image: "/team/technical-lead.jpg",
                description: "Overseeing technical architecture and IoT system implementations."
            },
            {
                name: "Priya Gurung",
                role: "Research Director",
                department: "Research & Development",
                image: "/team/research-director.jpg",
                description: "Leading cutting-edge research in IoT technologies and innovation."
            },
            {
                name: "Bikash Shrestha",
                role: "Operations Manager",
                department: "Operations Department",
                image: "/team/operations-manager.jpg",
                description: "Managing day-to-day operations and ensuring smooth project execution."
            }
        ],
        members: [
            {
                name: "Rajesh Kumar",
                role: "Senior Developer",
                department: "Development Team",
                image: "/team/member1.jpg",
                description: "Full-stack developer specializing in IoT applications."
            },
            {
                name: "Anita Sharma",
                role: "UI/UX Designer",
                department: "Design Team",
                image: "/team/member2.jpg",
                description: "Creating intuitive interfaces for IoT dashboards."
            },
            {
                name: "Suresh Tamang",
                role: "Data Analyst",
                department: "Analytics Team",
                image: "/team/member3.jpg",
                description: "Analyzing IoT data patterns and insights."
            },
            {
                name: "Maya Rai",
                role: "Quality Assurance",
                department: "QA Team",
                image: "/team/member4.jpg",
                description: "Ensuring quality and reliability of IoT systems."
            },
            {
                name: "Deepak Adhikari",
                role: "DevOps Engineer",
                department: "Infrastructure Team",
                image: "/team/member5.jpg",
                description: "Managing deployment and infrastructure for IoT solutions."
            },
            {
                name: "Sunita Poudel",
                role: "Business Analyst",
                department: "Strategy Team",
                image: "/team/member6.jpg",
                description: "Analyzing business requirements for IoT implementations."
            }
        ]
    },
    2023: {
        steeringLeaders: [
            {
                name: "Sita Maharjan",
                role: "Community Lead",
                department: "Community Relations",
                image: "/team/community-lead.jpg",
                description: "Building and nurturing the IoT community and stakeholder relationships."
            },
            {
                name: "Nabin Karki",
                role: "Innovation Head",
                department: "Innovation Lab",
                image: "/team/innovation-head.jpg",
                description: "Driving innovation initiatives and emerging technology adoption."
            }
        ],
        members: [
            {
                name: "Kiran Basnet",
                role: "Frontend Developer",
                department: "Development Team",
                image: "/team/member7.jpg",
                description: "Specializing in React and modern frontend technologies."
            },
            {
                name: "Ravi Thapa",
                role: "Backend Developer",
                department: "Development Team",
                image: "/team/member8.jpg",
                description: "Building robust APIs and backend systems."
            },
            {
                name: "Laxmi Ghimire",
                role: "Project Manager",
                department: "Management Team",
                image: "/team/member9.jpg",
                description: "Coordinating projects and ensuring timely delivery."
            },
            {
                name: "Binod Shrestha",
                role: "Security Specialist",
                department: "Security Team",
                image: "/team/member10.jpg",
                description: "Implementing security measures for IoT systems."
            }
        ]
    },
    2022: {
        steeringLeaders: [
            {
                name: "Ramesh Pandey",
                role: "Former Technical Lead",
                department: "Engineering Department",
                image: "/team/former-tech-lead.jpg",
                description: "Led the initial technical foundation of our IoT platform."
            }
        ],
        members: [
            {
                name: "Gita Neupane",
                role: "Junior Developer",
                department: "Development Team",
                image: "/team/member11.jpg",
                description: "Started as intern, contributed to core IoT modules."
            },
            {
                name: "Prakash Magar",
                role: "System Administrator",
                department: "IT Team",
                image: "/team/member12.jpg",
                description: "Maintained system infrastructure and server management."
            },
            {
                name: "Kamala Gurung",
                role: "Content Writer",
                department: "Marketing Team",
                image: "/team/member13.jpg",
                description: "Created technical documentation and marketing content."
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



    return (
        <>
            {/* Team Sections by Year */}
            {years.map((year) => {
                const data = teamData[year as unknown as keyof typeof teamData];
                return (
                    <section key={year} id={`year-${year}`} className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Year Header */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{year}</h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-[#75BF43] to-[#5a9f33] mx-auto"></div>
                            </div>

                            {/* Steering Leaders Section */}
                            <div className="mb-16">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                                    Steering Leaders
                                </h3>
                                <div className={`flex flex-wrap justify-center max-w-7xl mx-auto ${data.steeringLeaders.length === 3 ? 'gap-3' : 'gap-6'
                                    }`}>
                                    {data.steeringLeaders.map((leader, index) => (
                                        <div key={index} className={`w-full h-80 ${data.steeringLeaders.length === 3
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

                            {/* Members Section */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                                    Team Members
                                </h3>
                                <div className={`flex flex-wrap justify-center gap-6 ${data.members.length <= 3 ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'
                                    }`}>
                                    {data.members.map((member, index) => (
                                        <div key={index} className="w-full sm:w-72 md:w-80 h-72">
                                            <TeamCard member={member} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
}