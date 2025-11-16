# Admin Account Setup

This document explains how the admin account is automatically created and managed in the ecomGearsey application.

## Overview

The ecomGearsey application automatically creates a default admin account when the backend server starts for the first time. This eliminates the need for manual admin account creation and ensures that an admin user is always available.

## Default Admin Credentials

```
Email: admin@admin.com
Password: admin582005
```

## How It Works

### Backend Auto-Creation

When you start the backend server (`npm run dev` or `npm start`), the following happens:

1. **Database Connection**: The server connects to MongoDB
2. **Admin Setup**: The `setupDefaultAdmin()` function runs automatically
3. **Admin Verification**: The system checks if an admin account exists:
   - **If no admin exists**: Creates a new admin account with the default credentials
   - **If admin exists**: Verifies the admin account has the correct role and password
   - **If password is corrupted**: Automatically repairs it to the default password

### Console Output

When the admin is created, you'll see this message in the console:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ ADMIN CREATED
📧 Email: admin@admin.com
🔑 Password: admin582005
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

When the admin already exists, you'll see:

```
✅ Admin user already exists
```

### Frontend Restrictions

The admin role is **not available** in the frontend signup interface. Users can only sign up as:
- **Customer**: Browse and buy car parts
- **Seller**: Sell car parts

This ensures that admin accounts can only be created through the secure backend auto-creation process.

## First Login

### Step 1: Start the Backend

```bash
cd backend
npm install --legacy-peer-deps
npm run dev
```

The admin account will be created automatically on first startup.

### Step 2: Start the Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Step 3: Login as Admin

1. Navigate to `http://localhost:5173/login`
2. Enter the admin credentials:
   - Email: `admin@admin.com`
   - Password: `admin582005`
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

## Security Best Practices

### ⚠️ IMPORTANT: Change the Default Password

After your first login, you should **immediately change the admin password** for security purposes:

1. Login with the default credentials
2. Navigate to your profile settings
3. Change the password to a strong, unique password
4. Store the new password securely

### Why This Matters

- The default password is documented in this repository
- Anyone with access to the code knows the default credentials
- Changing the password protects your admin account from unauthorized access

## Troubleshooting

### Admin Account Not Created

If the admin account is not created automatically:

1. Check that MongoDB is running and accessible
2. Verify the `MONGO_URI` in your `.env` file is correct
3. Check the server console for error messages
4. Ensure the database connection is successful before the admin setup runs

### Cannot Login with Admin Credentials

If you cannot login with the admin credentials:

1. Check the server console to verify the admin was created
2. Try resetting the admin password by restarting the backend (it will verify and fix the password)
3. Check the MongoDB database to ensure the admin user exists:
   ```javascript
   db.user.findOne({ email: "admin@admin.com" })
   ```

### Admin Role Missing

If the admin account exists but doesn't have admin privileges:

1. Restart the backend server - it will automatically fix the role
2. Or manually update the role in MongoDB:
   ```javascript
   db.user.updateOne(
     { email: "admin@admin.com" },
     { $set: { role: "admin", updatedAt: new Date() } }
   )
   ```

## Technical Details

### Implementation Files

- **Backend Setup**: `backend/src/utils/setupAdmin.ts`
- **Server Integration**: `backend/src/server.ts` (lines 66)
- **Frontend Restrictions**: `Frontend/src/roles/General/views/Login/utils/constants.js`

### Database Collections

The admin account uses two MongoDB collections:

1. **user** collection: Stores user profile information
   - `id`: UUID
   - `email`: "admin@admin.com"
   - `name`: "Abdul Wahab Shahid"
   - `role`: "admin"
   - Other profile fields

2. **account** collection: Stores authentication credentials
   - `id`: UUID
   - `userId`: Links to user record
   - `providerId`: "credential"
   - `password`: Bcrypt hashed password

### Security Features

- Passwords are hashed using bcrypt with 10 salt rounds
- Admin creation is idempotent (safe to run multiple times)
- Role verification ensures admin privileges are preserved
- No admin signup available in frontend UI

## For Developers

### Modifying Admin Details

To change the default admin details, edit `backend/src/utils/setupAdmin.ts`:

```typescript
// Create user
await usersCollection.insertOne({
  id: userId,
  name: "Your Admin Name",        // ← Change this
  email: "your-admin@example.com", // ← Change this
  emailVerified: true,
  image: null,
  phone: "Your Phone Number",      // ← Change this
  address: "Your Address",         // ← Change this
  role: "admin",
  rating: 0,
  total_reviews: 0,
  createdAt: now,
  updatedAt: now,
});

// Update the password too
const hashedPassword = await bcrypt.hash("your-new-password", 10); // ← Change this
```

**Remember**: If you change these values, update this documentation accordingly!

### Creating Additional Admins

To create additional admin accounts:

1. Create a regular user account (Customer or Seller)
2. Manually update the role in MongoDB:
   ```javascript
   db.user.updateOne(
     { email: "newadmin@example.com" },
     { $set: { role: "admin", updatedAt: new Date() } }
   )
   ```

Alternatively, you can create an admin endpoint to promote users to admin role (ensure this is properly secured with admin-only access).

## Related Documentation

- [Backend README](backend/README.md) - Backend architecture and setup
- [Better Auth Documentation](https://www.better-auth.com/) - Authentication library used
- [MongoDB Manual](https://docs.mongodb.com/) - Database documentation
