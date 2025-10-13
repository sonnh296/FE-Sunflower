# Google OAuth - Malformed Request Fix

## 🐛 Issue

**Error Message:**

```
The server cannot process the request because it is malformed.
It should not be retried.
```

## 🔍 Root Cause

The issue was in how the Google OAuth code was being sent to the backend.

### ❌ Incorrect Implementation (Before)

```typescript
// WRONG: Manually constructing query string in URL
export const googleAuthApi = async (code: string) => {
  return await api.post(`auth/outbound/authentication?code=${code}`)
}
```

**Problems:**

1. Query parameter manually added to URL string
2. No request body specified (undefined)
3. Axios may not properly encode the parameter
4. Content-Type header might be missing or incorrect

## ✅ Fixed Implementation (After)

```typescript
// CORRECT: Using Axios params option
export const googleAuthApi = async (code: string) => {
  return await api.post('auth/outbound/authentication', null, {
    params: { code }
  })
}
```

**Benefits:**

1. ✅ Axios automatically encodes the parameter
2. ✅ Request body explicitly set to `null`
3. ✅ Proper Content-Type header set by Axios
4. ✅ Follows Axios best practices
5. ✅ Matches Spring Boot `@RequestParam` expectation

## 🔧 How It Works

### Backend Expectation

```java
@PostMapping("/outbound/authentication")
ApiResponse<AuthenticationResponse> outboundAuthenticate(
    @RequestParam("code") String code
)
```

Spring Boot's `@RequestParam` expects:

- Query parameter in URL: `?code=xyz123`
- Can work with POST requests
- Automatically extracts from query string

### Frontend Request Structure

**With Axios params option:**

```typescript
axios.post(url, body, config)
       ↓      ↓     ↓
       ↓      ↓     └─ { params: { code: 'xyz123' } }
       ↓      └─ null (no body)
       └─ 'auth/outbound/authentication'

Result: POST /auth/outbound/authentication?code=xyz123
```

**Generated HTTP Request:**

```http
POST /auth/outbound/authentication?code=xyz123 HTTP/1.1
Host: api.elsun.com
Content-Type: application/json
Content-Length: 0
Authorization: Bearer ...

(empty body)
```

## 📊 Before vs After

| Aspect             | Before (❌)                 | After (✅)          |
| ------------------ | --------------------------- | ------------------- |
| URL Construction   | Manual string interpolation | Axios params option |
| Parameter Encoding | May fail on special chars   | Automatic encoding  |
| Request Body       | Undefined                   | Explicitly `null`   |
| Content-Type       | Inconsistent                | Properly set        |
| Error Handling     | Malformed request           | Clean request       |

## 🧪 Testing

### Test the Fix

1. **Click Google Sign-In button**
2. **Authorize with Google**
3. **Check browser network tab:**
   ```http
   POST /auth/outbound/authentication?code=4/0AeaY...xyz HTTP/1.1
   Status: 200 OK
   ```

### Expected Behavior

**Success Response:**

```json
{
  "code": "1000",
  "message": null,
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "authenticated": true
  }
}
```

## 🔍 Debugging Tips

### Check Network Request in Browser DevTools

**Before Fix (Malformed):**

```http
POST /auth/outbound/authentication?code=xyz123
Content-Type: text/plain  ← Wrong!
(or undefined body causing issues)
```

**After Fix (Correct):**

```http
POST /auth/outbound/authentication?code=xyz123
Content-Type: application/json  ← Correct!
Content-Length: 0
(empty body)
```

### Common Signs of Malformed Request

- ❌ 400 Bad Request
- ❌ "Malformed request" error
- ❌ Missing Content-Type header
- ❌ Undefined request body
- ❌ Improperly encoded parameters

## 📚 Axios Best Practices

### Sending Query Parameters with POST

**✅ Correct Ways:**

```typescript
// Method 1: Using params option (BEST)
axios.post(url, null, { params: { key: value } })

// Method 2: Using URLSearchParams
const params = new URLSearchParams({ code: 'xyz' })
axios.post(`${url}?${params}`, null)

// Method 3: Using axios config
axios({
  method: 'post',
  url: url,
  params: { code: 'xyz' },
  data: null
})
```

**❌ Incorrect Ways:**

```typescript
// BAD: Manual string interpolation
axios.post(`${url}?code=${code}`)

// BAD: Undefined body
axios.post(`${url}?code=${code}`, undefined)

// BAD: No encoding
axios.post(`${url}?code=${codeWithSpecialChars}`)
```

## 🚀 Other API Calls to Review

Check if similar pattern exists elsewhere:

```bash
# Search for similar patterns
grep -r "api.post(\`.*\${" src/api/
```

If found, update them to use the params option:

```typescript
// OLD
api.post(`/endpoint?param=${value}`)

// NEW
api.post('/endpoint', null, { params: { param: value } })
```

## ✅ Verification Checklist

After applying the fix:

- [x] Google OAuth API call updated
- [x] Request uses Axios params option
- [x] Request body explicitly set to null
- [x] No TypeScript errors
- [ ] Test login with Google
- [ ] Verify 200 OK response
- [ ] Check user is logged in
- [ ] Verify JWT token received

## 💡 Key Takeaways

1. **Always use Axios params option** for query parameters
2. **Explicitly set body** to `null` for POST requests without data
3. **Let Axios handle encoding** - don't manually build URLs
4. **Follow framework conventions** - match backend expectations
5. **Test with browser DevTools** to verify request structure

## 🎯 Summary

The "malformed request" error was caused by improper construction of the POST request with query parameters. The fix uses Axios's built-in `params` option to properly encode and send the OAuth code, ensuring the backend receives a well-formed request.

**One-line fix:**

```typescript
// FROM: api.post(`url?code=${code}`)
// TO:   api.post('url', null, { params: { code } })
```

This ensures Spring Boot's `@RequestParam` can properly extract the `code` parameter from the query string.
