# 🚀 QUICK START GUIDE - ZENVYX

## Prerequisites Check
- ✅ Node.js installed
- ✅ MongoDB installed/running
- ✅ Git installed

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```powershell
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### Step 2: Configure Environment (.env files already created)

The `.env` files are already set up with default values. 

**For production**, update:
- `server/.env` - Change JWT_SECRET, add real email credentials
- `client/.env` - Update VITE_API_URL if deploying

### Step 3: Start MongoDB

```powershell
# Start MongoDB service (if not running)
mongod

# Or if using MongoDB as Windows Service, it's already running
```

### Step 4: Seed Database (30 seconds)

```powershell
cd server
npm run seed
```

This creates:
- ✅ Admin user (email: admin@zenvyx.com, password: admin123)
- ✅ 6 Portfolio items
- ✅ 5 Testimonials

### Step 5: Run the Application

**Terminal 1 - Server:**
```powershell
cd server
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Client:**
```powershell
cd client
npm run dev
```
Client runs on: http://localhost:5173

## 🎯 Testing the Application

### Public Pages
1. Home Page: http://localhost:5173
2. Portfolio: http://localhost:5173/portfolio
3. Collaborate: http://localhost:5173/collaborate
4. Contact: http://localhost:5173/contact

### Admin Dashboard
1. Login: http://localhost:5173/login
   - Email: `admin@zenvyx.com`
   - Password: `admin123`

2. Dashboard: http://localhost:5173/admin

### Test Collaboration Form
1. Go to Collaborate page
2. Fill out form (either Creator or Brand tab)
3. Submit → Check email notifications (if configured)
4. Login to admin → View lead in dashboard

## 🔧 Common Issues

### MongoDB Not Running
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Port Already in Use
Change ports in `.env` files:
- Server: `PORT=5001`
- Client: Update vite.config.js

### Email Not Sending
- Update `EMAIL_USER` and `EMAIL_PASS` in `server/.env`
- Use App Password for Gmail
- Or disable email for testing (leads still save to DB)

## 📊 What's Included

### Frontend Features
- ✨ Dark futuristic UI with glassmorphism
- 🎬 Framer Motion + GSAP animations
- 📱 Fully responsive design
- 🎨 Custom components library
- 🔔 Toast notifications
- 📈 Scroll progress indicator

### Backend Features
- 🔒 JWT authentication
- 📧 Email notifications
- 🛡️ Security middleware
- 📊 Analytics endpoints
- ✅ Input validation
- 🗄️ MongoDB with Mongoose

### Admin Panel
- 📊 Dashboard with stats
- 📋 Lead management
- 🎨 Portfolio CRUD
- ⭐ Testimonial management
- 📈 Conversion metrics

## 🎨 Customization

### Change Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  accent: {
    blue: '#00C6FF',     // Your primary color
    violet: '#7C3AED',   // Your secondary color
  }
}
```

### Add New Services
Edit `client/src/components/Services.jsx`

### Modify Email Templates
Edit `server/services/emailService.js`

## 📦 Production Deployment

### Build Client
```powershell
cd client
npm run build
```

### Environment Variables (Production)
Set these on your hosting platform:
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Strong random string
- `EMAIL_USER` / `EMAIL_PASS` - Valid credentials
- `CLIENT_URL` - Your frontend domain

---

**Need Help?** Check the main README.md for detailed documentation.
