# 🚀 IoT Innovation Hub - Complete Content Management System

A modern, full-stack web application for managing IoT Innovation Hub content with dynamic content management, image uploads, and professional admin interface.

## 🎯 **System Overview**

This project consists of three main components:
- **Frontend** (Port 3000) - Public-facing website with dynamic content
- **Backend** (Port 5000) - REST API with PostgreSQL database
- **Admin Panel** (Port 3001) - Content management interface

## ✨ **Key Features**

### 🎨 **Frontend Website**
- ✅ **Dynamic Content** - All sections load from API
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Modern UI** - Clean, professional design with green theme
- ✅ **Real-time Updates** - Content changes reflect immediately
- ✅ **SEO Optimized** - Proper meta tags and structure
- ✅ **Component-based** - Modular, reusable components

### 🔧 **Backend API**
- ✅ **Complete CRUD APIs** - Heroes, Features, Events, Team, Testimonials, Timeline
- ✅ **Image Upload System** - Cloudinary integration with drag & drop
- ✅ **PostgreSQL Database** - Robust data storage with automated setup
- ✅ **CORS Configuration** - Proper cross-origin support
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Health Monitoring** - System status endpoints

### 🎛️ **Admin Panel**
- ✅ **Complete Content Management** - 6 different content types
- ✅ **Image Upload Interface** - Drag & drop with progress bars
- ✅ **User Authentication** - Secure admin access with JWT
- ✅ **Real-time Editing** - WYSIWYG-style editing experience
- ✅ **Status Management** - Toggle active/inactive content
- ✅ **Professional Dashboard** - Intuitive, modern interface

## 🚀 **Quick Start Guide**

### **Prerequisites**
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### **1. Clone and Install**
```bash
git clone <repository-url>
cd iot-innovation-hub

# Install dependencies for all components
npm install
cd frontend && npm install
cd ../backend && npm install  
cd ../admin && npm install
```

### **2. Database Setup**
```bash
# Create PostgreSQL database
createdb iot_innovation_hub

# Setup database tables and sample data
cd backend
npm run setup-db
```

### **3. Environment Configuration**

**Backend (.env)**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iot_innovation_hub
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:3001

# Super Admin Configuration
SUPER_ADMIN_EMAIL=admin@iot-hub.com
SUPER_ADMIN_PASSWORD=AdminPassword123!
SUPER_ADMIN_NAME=Super Administrator
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Admin Panel (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### **4. Start All Services**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Website runs on http://localhost:3000
```

**Terminal 3 - Admin Panel:**
```bash
cd admin
npm run dev
# Admin panel runs on http://localhost:3001
```

### **5. Create Admin Account**
```bash
cd backend
npm run create-super-admin
# Follow prompts to create your admin user
```

### **6. Access Your System**
- **Main Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **API Health Check**: http://localhost:5000/api/health

## 📊 **Content Management**

### **Available Content Types**
1. **Heroes** - Main banner sections with CTAs
2. **Features** - Feature highlights with images
3. **Events** - Workshops and conferences (including grand events)
4. **Team** - Team members (Leadership, Steering, Members)
5. **Testimonials** - Customer reviews with ratings
6. **Timeline** - Company milestones and future plans

### **Content Management Workflow**
1. **Login** to admin panel (http://localhost:3001)
2. **Select content type** from navigation tabs
3. **Add/Edit/Delete** content using intuitive forms
4. **Upload images** using drag & drop interface
5. **Toggle active/inactive** status as needed
6. **View changes** immediately on frontend

## 🖼️ **Image Upload System**

### **Cloudinary Setup (Required for Image Uploads)**
1. **Create Account**: Sign up at [Cloudinary.com](https://cloudinary.com) (free tier available)
2. **Get Credentials**: Copy Cloud Name, API Key, and API Secret from dashboard
3. **Update Backend .env**: Add your Cloudinary credentials
4. **Restart Backend**: `npm run dev` in backend directory
5. **Test Upload**: Try uploading an image in admin panel

### **Image Upload Features**
- ✅ **Drag & Drop Interface** - Modern file upload experience
- ✅ **Real-time Progress** - Visual upload progress bars
- ✅ **Image Preview** - Instant preview before and after upload
- ✅ **File Validation** - Type and size validation (5MB limit)
- ✅ **CDN Delivery** - Fast, global image delivery via Cloudinary
- ✅ **Automatic Organization** - Images organized by content type

## 🔗 **API Documentation**

### **Core Endpoints**
```
# Content Management
GET/POST/PUT/DELETE /api/heroes
GET/POST/PUT/DELETE /api/features
GET/POST/PUT/DELETE /api/events
GET/POST/PUT/DELETE /api/team
GET/POST/PUT/DELETE /api/testimonials
GET/POST/PUT/DELETE /api/timeline

# Special Endpoints
GET /api/events/grand/current     # Current grand event
GET /api/team/leadership          # Leadership team
GET /api/team/steering           # Steering committee
GET /api/events/slug/:slug       # Event by slug

# Toggle Status
PATCH /api/{content-type}/:id/toggle

# Image Upload
POST /api/upload/{content-type}   # Upload images by type

# System
GET /api/health                   # Health check
```

### **Response Format**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

## 🏗️ **Project Structure**

```
iot-innovation-hub/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   │   ├── home/        # Homepage sections
│   │   │   ├── events/      # Event page components
│   │   │   └── team/        # Team page components
│   │   └── lib/             # API utilities
│   └── public/              # Static assets
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── config/          # Database & Cloudinary config
│   │   └── scripts/         # Database setup scripts
│   └── dist/                # Compiled JavaScript
├── admin/                   # Next.js admin panel
│   ├── src/
│   │   ├── app/             # Admin pages
│   │   ├── components/      # Admin components
│   │   └── services/        # API services
│   └── public/              # Admin assets
└── README.md               # This file
```

## 🔒 **Security Features**

### **Authentication & Authorization**
- ✅ **JWT Token System** - Secure session management
- ✅ **Role-based Access** - Admin and Super Admin roles
- ✅ **Protected Routes** - Admin panel requires authentication
- ✅ **Session Persistence** - Stay logged in across sessions

### **Data Protection**
- ✅ **Input Validation** - All forms validate data
- ✅ **SQL Injection Protection** - Parameterized queries
- ✅ **CORS Security** - Controlled cross-origin access
- ✅ **File Upload Security** - Image type and size limits
- ✅ **Environment Variables** - Sensitive data in .env files

## 📱 **Mobile Responsiveness**

All interfaces are fully responsive:
- ✅ **Frontend Website** - Mobile-first responsive design
- ✅ **Admin Panel** - Touch-friendly mobile interface
- ✅ **Image Upload** - Mobile-optimized file selection
- ✅ **Navigation** - Collapsible mobile menus
- ✅ **Forms** - Optimized for mobile input

## 🧪 **Testing**

### **Backend Testing**
```bash
# Health check
curl http://localhost:5000/api/health

# Test API endpoints
curl http://localhost:5000/api/heroes
curl http://localhost:5000/api/events/grand/current
curl http://localhost:5000/api/team/leadership
```

### **Frontend Testing**
- Visit http://localhost:3000
- Verify all sections load content
- Check mobile responsiveness
- Test event navigation

### **Admin Panel Testing**
- Login at http://localhost:3001
- Test all content management sections
- Try image upload functionality
- Verify toggle functions work

## 🚀 **Production Deployment**

### **Build Commands**
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build

# Admin Panel
cd admin && npm run build
```

### **Environment Variables for Production**
Update all .env files with production values:
- Database connection strings
- Secure JWT secrets
- Production domain URLs
- Cloudinary credentials

### **Deployment Checklist**
- [ ] Set up production PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up Cloudinary account
- [ ] Build all applications
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates
- [ ] Configure domain DNS

## 🛠️ **Development Scripts**

### **Backend Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup-db     # Setup database tables and sample data
npm run create-super-admin  # Create admin account
```

### **Frontend/Admin Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 **Troubleshooting**

### **Common Issues**

**Database Connection Error**
- Check PostgreSQL is running
- Verify database credentials in .env
- Ensure database exists

**CORS Issues**
- Verify FRONTEND_URL and ADMIN_PANEL_URL in backend .env
- Check that ports match running applications

**Image Upload Fails**
- Verify Cloudinary credentials in backend .env
- Check file size is under 5MB
- Ensure file is a valid image type

**Admin Panel Login Issues**
- Run `npm run create-super-admin` in backend
- Check JWT_SECRET is set in backend .env
- Verify backend server is running

## 📚 **Additional Resources**

- **API Documentation**: See `backend/API_DOCUMENTATION.md`
- **Setup Guide**: See `backend/SETUP_GUIDE.md`
- **Cloudinary Setup**: See `CLOUDINARY_SETUP_GUIDE.md`
- **Next.js Documentation**: https://nextjs.org/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🎉 **Success! Your System is Complete**

### **What You Have**
✅ **Professional IoT Website** with dynamic content management  
✅ **Complete Admin Panel** for easy content updates  
✅ **Image Upload System** with Cloudinary CDN  
✅ **Secure Authentication** system  
✅ **Mobile-responsive** design throughout  
✅ **Production-ready** architecture  

### **What You Can Do**
- **Manage all content** through the intuitive admin panel
- **Upload images** directly from your device with drag & drop
- **Toggle content** active/inactive status instantly
- **Add team members** with photos and social media links
- **Create events** with detailed information and agendas
- **Collect testimonials** with star ratings
- **Track company timeline** with past and future milestones

**Your IoT Innovation Hub is now a fully functional, professional content management system!** 🚀

---

**Ready to manage your IoT platform like a pro!** 🎯

For support or questions, please check the troubleshooting section or create an issue in the repository.