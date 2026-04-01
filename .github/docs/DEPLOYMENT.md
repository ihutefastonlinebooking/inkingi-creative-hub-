# DEPLOYMENT GUIDE

This guide covers deploying INKINGI CREATIVE HUB to production.

## Option 1: Vercel (Recommended) ⭐

Vercel is the creators of Next.js and provides the best experience.

### Prerequisites
- GitHub account (push code to GitHub)
- Vercel account (sign up at vercel.com)

### Steps

#### 1. Push code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Initial INKINGI Creative Hub commit"

# Create main branch if needed
git branch -M main

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/inkingi-creative-hub.git

# Push
git push -u origin main
```

#### 2. Deploy on Vercel

1. Go to https://vercel.com/new
2. Connect your GitHub account
3. Select the repository
4. Click **Import**
5. In **Environment Variables** section, add all variables from `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ADMIN_EMAIL=niyodidie@gmail.com
   ADMIN_PHONE=+250792505680
   JWT_SECRET=... (same as local)
   ```
6. Click **Deploy**
7. Wait for build to complete
8. Visit the deployed URL!

#### 3. Set Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Go to **Settings** > **Domains**
3. Add your domain
4. Follow DNS configuration instructions

### Auto-Deploy

Now, every time you push to main branch, Vercel automatically redeploys! 🚀

## Option 2: Railway

Railway is simple and developer-friendly.

### Steps

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create project
railway init

# Set environment variables
railway variables set NEXT_PUBLIC_FIREBASE_API_KEY=...
railway variables set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ... add all other variables

# Deploy
railway up
```

## Option 3: Netlify

### Steps

1. Push code to GitHub (see Vercel step 1)
2. Go to https://app.netlify.com
3. Click **Connect Git**
4. Select GitHub account and repository
5. Set **Build command**: `npm run build`
6. Set **Publish directory**: `.next`
7. Add **Environment variables** (same as Vercel)
8. Click **Deploy site**

## Option 4: Docker (Self-hosted)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# Run
EXPOSE 3000
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
      - NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
      - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
      - NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
      - JWT_SECRET=${JWT_SECRET}
```

Deploy:
```bash
# Build and run locally
docker-compose up

# Push to Docker Hub
docker build -t your-username/inkingi-creative-hub .
docker push your-username/inkingi-creative-hub

# Deploy to cloud services that support Docker
```

## Option 5: AWS Amplify

### Steps

1. Push code to GitHub
2. Go to https://console.aws.amazon.com/amplify
3. Click **New app**
4. Select repository
5. Authorize GitHub
6. Select main branch
7. Add environment variables
8. Click **Deploy**

## Option 6: DigitalOcean App Platform

### Steps

```bash
# Make sure code is on GitHub first

# Install doctl CLI
brew install digitalocean/digitalocean/doctl

# Authenticate
doctl auth init

# Create app
doctl apps create --spec app.yaml
```

Create `app.yaml`:
```yaml
name: inkingi-creative-hub
services:
- name: web
  github:
    branch: main
    repo: YOUR_USERNAME/inkingi-creative-hub
  build_command: npm run build
  run_command: npm start
  http_port: 3000
  envs:
  - key: NEXT_PUBLIC_FIREBASE_API_KEY
    value: ${NEXT_PUBLIC_FIREBASE_API_KEY}
  # ... add all other variables
```

## Post-Deployment Checklist

- [ ] Test admin login works
- [ ] Upload test logo
- [ ] Create test hero slider image
- [ ] Create test event
- [ ] Submit test contact form
- [ ] Submit test volunteer form
- [ ] Check all pages load
- [ ] Test on mobile device
- [ ] Verify no console errors
- [ ] Check Google Lighthouse score

## Performance Optimization

### 1. Image Optimization

Next.js automatically optimizes images, but ensure:
- Logo < 1MB
- Gallery images optimized before upload
- Use WebP format when possible

### 2. Database Indexing

In Firestore:
1. Go to **Firestore Database** > **Indexes**
2. Create indexes for frequently queried fields:
   - `events`: index on `date` (descending)
   - `testimonials`: index on `createdAt` (descending)
   - `gallery`: index on `uploadedAt` (descending)

### 3. Caching Headers

Add to `next.config.ts`:
```typescript
module.exports = {
  headers: async () => {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 4. Monitor Performance

- Vercel: Dashboard shows performance metrics
- Google Lighthouse: Run audit at https://pagespeed.web.dev
- Firebase Console: Monitor read/write operations

## Scaling Considerations

### Current Limits (Free Tier)

- **Firestore**: 50,000 reads/day
- **Storage**: 5GB total
- **Functions**: 125,000 invocations/month

### When to Upgrade

- Traffic > 10,000 users/month → Upgrade Firebase plan
- Storage > 1GB → Optimize images or upgrade
- Complex queries needed → Use Firestore indexes

## Security Checklist

- [ ] Environment variables securely stored
- [ ] Firestore rules updated and published
- [ ] Storage rules updated and published
- [ ] Admin password changed from default
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] API secrets not exposed in frontend code
- [ ] Regular backups configured
- [ ] Monitoring alerts set up

## Monitoring & Logging

### Firebase Console
- Go to **Firestore Database** > **Usage** tab
- Monitor read/write operations
- Check for performance issues

### Vercel Analytics
1. Go to project > **Analytics**
2. View page views, response times, etc.
3. Configure alerts for errors

### Application Errors
Errors are logged to browser console. To track in production:

```typescript
// Add error tracking (optional)
import { Sentry } from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
})
```

## Rollback Plan

If something goes wrong:

### Vercel
1. Go to **Deployments** tab
2. Find previous working version
3. Click **Promote to Production**

### GitHub
```bash
# Revert to previous commit
git log --oneline  # Find commit hash
git revert COMMIT_HASH
git push origin main
```

## Maintenance

### Daily
- Monitor admin panel for new messages/volunteers
- Check website uptime

### Weekly
- Review Firebase usage
- Check error logs
- Update content as needed

### Monthly
- Review security rules
- Optimize database queries
- Update dependencies: `npm update`
- Backup critical data

### Quarterly
- Review analytics
- Plan new features
- Upgrade Firebase plan if needed
- Full security audit

## Troubleshooting Deployments

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

### Can't connect to Firebase
- Verify environment variables are set
- Check Firebase services are active
- Verify security rules allow the operation

### Content not loading
- Check Firestore security rules
- Verify data exists in database
- Check browser developer tools console

### Images not showing
- Verify Storage security rules allow read
- Check image URLs in database
- Verify images were uploaded to Storage

## Getting Help

- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs
- Community: Stack Overflow, GitHub Discussions

---

**Deployed successfully? Congratulations! 🎉**

Don't forget to:
- Test thoroughly in production
- Monitor performance
- Keep dependencies updated
- Regular backups
