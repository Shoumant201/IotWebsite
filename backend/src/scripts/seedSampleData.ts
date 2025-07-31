import { getPool } from '../config/db.js';

const seedSampleData = async () => {
  const pool = getPool();
  
  try {
    console.log('🌱 Seeding database with sample data...');

    // Seed heroes
    await pool.query(`
      INSERT INTO heroes (title, subtitle, description, background_image, cta_text, cta_link, order_index) VALUES
      ('Welcome to IoT Innovation Hub', 'Connecting the Future Through Technology', 'Join our community of innovators, developers, and tech enthusiasts as we explore the endless possibilities of Internet of Things technology.', '/hero-bg-1.jpg', 'Get Started', '#about', 1),
      ('Build Tomorrow Today', 'Empowering IoT Solutions', 'Transform your ideas into reality with cutting-edge IoT technologies and expert guidance from our community.', '/hero-bg-2.jpg', 'Join Now', '#contact', 2)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Heroes seeded');

    // Seed features
    await pool.query(`
      INSERT INTO features (title, description, image, icon, link, order_index) VALUES
      ('Smart Connectivity', 'Connect devices seamlessly with our advanced IoT protocols and frameworks.', '/feature-connectivity.jpg', 'connectivity-icon', '#features', 1),
      ('Real-time Analytics', 'Monitor and analyze your IoT data in real-time with powerful dashboard tools.', '/feature-analytics.jpg', 'analytics-icon', '#features', 2),
      ('Secure Infrastructure', 'Enterprise-grade security for all your IoT deployments and data transmission.', '/feature-security.jpg', 'security-icon', '#features', 3),
      ('Scalable Solutions', 'Build solutions that grow with your needs, from prototype to enterprise scale.', '/feature-scalable.jpg', 'scalable-icon', '#features', 4)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Features seeded');

    // Seed events
    await pool.query(`
      INSERT INTO events (title, slug, description, full_description, image, date, time, location, duration, level, prerequisites, highlights, agenda, attendees, speakers, is_grand_event, order_index) VALUES
      ('IoT Innovators Summit 2024', 'iot-innovators-summit-2024', 'The Ultimate IoT Conference Experience', 'Join us for the most anticipated IoT event of the year! A 3-day summit bringing together industry leaders, innovators, and enthusiasts from around the globe.', '/grand-event-bg.jpg', 'December 15-17, 2024', 'Full 3 Days', 'Herald College Kathmandu - Main Auditorium', '3 Days', 'All Levels', '["Interest in IoT industry", "Networking mindset", "Business cards (optional)"]', '["Keynote speeches from global IoT leaders", "Hands-on workshops and masterclasses", "Startup pitch competition with $50,000 prize pool", "Networking sessions with industry professionals", "Latest IoT technology exhibitions", "Career fair with top tech companies"]', '[{"time": "Day 1 - 9:00 AM", "activity": "Opening Ceremony & Keynote Speeches"}, {"time": "Day 1 - 2:00 PM", "activity": "Technical Workshops"}, {"time": "Day 2 - 10:00 AM", "activity": "Startup Pitch Competition"}, {"time": "Day 2 - 3:00 PM", "activity": "Technology Exhibition"}, {"time": "Day 3 - 11:00 AM", "activity": "Career Fair & Networking"}, {"time": "Day 3 - 4:00 PM", "activity": "Closing Ceremony"}]', '500+ Expected', '50+ Industry Experts', true, 1),
      ('Face in Focus Workshop', 'face-in-focus', 'Hands-on Computer Vision & IoT Workshop', 'Face in Focus is an innovative workshop that combines computer vision and IoT technologies. Participants learn to build facial recognition systems using modern AI frameworks and integrate them with IoT devices for real-world applications.', '/FaceinFocus.png', 'March 15, 2024', '10:00 AM - 4:00 PM', 'Herald College Kathmandu - IoT Lab', '6 hours', 'Intermediate', '["Basic Python knowledge", "Understanding of computer vision concepts", "Familiarity with IoT basics"]', '["Build a complete facial recognition system", "Integration with IoT sensors and devices", "Real-time processing and analytics", "Hands-on coding sessions", "Industry expert mentorship"]', '[{"time": "10:00 AM", "activity": "Welcome & Introduction to Computer Vision"}, {"time": "11:00 AM", "activity": "Setting up Development Environment"}, {"time": "12:00 PM", "activity": "Building Facial Recognition Models"}, {"time": "1:00 PM", "activity": "Lunch Break"}, {"time": "2:00 PM", "activity": "IoT Integration Workshop"}, {"time": "3:00 PM", "activity": "Real-world Implementation"}, {"time": "4:00 PM", "activity": "Project Showcase & Wrap-up"}]', '50 Participants', '5 Expert Mentors', false, 2)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Events seeded');

    // Seed timeline events
    await pool.query(`
      INSERT INTO timeline_events (year, title, description, side, is_future, order_index) VALUES
      ('2020', 'Foundation', 'IoT Innovation Hub was established with a vision to connect technology enthusiasts and drive IoT adoption in Nepal.', 'left', false, 1),
      ('2021', 'First Workshop', 'Conducted our first IoT workshop with 50+ participants, marking the beginning of our educational journey.', 'right', false, 2),
      ('2022', 'Community Growth', 'Expanded our community to 500+ members and launched online learning platforms.', 'left', false, 3),
      ('2023', 'Industry Partnerships', 'Formed strategic partnerships with leading tech companies and launched internship programs.', 'right', false, 4),
      ('2024', 'Innovation Summit', 'Hosting our first major IoT Innovation Summit with international speakers and participants.', 'left', false, 5),
      ('2025', 'Global Expansion', 'Planning to expand our reach internationally and establish IoT hubs in other countries.', 'right', true, 6)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Timeline events seeded');

    // Seed team members
    await pool.query(`
      INSERT INTO team_members (name, role, department, description, image, type, year, social_links, order_index) VALUES
      ('Dr. Rajesh Kumar', 'Founder & CEO', 'Executive Leadership', 'Visionary leader with 15+ years of experience in IoT and emerging technologies.', '/team/founder.jpg', 'leadership', '2024', '{"linkedin": "https://linkedin.com/in/rajeshkumar", "email": "rajesh@iot-hub.com"}', 1),
      ('Priya Sharma', 'CTO', 'Technology Department', 'Technical expert leading our innovation initiatives and technology strategy.', '/team/cto.jpg', 'leadership', '2024', '{"linkedin": "https://linkedin.com/in/priyasharma", "github": "https://github.com/priyasharma"}', 2),
      ('Amit Thapa', 'Technical Lead', 'Engineering Department', 'Overseeing technical architecture and IoT system implementations.', '/team/technical-lead.jpg', 'steering', '2024', '{"linkedin": "https://linkedin.com/in/amitthapa"}', 1),
      ('Sita Maharjan', 'Community Lead', 'Community Relations', 'Building and nurturing the IoT community and stakeholder relationships.', '/team/community-lead.jpg', 'steering', '2024', '{"linkedin": "https://linkedin.com/in/sitamaharjan"}', 2),
      ('Kiran Basnet', 'Senior Developer', 'Development Team', 'Full-stack developer specializing in IoT applications and web technologies.', '/team/developer1.jpg', 'member', '2024', '{"github": "https://github.com/kiranbasnet"}', 1),
      ('Maya Rai', 'UI/UX Designer', 'Design Team', 'Creating intuitive interfaces for IoT dashboards and user experiences.', '/team/designer1.jpg', 'member', '2024', '{"linkedin": "https://linkedin.com/in/mayarai"}', 2)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Team members seeded');

    // Seed testimonials
    await pool.query(`
      INSERT INTO testimonials (name, role, company, content, image, rating, order_index) VALUES
      ('John Smith', 'IoT Engineer', 'TechCorp Solutions', 'The IoT Innovation Hub has been instrumental in advancing my career. The workshops and community support are exceptional.', '/testimonials/john-smith.jpg', 5, 1),
      ('Sarah Johnson', 'Product Manager', 'Smart Devices Inc', 'Amazing community with cutting-edge resources. The networking opportunities have been invaluable for my professional growth.', '/testimonials/sarah-johnson.jpg', 5, 2),
      ('Michael Chen', 'Startup Founder', 'IoT Innovations Ltd', 'The mentorship and technical guidance I received here helped me launch my IoT startup successfully.', '/testimonials/michael-chen.jpg', 5, 3),
      ('Lisa Wang', 'Research Scientist', 'Future Tech Labs', 'Excellent platform for learning and collaboration. The events and workshops are always top-notch.', '/testimonials/lisa-wang.jpg', 5, 4)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Testimonials seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nSample data added to:');
    console.log('- heroes (2 entries)');
    console.log('- features (4 entries)');
    console.log('- events (2 entries - 1 grand event, 1 workshop)');
    console.log('- timeline_events (6 entries)');
    console.log('- team_members (6 entries - 2 leadership, 2 steering, 2 members)');
    console.log('- testimonials (4 entries)');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSampleData()
    .then(() => {
      console.log('\n✅ Database seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database seeding failed:', error);
      process.exit(1);
    });
}

export default seedSampleData;