# 📌 QUICK REFERENCE CARD

## Essential Commands

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint for errors
npm run lint
```

## Important URLs

### Local Development
```
Homepage:        http://localhost:3000
Admin Login:     http://localhost:3000/admin/login
Admin Dashboard: http://localhost:3000/admin/dashboard
```

### Public Pages
```
About:    /about
Gallery:  /gallery
Events:   /events
Donate:   /donate
Contact:  /contact
Join:     /join
```

### Admin Pages
```
Dashboard:     /admin/dashboard
Logo:          /admin/logo
Hero Slider:   /admin/slider
Content:       /admin/content
Events:        /admin/events
Gallery:       /admin/gallery
Projects:      /admin/projects
Testimonials:  /admin/testimonials
Messages:      /admin/messages
Volunteers:    /admin/volunteers
Login:         /admin/login
```

## Admin Credentials

```
Email:    niyodidie@gmail.com
Phone:    +250792505680
Password: [Set during Firebase setup]
```

## Environment Variables

### Required in .env.local
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
ADMIN_EMAIL
ADMIN_PHONE
JWT_SECRET
```

## Firebase Collections

```
admin          → Admin user data
logo           → Current organization logo
slider         → Hero slider images
content        → Text content (mission, vision, etc)
events         → Events with dates & images
gallery        → Gallery images
projects       → Creative projects
testimonials   → Testimonial stories
messages       → Contact form submissions
volunteers     → Volunteer applications
```

## Key File Locations

```
Frontend Code:     /src/app
Components:        /src/components
Context/Auth:      /src/context
Database/API:      /src/lib
Styles:           /src/app/globals.css
Config:           /tailwind.config.ts
Env Variables:    /.env.local
```

## Deployment Commands

### Vercel
```bash
# Prerequisites: GitHub repo, Vercel account

# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com/new and connect repo
# 3. Add environment variables
# 4. Deploy!
```

### Docker
```bash
docker build -t inkingi .
docker run -p 3000:3000 inkingi
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway variables set NEXT_PUBLIC_FIREBASE_API_KEY=...
railway up
```

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't login | Check Firebase has the user + verify email spelling |
| Images won't upload | Check Storage rules published + file < 5MB |
| "Firebase not initialized" | Restart server: `npm run dev` |
| Port 3000 in use | `lsof -i :3000` then `kill -9 PID` |
| TypeScript errors | Run `npm run lint` to see errors |
| Slow build | Clear cache: `rm -rf .next && npm run dev` |
| Can't connect to Firebase | Verify all env variables are set correctly |

## Firebase Console Links

```
Dashboard:     https://console.firebase.google.com
Authentication: https://console.firebase.google.com/u/0/project/PROJECT_ID/authentication
Firestore:     https://console.firebase.google.com/u/0/project/PROJECT_ID/firestore
Storage:       https://console.firebase.google.com/u/0/project/PROJECT_ID/storage
Settings:      https://console.firebase.google.com/project/PROJECT_ID/settings/general
```

## Development Tools

```bash
# Start dev server in background
npm run dev &

# Watch mode for changes
npm run dev

# Type checking
npx tsc --noEmit

# Format code (if eslint configured)
npm run lint -- --fix
```

## Important Notes

✅ DO:
- Keep .env.local PRIVATE (not in git)
- Use strong admin password (12+ chars)
- Test locally before deploying
- Backup Firebase data regularly
- Monitor for errors in console

❌ DON'T:
- Commit .env.local to git
- Share Firebase credentials
- Use same password across services
- Make storage buckets public
- Delete production data without backup

## Performance Tips

1. Optimize images before upload (< 500KB each)
2. Use Firestore indexes for queries
3. Clear browser cache if issues
4. Deploy to Vercel for best performance
5. Monitor Firebase usage in Console

## Getting Help

📖 Documentation:
- README.md - Full guide
- QUICK_START.md - Step-by-step
- FIREBASE_SETUP.md - Firebase guide
- DEPLOYMENT.md - Deploy guide

📧 Contact:
- Email: niyodidie@gmail.com
- Phone: +250 792 505 680

## Useful Next.js Commands

```bash
# Analyze bundle
npm install -g next-bundle-analyzer

# Generate sitemap (SEO)
# Already configured in next.config.ts

# Export static site
npm run build && npm run export
```

## Database Quick Reference

```typescript
// Import database functions
import {
  uploadLogo,
  addSlide,
  getContent,
  addEvent,
  uploadGalleryImage,
  addProject,
  addTestimonial,
  addMessage,
  addVolunteer,
} from '@/lib/database'

// Import auth functions
import {
  loginAdmin,
  logoutAdmin,
  getCurrentUser,
} from '@/lib/auth'
```

## Important Dates

- Project Start: Apr 1, 2024
- Last Updated: Apr 1, 2024
- Recommended Review: Quarterly

---

**Print this card or bookmark it!**
