# IoT Innovation Hub Backend API Documentation

## Overview
This backend provides a comprehensive CRUD API for managing all dynamic content of the IoT Innovation Hub website, including heroes, features, events, timeline, team members, and testimonials.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 🦸 Heroes Section
Manage hero banners and call-to-action sections.

#### Get All Heroes
```http
GET /api/heroes
```

#### Get Hero by ID
```http
GET /api/heroes/:id
```

#### Create New Hero
```http
POST /api/heroes
Content-Type: application/json

{
  "title": "Welcome to IoT Innovation Hub",
  "subtitle": "Connecting the Future Through Technology",
  "description": "Join our community of innovators...",
  "background_image": "/hero-bg-1.jpg",
  "cta_text": "Get Started",
  "cta_link": "#about",
  "is_active": true,
  "order_index": 1
}
```

#### Update Hero
```http
PUT /api/heroes/:id
Content-Type: application/json

{
  "title": "Updated Hero Title",
  "subtitle": "Updated subtitle"
}
```

#### Delete Hero
```http
DELETE /api/heroes/:id
```

#### Toggle Hero Status
```http
PATCH /api/heroes/:id/toggle
```

---

### ⭐ Features Section
Manage feature highlights and capabilities.

#### Get All Features
```http
GET /api/features
```

#### Get Feature by ID
```http
GET /api/features/:id
```

#### Create New Feature
```http
POST /api/features
Content-Type: application/json

{
  "title": "Smart Connectivity",
  "description": "Connect devices seamlessly with our advanced IoT protocols...",
  "image": "/feature-connectivity.jpg",
  "icon": "connectivity-icon",
  "link": "#features",
  "is_active": true,
  "order_index": 1
}
```

#### Update Feature
```http
PUT /api/features/:id
```

#### Delete Feature
```http
DELETE /api/features/:id
```

#### Toggle Feature Status
```http
PATCH /api/features/:id/toggle
```

---

### 📅 Events Section
Manage events including grand events and regular workshops.

#### Get All Events
```http
GET /api/events
GET /api/events?isGrandEvent=true  # Filter grand events only
GET /api/events?isGrandEvent=false # Filter regular events only
```

#### Get Event by ID
```http
GET /api/events/:id
```

#### Get Event by Slug
```http
GET /api/events/slug/:slug
```

#### Get Current Grand Event
```http
GET /api/events/grand/current
```

#### Create New Event
```http
POST /api/events
Content-Type: application/json

{
  "title": "IoT Innovators Summit 2024",
  "slug": "iot-innovators-summit-2024",
  "description": "The Ultimate IoT Conference Experience",
  "full_description": "Join us for the most anticipated IoT event...",
  "image": "/grand-event-bg.jpg",
  "date": "December 15-17, 2024",
  "time": "Full 3 Days",
  "location": "Herald College Kathmandu - Main Auditorium",
  "duration": "3 Days",
  "level": "All Levels",
  "prerequisites": ["Interest in IoT industry", "Networking mindset"],
  "highlights": ["Keynote speeches", "Hands-on workshops"],
  "agenda": [
    {"time": "Day 1 - 9:00 AM", "activity": "Opening Ceremony"}
  ],
  "attendees": "500+ Expected",
  "speakers": "50+ Industry Experts",
  "is_grand_event": true,
  "is_active": true,
  "order_index": 1
}
```

#### Update Event
```http
PUT /api/events/:id
```

#### Delete Event
```http
DELETE /api/events/:id
```

#### Toggle Event Status
```http
PATCH /api/events/:id/toggle
```

---

### 📈 Timeline Section
Manage journey timeline events.

#### Get All Timeline Events
```http
GET /api/timeline
```

#### Get Timeline Event by ID
```http
GET /api/timeline/:id
```

#### Create New Timeline Event
```http
POST /api/timeline
Content-Type: application/json

{
  "year": "2024",
  "title": "Innovation Summit",
  "description": "Hosting our first major IoT Innovation Summit...",
  "side": "left",
  "is_future": false,
  "is_active": true,
  "order_index": 5
}
```

#### Update Timeline Event
```http
PUT /api/timeline/:id
```

#### Delete Timeline Event
```http
DELETE /api/timeline/:id
```

#### Toggle Timeline Event Status
```http
PATCH /api/timeline/:id/toggle
```

---

### 👥 Team Section
Manage team members including leadership, steering, and regular members.

#### Get All Team Members
```http
GET /api/team
GET /api/team?type=leadership    # Filter by type
GET /api/team?year=2024         # Filter by year
GET /api/team?type=steering&year=2024  # Multiple filters
```

#### Get Team Members Organized
```http
GET /api/team/organized
```
Returns team members organized by year and type.

#### Get Leadership Team
```http
GET /api/team/leadership
```
Returns current year's leadership team.

#### Get Steering Leaders
```http
GET /api/team/steering
```
Returns current year's steering leaders.

#### Get Team Member by ID
```http
GET /api/team/:id
```

#### Create New Team Member
```http
POST /api/team
Content-Type: application/json

{
  "name": "Dr. Rajesh Kumar",
  "role": "Founder & CEO",
  "department": "Executive Leadership",
  "description": "Visionary leader with 15+ years of experience...",
  "image": "/team/founder.jpg",
  "type": "leadership",
  "year": "2024",
  "social_links": {
    "linkedin": "https://linkedin.com/in/rajeshkumar",
    "email": "rajesh@iot-hub.com"
  },
  "is_active": true,
  "order_index": 1
}
```

#### Update Team Member
```http
PUT /api/team/:id
```

#### Delete Team Member
```http
DELETE /api/team/:id
```

#### Toggle Team Member Status
```http
PATCH /api/team/:id/toggle
```

---

### 💬 Testimonials Section
Manage customer testimonials and reviews.

#### Get All Testimonials
```http
GET /api/testimonials
```

#### Get Testimonial by ID
```http
GET /api/testimonials/:id
```

#### Create New Testimonial
```http
POST /api/testimonials
Content-Type: application/json

{
  "name": "John Smith",
  "role": "IoT Engineer",
  "company": "TechCorp Solutions",
  "content": "The IoT Innovation Hub has been instrumental in advancing my career...",
  "image": "/testimonials/john-smith.jpg",
  "rating": 5,
  "is_active": true,
  "order_index": 1
}
```

#### Update Testimonial
```http
PUT /api/testimonials/:id
```

#### Delete Testimonial
```http
DELETE /api/testimonials/:id
```

#### Toggle Testimonial Status
```http
PATCH /api/testimonials/:id/toggle
```

---

## Database Setup

### 1. Create Tables
```bash
npm run create-tables
```

### 2. Seed Sample Data
```bash
npm run seed-data
```

### 3. Complete Setup (Tables + Data)
```bash
npm run setup-db
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Data Types

### Team Member Types
- `leadership` - Executive leadership team
- `steering` - Steering committee members  
- `member` - Regular team members

### Event Levels
- `Beginner`
- `Intermediate` 
- `Advanced`
- `All Levels`

### Timeline Sides
- `left` - Display on left side of timeline
- `right` - Display on right side of timeline

## Common Fields

Most entities include these common fields:
- `id` - Unique identifier
- `is_active` - Boolean flag for active/inactive status
- `order_index` - Integer for custom ordering
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

## Usage Examples

### Frontend Integration
```javascript
// Fetch all active heroes
const response = await fetch('/api/heroes');
const { success, data } = await response.json();

if (success) {
  // Use data to populate hero section
  setHeroes(data);
}
```

### Admin Panel Integration
```javascript
// Create new feature
const newFeature = {
  title: "New Feature",
  description: "Feature description",
  image: "/feature-image.jpg"
};

const response = await fetch('/api/features', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newFeature)
});
```

This API provides complete CRUD functionality for all dynamic content sections of your IoT Innovation Hub website!