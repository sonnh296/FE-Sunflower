# Google OAuth Integration - Complete Guide

## Overview

Google OAuth authentication has been integrated into the Elsun frontend application, allowing users to sign in/register with their Google accounts.

## 🎯 Features Implemented

### 1. **"Sign in with Google" Button**

- Added to Login form
- Official Google branding and colors
- Single-click authentication

### 2. **"Sign up with Google" Button**

- Added to Register form
- Same seamless Google authentication flow
- Automatic account creation for new users

### 3. **OAuth Callback Handling**

- Automatic processing of Google authentication response
- Loading state during authentication
- Error handling with user-friendly messages
- Automatic redirect after successful login

## 📁 Files Created/Modified

### New Files

1. **`/MFFE/src/utils/googleOAuth.ts`**
   - Google OAuth configuration
   - Authorization URL generator
   - Login handler function

### Modified Files

1. **`/MFFE/src/api/authApi.ts`**

   - Added `googleAuthApi` function

2. **`/MFFE/src/stores/authStore.ts`**

   - Added `googleLogin` action

3. **`/MFFE/src/components/forms/LoginForm.vue`**

   - Added Google Sign-In button
   - Added divider "hoặc" (or)

4. **`/MFFE/src/components/forms/RegisterForm.vue`**

   - Added Google Sign-Up button
   - Added divider "hoặc" (or)

5. **`/MFFE/src/views/Auth/LoginScreen.vue`**

   - Added OAuth callback handling
   - Added loading state
   - Added error handling

6. **`/MFFE/.env.example`**
   - Added Google OAuth environment variables

## 🔧 Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5173/auth/sign-in` (development)
   - `https://yourdomain.com/auth/sign-in` (production)
7. Copy the **Client ID**

### 2. Configure Frontend

Create `.env.local` file in `/MFFE` directory:

```bash
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/sign-in
```

**For Production:**

```bash
VITE_GOOGLE_CLIENT_ID=your-prod-client-id.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=https://elsun.com/auth/sign-in
```

### 3. Configure Backend

Update `/BR-Subflower/src/main/resources/application.yml`:

```yaml
outbound:
  identity:
    client-id: 'your-google-client-id'
    client-secret: 'your-google-client-secret'
    redirect-uri: 'http://localhost:5173/auth/sign-in'
```

### 4. Restart Application

```bash
# Frontend
cd MFFE
npm run dev

# Backend
cd BR-Subflower
./mvnw spring-boot:run
```

## 🔄 OAuth Flow

```
User clicks "Sign in with Google"
         ↓
Redirect to Google OAuth page
         ↓
User authorizes application
         ↓
Google redirects to: /auth/sign-in?code=xyz123
         ↓
Frontend calls: POST /auth/outbound/authentication?code=xyz123
         ↓
Backend validates code with Google
         ↓
Backend creates/finds user account
         ↓
Backend returns JWT token
         ↓
Frontend stores token
         ↓
User redirected to dashboard
```

## 📝 API Endpoints

### Frontend API Call

```typescript
// /MFFE/src/api/authApi.ts
export const googleAuthApi = async (code: string) => {
  return await api.post(`auth/outbound/authentication?code=${code}`)
}
```

### Backend Endpoint

```java
// POST /auth/outbound/authentication?code={authCode}
@PostMapping("/outbound/authentication")
ApiResponse<AuthenticationResponse> outboundAuthenticate(@RequestParam("code") String code)
```

**Response Format:**

```json
{
  "code": "1000",
  "message": null,
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "authenticated": true
  }
}
```

## 🎨 UI Components

### Google Sign-In Button Design

**Features:**

- Official Google logo (SVG with 4 brand colors)
- White background with gray border
- Hover effects (gray background, darker border)
- Responsive design
- Consistent with Google branding guidelines

**CSS Classes:**

```css
w-full flex items-center justify-center gap-3
bg-white border-2 border-gray-300 rounded-lg
px-6 py-3 text-gray-700 font-medium
hover:bg-gray-50 hover:border-gray-400
transition-all duration-200 shadow-sm hover:shadow
```

### Loading State

When processing OAuth:

```vue
<div class="bg-white p-10 rounded-md text-center">
  <i class="pi pi-spin pi-spinner text-4xl text-purple-500 mb-4"></i>
  <h2>Đang xử lý đăng nhập...</h2>
  <p>Vui lòng đợi trong giây lát</p>
</div>
```

## 🔒 Security Considerations

### 1. **HTTPS Required in Production**

Google OAuth requires HTTPS for redirect URIs in production.

### 2. **Client Secret Protection**

- Client ID: Can be public (in frontend)
- Client Secret: Must be private (backend only)

### 3. **Token Storage**

- JWT tokens stored in cookies
- HttpOnly flag recommended
- Secure flag for production

### 4. **CORS Configuration**

Backend must allow your frontend domain:

```yaml
cors:
  allowed-origins:
    - http://localhost:5173
    - https://elsun.com
```

## 🧪 Testing

### Manual Testing

1. **Test Login Flow:**

   ```
   1. Go to /auth/sign-in
   2. Click "Đăng nhập với Google"
   3. Select Google account
   4. Verify redirect to dashboard
   5. Check user is logged in
   ```

2. **Test Register Flow:**

   ```
   1. Go to /auth/sign-in
   2. Click "Đăng ký" tab
   3. Click "Đăng ký với Google"
   4. Select Google account
   5. Verify new account created
   6. Verify redirect to dashboard
   ```

3. **Test Error Handling:**
   ```
   1. Simulate network error
   2. Verify toast notification shown
   3. Verify user can retry
   ```

### Test Accounts

Use Google Test Users for development:

- Go to Google Cloud Console
- OAuth consent screen → Test users
- Add test email addresses

## 🐛 Troubleshooting

### Issue: "redirect_uri_mismatch"

**Solution:** Ensure redirect URI in Google Console matches exactly:

- Frontend: `http://localhost:5173/auth/sign-in`
- Backend config: Must match frontend

### Issue: "invalid_client"

**Solution:** Check client ID and secret are correct in backend config

### Issue: "User not redirected after Google auth"

**Solution:** Check route name 'guest-home' exists in router

### Issue: "Token not saved"

**Solution:** Check cookies are enabled in browser

### Issue: Loading state stuck

**Solution:** Check backend is running and accessible

## 📊 User Experience Flow

### New User (First Time)

```
Click Google button
  → Google authorization
  → Backend creates account with Google info
  → JWT token issued
  → Redirected to home
  → Welcome message
```

### Returning User

```
Click Google button
  → Google authorization
  → Backend finds existing account
  → JWT token issued
  → Redirected to home
  → Welcome back message
```

## 🔄 State Management

### AuthStore Actions

**`googleLogin(code: string)`**

```typescript
async googleLogin(code: string) {
  this.isLoggingIn = true
  const { data } = await googleAuthApi(code)
  await this.loginSuccessfully(data.result)
  this.isLoggingIn = false
}
```

**`loginSuccessfully(data: LoginResponse)`**

```typescript
async loginSuccessfully(data: LoginResponse) {
  // Store JWT token
  Cookies.set(ACCESS_TOKEN_KEY, data.token)

  // Fetch user info
  await this.getMe()

  // Store user data
  localStorage.setItem('avatar', this.identity?.avatarUrl)

  // Redirect based on role
  if (role === 'user') router.push('/user/home')
  if (role === 'admin') router.push('/admin/home')
}
```

## 🎯 Benefits

### For Users

- ✅ Faster registration (no form filling)
- ✅ Secure authentication (Google handles it)
- ✅ No password to remember
- ✅ One-click login

### For Business

- ✅ Higher conversion rate
- ✅ Reduced fraud (verified Google accounts)
- ✅ Better UX
- ✅ Social login trend compliance

## 📈 Analytics Tracking (Optional)

Add tracking to monitor OAuth usage:

```typescript
// When user clicks Google button
analytics.track('oauth_started', { provider: 'google' })

// When OAuth succeeds
analytics.track('oauth_success', {
  provider: 'google',
  is_new_user: isNewUser
})

// When OAuth fails
analytics.track('oauth_failed', {
  provider: 'google',
  error: errorMessage
})
```

## 🚀 Future Enhancements

### Potential Additions

1. **Facebook Login** - Similar OAuth flow
2. **Apple Sign In** - For iOS users
3. **Microsoft Account** - For enterprise users
4. **Link Google to existing account** - Merge accounts
5. **Profile sync** - Auto-update from Google

### Code Structure for Adding More Providers

```typescript
// /MFFE/src/utils/oauth.ts
export const getOAuthUrl = (provider: 'google' | 'facebook' | 'apple') => {
  switch (provider) {
    case 'google':
      return getGoogleAuthUrl()
    case 'facebook':
      return getFacebookAuthUrl()
    case 'apple':
      return getAppleAuthUrl()
  }
}
```

## 📝 Environment Variables Summary

### Development (.env.local)

```bash
VITE_GOOGLE_CLIENT_ID=dev-client-id.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/sign-in
```

### Production (.env.production)

```bash
VITE_GOOGLE_CLIENT_ID=prod-client-id.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=https://elsun.com/auth/sign-in
```

### Backend (application.yml)

```yaml
outbound:
  identity:
    client-id: '${GOOGLE_CLIENT_ID}'
    client-secret: '${GOOGLE_CLIENT_SECRET}'
    redirect-uri: '${GOOGLE_REDIRECT_URI}'
```

## ✅ Checklist

Before deploying to production:

- [ ] Google OAuth credentials obtained
- [ ] Frontend environment variables configured
- [ ] Backend configuration updated
- [ ] Redirect URI registered in Google Console
- [ ] HTTPS enabled for production
- [ ] Tested with real Google account
- [ ] Error handling tested
- [ ] Toast notifications working
- [ ] Redirects working correctly
- [ ] Cookies being set properly
- [ ] User role assignment working
- [ ] Backend OAuth endpoint accessible

## 🎉 Summary

The Google OAuth integration is now complete and ready to use! Users can:

- Sign in with their Google account from the login page
- Register with their Google account from the register page
- Experience seamless authentication without passwords
- Be automatically redirected after successful authentication

All error cases are handled gracefully with user-friendly Vietnamese messages.
