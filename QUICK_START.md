# QUICK START CHECKLIST

Use this checklist to get INKINGI CREATIVE HUB up and running quickly.

## Phase 1: Setup (15-30 minutes)

### Prerequisites
- [ ] Node.js v18+ installed
- [ ] npm or yarn installed
- [ ] GitHub account
- [ ] Firebase account created

### Local Setup
- [ ] Clone repository: `git clone ...`
- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Open `.env.local` for configuration

## Phase 2: Firebase Configuration (20-30 minutes)

### Firebase Project
- [ ] Create Firebase project at console.firebase.google.com
- [ ] Write down Project ID

### Enable Services
- [ ] Enable Authentication (Email/Password)
- [ ] Enable Firestore Database
- [ ] Enable Storage

### Create Admin User
- [ ] Go to Firebase Authentication > Users
- [ ] Create user: `niyodidie@gmail.com`
- [ ] Set strong password
- [ ] Copy User ID

### Get Credentials
- [ ] Go to Project Settings
- [ ] Copy API Key
- [ ] Copy Auth Domain
- [ ] Copy Project ID
- [ ] Copy Storage Bucket
- [ ] Copy Messaging Sender ID
- [ ] Copy App ID

### Update Environment Variables
- [ ] Paste Firebase credentials in `.env.local`
- [ ] Set `ADMIN_EMAIL=niyodidie@gmail.com`
- [ ] Set `ADMIN_PHONE=+250792505680`
- [ ] Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Paste JWT secret in `JWT_SECRET`

### Firestore Setup
- [ ] Create collection: `admin`
- [ ] Add document with User ID as ID
- [ ] Add fields: `uid`, `email`, `phone`, `role: 'admin'`

### Update Security Rules
- [ ] Go to Firestore > Rules
- [ ] Replace with production rules from FIREBASE_SETUP.md
- [ ] Publish rules
- [ ] Go to Storage > Rules
- [ ] Update Storage rules from FIREBASE_SETUP.md
- [ ] Publish rules

## Phase 3: Local Testing (10-15 minutes)

### Start Development Server
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] See homepage

### Test Public Website
- [ ] Visit home page ✅
- [ ] Check navigation works
- [ ] Visit /about page ✅
- [ ] Visit /gallery page ✅
- [ ] Visit /events page ✅
- [ ] Visit /donate page ✅
- [ ] Visit /contact page ✅
- [ ] Visit /join page ✅
- [ ] Test contact form (should save)
- [ ] Test volunteer form (should save)

### Test Admin Dashboard
- [ ] Go to http://localhost:3000/admin/login
- [ ] Login with: `niyodidie@gmail.com` and your password
- [ ] See dashboard ✅

### Test Admin Functions
- [ ] Upload logo
- [ ] Create hero slider image
- [ ] Edit content sections
- [ ] Create event
- [ ] Upload project
- [ ] Upload gallery image
- [ ] Add testimonial
- [ ] Check messages appear
- [ ] Check volunteers appear

## Phase 4: Customization (Optional)

### Brand Customization
- [ ] Update logo in admin
- [ ] Update mission/vision text
- [ ] Update about section
- [ ] Update donation message
- [ ] Update footer contact info

### Color Customization
- [ ] Edit `tailwind.config.ts` colors
- [ ] Update primary, secondary, accent colors
- [ ] Rebuild with `npm run dev`

### Add Initial Content
- [ ] Add mission statement
- [ ] Add vision statement
- [ ] Create 2-3 hero slides
- [ ] Add 2-3 projects
- [ ] Add 5+ gallery images
- [ ] Add testimonials

## Phase 5: Deployment (5-10 minutes per platform)

### Vercel Deployment (Recommended)
- [ ] Create GitHub account
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Go to vercel.com/new
- [ ] Connect GitHub repo
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Test deployed site
- [ ] Add custom domain (optional)

### Alternative Platforms
Choose one:
- [ ] Railway: `railway login` → `railway init` → `railway up`
- [ ] Netlify: Connect GitHub > Deploy
- [ ] DigitalOcean App Platform: Similar to Vercel
- [ ] Docker: `docker build` → deploy

## Phase 6: Post-Deployment (10 minutes)

### Production Testing
- [ ] Test admin login on production ✅
- [ ] Upload logo on production
- [ ] Create test event
- [ ] Submit contact form
- [ ] Submit volunteer form
- [ ] Mobile test on iPhone
- [ ] Mobile test on Android
- [ ] Test on different browsers

### Verification
- [ ] Check Google Lighthouse score
- [ ] Verify no console errors
- [ ] Check Firebase security rules are active
- [ ] Verify images load correctly
- [ ] Test contact form notifications

### Monitoring Setup
- [ ] Enable Vercel analytics (if using Vercel)
- [ ] Monitor Firebase usage
- [ ] Set up error alerts

## Phase 7: Production Ready

- [ ] Change admin password to something strong
- [ ] Remove test data
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set up backups
- [ ] Create maintenance schedule
- [ ] Document admin procedures
- [ ] Train admin user

## Timeline Summary

- **30 min**: Firebase setup
- **15 min**: Local testing
- **10 min**: Cosmetic customization
- **10 min**: Initial content
- **10 min**: Deployment
- **10 min**: Post-deployment testing

**Total: ~1.5-2 hours to production** ✅

## Common Issues & Quick Fixes

### Admin Login Says "User Not Found"
→ Check Firebase Authentication has the user
→ Verify email spelling matches exactly

### "Not an Authorized Admin"
→ Verify admin document exists in Firestore
→ Check UID matches between Auth and Firestore

### Images Won't Upload
→ Check Storage rules were published
→ Verify file size < 5MB
→ Clear browser cache

### Database Empty After Deployment
→ Check Firestore security rules are correct
→ Verify environment variables copied correctly
→ Check no console errors

### Deployment Build Fails
→ Verify all environment variables are set
→ Run `npm run build` locally first
→ Check for TypeScript errors: `npm run lint`

## Next Steps After Going Live

1. **Daily**: Check admin panel for messages
2. **Weekly**: Update content, monitor usage
3. **Monthly**: Review analytics, backup data
4. **Quarterly**: Security audit, plan features

## Support Resources

- Main README: `README.md`
- Firebase Setup: `FIREBASE_SETUP.md`
- Deployment Guide: `DEPLOYMENT.md`
- Firebase Docs: firebase.google.com/docs
- Next.js Docs: nextjs.org/docs

---

**Questions?** Contact: niyodidie@gmail.com or +250 792 505 680

**Deployment Successful?** 🎉 Great! Your INKINGI CREATIVE HUB is now live!
