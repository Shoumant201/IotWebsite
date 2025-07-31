# IoT Innovation Hub Backend Setup Guide

## 🎉 What's Been Created

Your backend now has complete CRUD APIs for all dynamic content sections:

### ✅ Models (TypeScript + PostgreSQL)
- `heroModel.ts` - Hero banners and CTAs
- `featureModel.ts` - Feature highlights  
- `eventModel.ts` - Events and grand events
- `timelineModel.ts` - Journey timeline
- `teamMemberModel.ts` - Team members (leadership, steering, members)
- `testimonialModel.ts` - Customer testimonials

### ✅ Controllers
- `heroController.ts` - Hero section management
- `featureController.ts` - Features management
- `eventController.ts` - Events management
- `timelineController.ts` - Timeline management
- `teamController.ts` - Team management
- `testimonialController.ts` - Testimonials management

### ✅ Routes
- `/api/heroes` - Hero section endpoints
- `/api/features` - Features endpoints
- `/api/events` - Events endpoints (including grand events)
- `/api/timeline` - Timeline endpoints
- `/api/team` - Team endpoints (leadership, steering, members)
- `/api/testimonials` - Testimonials endpoints

### ✅ Database Scripts
- `createTables.ts` - Creates all database tables
- `completeSeedData.ts` - Seeds sample data
- `setupDatabase.ts` - Complete setup (tables + data)

## 🚀 Quick Start

### 1. Setup Database
```bash
cd backend
npm run setup-db
```

This will:
- Create all necessary database tables
- Populate with sample data
- Set up indexes for performance

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test API Endpoints
Visit: `http://localhost:5000/api/health`

## 📊 Available Endpoints

### Heroes Section
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes` - Create hero
- `PUT /api/heroes/:id` - Update hero
- `DELETE /api/heroes/:id` - Delete hero
- `PATCH /api/heroes/:id/toggle` - Toggle status

### Features Section  
- `GET /api/features` - Get all features
- `POST /api/features` - Create feature
- `PUT /api/features/:id` - Update feature
- `DELETE /api/features/:id` - Delete feature
- `PATCH /api/features/:id/toggle` - Toggle status

### Events Section
- `GET /api/events` - Get all events
- `GET /api/events?isGrandEvent=true` - Get grand events only
- `GET /api/events/grand/current` - Get current grand event
- `GET /api/events/slug/:slug` - Get event by slug
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/toggle` - Toggle status

### Timeline Section
- `GET /api/timeline` - Get all timeline events
- `POST /api/timeline` - Create timeline event
- `PUT /api/timeline/:id` - Update timeline event
- `DELETE /api/timeline/:id` - Delete timeline event
- `PATCH /api/timeline/:id/toggle` - Toggle status

### Team Section
- `GET /api/team` - Get all team members
- `GET /api/team?type=leadership` - Get leadership team
- `GET /api/team?type=steering` - Get steering leaders
- `GET /api/team?type=member` - Get regular members
- `GET /api/team/organized` - Get organized by year/type
- `GET /api/team/leadership` - Get current leadership
- `GET /api/team/steering` - Get current steering
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member
- `PATCH /api/team/:id/toggle` - Toggle status

### Testimonials Section
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `PATCH /api/testimonials/:id/toggle` - Toggle status

## 🔧 Frontend Integration

### Example: Fetch Heroes for Homepage
```javascript
const fetchHeroes = async () => {
  try {
    const response = await fetch('/api/heroes');
    const { success, data } = await response.json();
    
    if (success) {
      setHeroes(data);
    }
  } catch (error) {
    console.error('Error fetching heroes:', error);
  }
};
```

### Example: Fetch Team Members by Type
```javascript
const fetchLeadershipTeam = async () => {
  try {
    const response = await fetch('/api/team/leadership');
    const { success, data } = await response.json();
    
    if (success) {
      setLeadershipTeam(data);
    }
  } catch (error) {
    console.error('Error fetching leadership:', error);
  }
};
```

### Example: Fetch Current Grand Event
```javascript
const fetchGrandEvent = async () => {
  try {
    const response = await fetch('/api/events/grand/current');
    const { success, data } = await response.json();
    
    if (success) {
      setGrandEvent(data);
    }
  } catch (error) {
    console.error('Error fetching grand event:', error);
  }
};
```

## 📝 Sample Data Included

The setup includes sample data for:
- 2 Hero banners
- 4 Feature highlights
- 2 Events (1 grand event, 1 workshop)
- 6 Timeline events (including future events)
- 6 Team members (leadership, steering, members)
- 4 Testimonials

## 🔐 Authentication

Most endpoints will require authentication once you integrate with your auth system. The structure is already in place to add auth middleware to protected routes.

## 📚 Full Documentation

See `API_DOCUMENTATION.md` for complete API reference with request/response examples.

## 🎯 Next Steps

1. **Run the setup**: `npm run setup-db`
2. **Test endpoints**: Use Postman or curl to test the APIs
3. **Integrate with frontend**: Replace static data with API calls
4. **Add authentication**: Protect admin endpoints
5. **Add file upload**: For images (heroes, features, team, testimonials)
6. **Add validation**: Input validation and sanitization

Your backend is now ready to serve dynamic content for all sections of your IoT Innovation Hub website! 🚀