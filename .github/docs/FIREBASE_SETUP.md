# SETUP GUIDE - Fire base Configuration

This guide walks you through setting up Firebase for INKINGI CREATIVE HUB.

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Enter project name: `inkingi-creative-hub`
4. Click **Continue**
5. Enable Google Analytics (optional but recommended)
6. Click **Create project** and wait for completion

## Step 2: Set Up Firebase Services

### 2.1 Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Select **Email/Password** provider
4. Toggle **Enable** for Email/Password
5. Copy this code to `src/lib/firebaseInit.ts` (for server-side admin creation):

```typescript
import admin from 'firebase-admin'

export async function createAdminUser() {
  try {
    const user = await admin.auth().createUser({
      email: 'niyodidie@gmail.com',
      password: 'ChangeMe@123456',
    })
    console.log('Admin user created:', user.uid)
    return user.uid
  } catch (error) {
    console.error('Error creating user:', error)
  }
}
```

Or create manually:
- Go to **Users** tab
- Click **Add user**
- Email: `niyodidie@gmail.com`
- Password: (Create strong password: minimum 12 chars, mixed case, numbers, symbols)
- Click **Add user**
- **Note down the User ID** (this will be needed)

### 2.2 Set Up Firestore

1. Click **Firestore Database** in left menu
2. Click **Create database**
3. Choose **Start in test mode** (we'll update rules later)
4. Select your region (choose closest to your users)
5. Click **Create**

### 2.3 Set Up Storage

1. Click **Storage** in left menu
2. Click **Get started**
3. Accept the default rules for now
4. Click **Done**

### 2.4 Update Firestore Security Rules

1. Go to **Firestore Database** > **Rules** tab
2. Replace all content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all data
    match /{document=**} {
      allow read;
    }

    // Allow authenticated users to write
    match /{document=**} {
      allow write, delete: if request.auth != null && request.auth.uid == request.resource.data.uid || 
                           (resource.data.role == 'admin' && request.auth != null);
    }

    // Specific rules for admin operations
    match /admin/{document=**} {
      allow read, write: if request.auth != null;
    }

    match /slider/{document=**} {
      allow read;
      allow write, delete: if request.auth != null;
    }

    match /gallery/{document=**} {
      allow read;
      allow write, delete: if request.auth != null;
    }

    match /events/{document=**} {
      allow read;
      allow write, delete: if request.auth != null;
    }

    match /projects/{document=**} {
      allow read;
      allow write, delete: if request.auth != null;
    }

    match /testimonials/{document=**} {
      allow read;
      allow write, delete: if request.auth != null;
    }

    match /messages/{document=**} {
      allow create;
      allow read: if request.auth != null;
      allow delete: if request.auth != null;
    }

    match /volunteers/{document=**} {
      allow create;
      allow read: if request.auth != null;
      allow delete: if request.auth != null;
    }

    match /content/{document=**} {
      allow read;
      allow write: if request.auth != null;
    }

    match /logo/{document=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### 2.5 Update Storage Rules

1. Go to **Storage** > **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read
    match /{allPaths=**} {
      allow read;
    }

    // Allow authenticated users to write to specific paths
    match /logo/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880; // 5MB
    }

    match /slider/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880;
    }

    match /gallery/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880;
    }

    match /projects/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880;
    }

    match /events/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880;
    }

    match /testimonials/{fileName} {
      allow write: if request.auth != null && request.resource.size < 5242880;
    }
  }
}
```

3. Click **Publish**

## Step 3: Get Firebase Credentials

1. Click the **Settings** icon (gear) in Firebase Console
2. Click **Project settings**
3. Go to **Service accounts** tab
4. Select **Node.js** and click **Generate new private key** (keep safe!)
5. Go back to **General** tab
6. Scroll to **Your apps** section
7. If no web app exists, click **Add app** and select **Web** (</> icon)
8. Copy the configuration object

Your configuration will look like:
```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcde..."
}
```

## Step 4: Create Admin Document in Firestore

1. Go to **Firestore Database**
2. Click **Start collection**
3. Name it **admin**
4. Create a document:
   - Document ID: (Enter the User ID from Step 2.1)
   - Add fields:
     - `email`: string = `niyodidie@gmail.com`
     - `phone`: string = `+250792505680`
     - `uid`: string = (The User ID from Step 2.1)
     - `role`: string = `admin`

## Step 5: Configure Environment Variables

Create/update `.env.local` in project root:

```env
# From Firebase Config (Step 3)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcde...

# Admin Settings
ADMIN_EMAIL=niyodidie@gmail.com
ADMIN_PHONE=+250792505680

# JWT Secret - Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_32_character_hex_string_here
```

## Step 6: Test Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
# Admin login: http://localhost:3000/admin/login
# Email: niyodidie@gmail.com
# Password: (the password you set)
```

## Troubleshooting

### "Firebase is not defined"
- Ensure all environment variables are set
- Restart dev server: `npm run dev`
- Clear Next.js cache: `rm -rf .next`

### "User not found" on login
- Verify user exists in Firebase Authentication
- Check email spelling matches exactly
- Password must be correct

### "Not an authorized admin"
- Verify admin document exists in Firestore
- Check UID matches between Authentication and Firestore

### "Permission denied" errors
- Check Firestore security rules were published
- Check Storage rules were published
- Wait 30 seconds for rules to propagate

### Images won't upload
- Verify Storage rules are updated
- Check file size < 5MB
- Verify file format is image (PNG, JPG, GIF)

## What's Next?

1. Create initial content:
   - Go to http://localhost:3000/admin/dashboard
   - Upload logo
   - Create hero slides
   - Add mission/vision text

2. Test public site:
   - Visit http://localhost:3000
   - Check all pages display correctly
   - Test contact form

3. Deploy to production:
   - Follow [Deployment Guide](./DEPLOYMENT.md)

## Security Reminders

✅ Never commit `.env.local` to git
✅ Use strong admin password (12+ chars, mixed case, numbers, symbols)
✅ Regularly update Firebase security rules
✅ Monitor admin panel access
✅ Backup Firebase data regularly

Need help? See main README.md or contact support.
