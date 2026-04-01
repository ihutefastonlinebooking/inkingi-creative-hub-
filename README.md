# INKINGI CREATIVE HUB - Complete Project Setup

![INKINGI Creative Hub](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-blue)
![Firebase](https://img.shields.io/badge/Database-Firebase-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A complete, modern, mobile-first website for INKINGI CREATIVE HUB with an admin dashboard for managing all content dynamically.

## 🎯 Project Overview

INKINGI CREATIVE HUB is a fully dynamic organization website controlled by a single admin. Everything from logos to galleries is managed through a secure admin dashboard with real-time updates on the public website.

## ✨ Key Features

### 🌐 Public Website
- **Homepage** with auto-sliding hero banner
- **About Page** - Mission, vision, and values
- **Gallery** - Image showcase with lightbox
- **Events** - Upcoming events management
- **Donate** - Support the mission via email/WhatsApp
- **Contact** - Contact form with messages saved to database
- **Join** - Volunteer application form
- **Responsive Design** - Mobile-first, works on all devices

### 🔐 Admin Dashboard
- **Secure Login** - Email/Password authentication via Firebase
- **Logo Management** - Upload & manage organization logo
- **Hero Slider** - Create auto-rotating image slides
- **Content Editor** - Edit mission, vision, about text, donation message
- **Events Management** - Create, edit, delete events with images
- **Projects** - Showcase creative projects
- **Gallery** - Upload multiple images
- **Testimonials** - Add inspiring stories
- **Messages** - View contact form submissions
- **Volunteers** - Manage volunteer applications

### 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Single admin account (no public registration)
- Firebase Firestore security rules
- HTTPS ready

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Authentication
- **UI Icons**: React Icons
- **Notifications**: React Hot Toast
- **State Management**: Zustand (optional)
- **Date Format**: date-fns

## 📋 Prerequisites

Before starting, you'll need:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Firebase Project** - Create one at [firebase.google.com](https://firebase.google.com)
4. **Git** for version control

## 🚀 Quick Start

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/ihutefastonlinebooking/inkingi-creative-hub-.git
cd inkingi-creative-hub-

# Install dependencies
npm install
```

### 2. Firebase Configuration

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "inkingi-creative-hub"
4. Enable Google Analytics (optional)
5. Create project

#### Enable Services

In Firebase Console:

1. **Authentication**:
   - Click "Authentication" in left menu
   - Click "Get started"
   - Enable "Email/Password" provider
   - Go to "Users" tab and manually create the admin:
     - Email: `niyodidie@gmail.com`
     - Password: (set a strong password)
   - Note the admin user ID

2. **Firestore Database**:
   - Click "Firestore Database"
   - Click "Create database"
   - Select "Start in production mode"
   - Choose location
   - Create

3. **Storage**:
   - Click "Storage"
   - Click "Get started"
   - Accept default rules
   - Create

4. **Firestore Security Rules**:

   Replace the default rules with:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read access
       match /{document=**} {
         allow read;
       }

       // Admin write/delete (requires authentication)
       match /{document=**} {
         allow write, delete: if request.auth != null;
       }
     }
   }
   ```

#### Get Firebase Credentials

1. Click the gear icon (Settings)
2. Click "Project settings"
3. Go to "Service accounts" tab
4. Click "Generate new private key"
5. Go back to "General" tab
6. Scroll to "Your apps" section
7. Click "Config" for your web app
8. Copy the configuration

### 3. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Admin Settings
ADMIN_EMAIL=niyodidie@gmail.com
ADMIN_PHONE=+250792505680

# JWT Secret (change in production)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
```

### 4. Create Admin in Firestore

1. In Firebase Console, go to Firestore Database
2. Create a new collection called `admin`
3. Add a document with the admin user ID as the document ID
4. Add these fields:
   ```
   uid: (admin user ID from Firebase Auth)
   email: niyodidie@gmail.com
   phone: +250792505680
   role: admin
   ```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website!

**Admin Login**: `http://localhost:3000/admin/login`
- Email: `niyodidie@gmail.com`
- Password: (the password you set in Firebase)

## 📁 Project Structure

```
inkingi-creative-hub-/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── gallery/           # Gallery page
│   │   ├── events/            # Events page
│   │   ├── donate/            # Donation page
│   │   ├── contact/           # Contact page
│   │   ├── join/              # Volunteer page
│   │   ├── admin/
│   │   │   ├── login/         # Admin login
│   │   │   ├── dashboard/     # Dashboard
│   │   │   ├── logo/          # Logo management
│   │   │   ├── slider/        # Hero slider
│   │   │   ├── content/       # Content editor
│   │   │   ├── events/        # Events management
│   │   │   ├── gallery/       # Gallery management
│   │   │   ├── projects/      # Projects management
│   │   │   ├── testimonials/  # Testimonials management
│   │   │   ├── messages/      # Messages view
│   │   │   ├── volunteers/    # Volunteers view
│   │   │   └── layout.tsx     # Admin protected layout
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer
│   │   ├── HeroSlider.tsx     # Hero slider component
│   │   ├── LogoDisplay.tsx    # Logo display
│   │   ├── AdminSidebar.tsx   # Admin menu
│   │   └── Loader.tsx         # Loading indicator
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication context
│   └── lib/
│       ├── firebase.ts        # Firebase config
│       ├── auth.ts            # Auth functions
│       └── database.ts        # All database operations
├── public/                     # Static files
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🔑 Admin Functions

### Dashboard
- View statistics (messages, volunteers, events)
- Quick start guide

### Logo Management
- Upload logo (replaces existing)
- Preview before upload
- Delete current logo

### Hero Slider
- Add/Edit/Delete slides
- Upload slide images
- Edit slide text
- Auto-slides every 5 seconds

### Content Editor
- Edit About section
- Edit Mission
- Edit Vision
- Edit Donation Message

### Events
- Create new events
- Add event date/time
- Add event location
- Upload event image
- View/delete events

### Gallery
- Upload multiple images at once
- Delete images
- View gallery preview

### Projects
- Add projects with title, description, category
- Upload project images
- Delete projects

### Testimonials
- Add testimonials with name and story
- Upload testimonial photos
- Delete testimonials

### Messages & Volunteers
- View all contact form submissions
- View volunteer applications
- Delete entries

## 🌐 Database Schema

### Collections

#### `admin`
```
uid: string
email: string
phone: string
role: "admin"
```

#### `logo`
```
current/
  url: string
  uploadedAt: timestamp
```

#### `slider`
```
slide_${timestamp}/
  imageUrl: string
  title: string
  description: string
  order: number
  uploadedAt: timestamp
```

#### `content`
```
main/
  about: string
  mission: string
  vision: string
  donationMessage: string
```

#### `events`
```
event_${timestamp}/
  title: string
  date: date
  description: string
  location: string
  imageUrl?: string
  createdAt: timestamp
```

#### `gallery`
```
gallery_${timestamp}/
  url: string
  title?: string
  uploadedAt: timestamp
```

#### `projects`
```
project_${timestamp}/
  title: string
  description: string
  category: string
  imageUrl?: string
  createdAt: timestamp
```

#### `testimonials`
```
testimonial_${timestamp}/
  name: string
  story: string
  imageUrl?: string
  createdAt: timestamp
```

#### `messages`
```
msg_${timestamp}/
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: timestamp
```

#### `volunteers`
```
vol_${timestamp}/
  name: string
  email: string
  phone: string
  message?: string
  createdAt: timestamp
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy via Vercel
npm i -g vercel
vercel
```

Then add environment variables in Vercel dashboard.

### Other Platforms

- **Netlify**: Similar to Vercel
- **Railway**: `railway up`
- **AWS**: Use Amplify or EC2
- **DigitalOcean**: Use App Platform

## 🔧 Configuration

### Change Admin Credentials

1. Go to Firebase Authentication
2. Edit the admin user email/password
3. Update `.env.local` if needed

### Add Languages

Currently available in English and French (through Tailwind translations).

### Customize Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  accent: '#YOUR_COLOR',
}
```

## 🐛 Troubleshooting

### "Not an authorized admin" error
- Ensure admin user exists in Firebase Authentication
- Check admin document exists in Firestore `admin` collection
- Verify the uid matches

### Images not uploading
- Check Firebase Storage permissions
- Verify file size < 5MB
- Check image format (PNG, JPG, GIF accepted)

### "Firebase not initialized"
- Check all environment variables are set
- Restart dev server after env changes
- Clear `.next` folder: `rm -rf .next`

### Database operations failing
- Check Firestore security rules
- Verify Firebase services are enabled
- Check browser console for specific errors

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly buttons
- Mobile menu for navigation
- Optimized images
- Fast loading times

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Contrast ratios meet WCAG standards
- Alt text for all images

## 🔒 Security Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables not committed to git
- [ ] HTTPS enabled in production
- [ ] Admin password is strong (12+ characters, mixed case, numbers, symbols)
- [ ] Regularly backup Firebase data
- [ ] Monitor admin activity
- [ ] Update dependencies regularly

## 📈 Performance

- **Lazy Loading**: Images load only when visible
- **Image Optimization**: WebP format support
- **Code Splitting**: Automatic by Next.js
- **Caching**: Firebase caching enabled
- **CDN**: Firebase automatically serves from CDN

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

## 📞 Support

For issues or questions:
- Email: niyodidie@gmail.com
- WhatsApp: +250 792 505 680

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🎉 Getting Help

- Check Firebase documentation: https://firebase.google.com/docs
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
- React docs: https://react.dev

---

**Made with ❤️ for INKINGI CREATIVE HUB**

Support Hidden Talent. Support the Future.
