// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-client-id-here'
export const GOOGLE_REDIRECT_URI =
  import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/sign-in'

// Google OAuth Authorization URL
export const getGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }

  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

// Handle Google OAuth Login
export const handleGoogleLogin = () => {
  window.location.href = getGoogleAuthUrl()
}
