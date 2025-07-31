import { getPool } from '../config/db.js';

const quickSeed = async () => {
  const pool = getPool();
  
  try {
    console.log('🌱 Quick seeding grand event...');

    // Insert the grand event
    const result = await pool.query(`
      INSERT INTO events (
        title, slug, description, full_description, image, date, time, 
        location, duration, level, prerequisites, highlights, agenda, 
        attendees, speakers, is_grand_event, order_index
      ) VALUES (
        'IoT Innovators Summit 2024',
        'iot-innovators-summit-2024',
        'The Ultimate IoT Conference Experience',
        'Join us for the most anticipated IoT event of the year! A 3-day summit bringing together industry leaders, innovators, and enthusiasts from around the globe.',
        '/grand-event-bg.jpg',
        'December 15-17, 2024',
        'Full 3 Days',
        'Herald College Kathmandu - Main Auditorium',
        '3 Days',
        'All Levels',
        '["Interest in IoT industry", "Networking mindset", "Business cards (optional)"]',
        '["Keynote speeches from global IoT leaders", "Hands-on workshops and masterclasses", "Startup pitch competition with $50,000 prize pool", "Networking sessions with industry professionals", "Latest IoT technology exhibitions", "Career fair with top tech companies"]',
        '[{"time": "Day 1 - 9:00 AM", "activity": "Opening Ceremony & Keynote Speeches"}, {"time": "Day 1 - 2:00 PM", "activity": "Technical Workshops"}, {"time": "Day 2 - 10:00 AM", "activity": "Startup Pitch Competition"}, {"time": "Day 2 - 3:00 PM", "activity": "Technology Exhibition"}, {"time": "Day 3 - 11:00 AM", "activity": "Career Fair & Networking"}, {"time": "Day 3 - 4:00 PM", "activity": "Closing Ceremony"}]',
        '500+ Expected',
        '50+ Industry Experts',
        true,
        1
      ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        is_grand_event = EXCLUDED.is_grand_event
      RETURNING id, title, is_grand_event
    `);
    
    console.log('✅ Grand event inserted:', result.rows[0]);
    
    // Verify the grand event exists
    const checkResult = await pool.query(
      'SELECT id, title, is_grand_event FROM events WHERE is_grand_event = true AND is_active = true'
    );
    
    console.log('✅ Grand events in database:', checkResult.rows);
    
  } catch (error) {
    console.error('❌ Error seeding grand event:', error);
    throw error;
  }
};

export default quickSeed;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  quickSeed()
    .then(() => {
      console.log('✅ Quick seed completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Quick seed failed:', error);
      process.exit(1);
    });
}