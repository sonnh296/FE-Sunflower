# Quick Setup Guide - Google OAuth

## 🚀 5-Minute Setup

### Step 1: Get Google Credentials (2 min)

1. Visit: https://console.cloud.google.com/
2. Create project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:5173/auth/sign-in`
6. Copy **Client ID** and **Client Secret**

### Step 2: Configure Frontend (1 min)

Create `/MFFE/.env.local`:

```bash
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/sign-in
```

### Step 3: Configure Backend (1 min)

Update `/BR-Subflower/src/main/resources/application.yml`:

```yaml
outbound:
  identity:
    client-id: 'your-client-id'
    client-secret: 'your-client-secret'
    redirect-uri: 'http://localhost:5173/auth/sign-in'
```

### Step 4: Test (1 min)

```bash
# Start frontend
cd MFFE
npm run dev

# Start backend
cd BR-Subflower
./mvnw spring-boot:run

# Test
1. Go to http://localhost:5173/auth/sign-in
2. Click "Đăng nhập với Google"
3. Select Google account
4. ✅ You're logged in!
```

## 📱 What Users See

### Login Page - Before

```
[Username input]
[Password input]
[Login button]
```

### Login Page - After

```
[Username input]
[Password input]
[Login button]

────── hoặc ──────

[🔵 Đăng nhập với Google]
```

### Register Page - After

```
[All form fields]
[Register button]

────── hoặc ──────

[🔵 Đăng ký với Google]
```

## ✨ What's New

### For Users:

- ✅ One-click login with Google
- ✅ No password needed
- ✅ Faster registration
- ✅ Secure authentication

### For Developers:

- ✅ Google OAuth API integrated
- ✅ Callback handling automated
- ✅ Error messages in Vietnamese
- ✅ Loading states included
- ✅ Toast notifications added

## 🎯 Files Changed

```
✏️  Modified Files:
├── /MFFE/src/api/authApi.ts (+ googleAuthApi)
├── /MFFE/src/stores/authStore.ts (+ googleLogin action)
├── /MFFE/src/components/forms/LoginForm.vue (+ Google button)
├── /MFFE/src/components/forms/RegisterForm.vue (+ Google button)
├── /MFFE/src/views/Auth/LoginScreen.vue (+ OAuth callback)
└── /MFFE/.env.example (+ Google vars)

📄 New Files:
└── /MFFE/src/utils/googleOAuth.ts (OAuth utilities)

📚 Documentation:
└── /MFFE/GOOGLE_OAUTH_INTEGRATION.md (Full guide)
```

## 🔍 Quick Test Checklist

- [ ] Google button appears on login page
- [ ] Google button appears on register page
- [ ] Clicking button redirects to Google
- [ ] After Google auth, redirected back
- [ ] Loading spinner shows during processing
- [ ] Success message shows after login
- [ ] User is logged in (check cookies)
- [ ] Dashboard/home page loads

## ⚠️ Common Issues

**"redirect_uri_mismatch"**
→ Check redirect URI matches exactly in Google Console

**Google button not working**
→ Check .env.local file exists and has correct values

**Backend error**
→ Check application.yml has client-id and client-secret

**Not redirecting after Google auth**
→ Check backend is running on correct port

## 🎉 Done!

Google OAuth is now integrated. Users can sign in/register with one click!

For detailed documentation, see: `GOOGLE_OAUTH_INTEGRATION.md`
