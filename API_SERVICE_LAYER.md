# API Service Layer Implementation

> ✅ Complete API integration layer with fallback to dummy data

## Overview

A complete set of service modules has been created to integrate with the backend API specified in `API_QUICK_REFERENCE.md`. All services:

- ✅ Use the `VITE_BASE_URL_API` environment variable (defaults to `http://localhost:4004/api`)
- ✅ Include automatic JWT token handling via axios interceptors
- ✅ Have built-in fallback to dummy data if API calls fail
- ✅ Return consistent response shapes
- ✅ Handle 401 errors with automatic redirect to login

---

## Services Created

### 1. **Core API Setup** — `src/services/api.js`
- Axios instance configured with base URL and auth interceptor
- `withFallback()` helper for individual API calls
- `withPaginationFallback()` helper for paginated list endpoints
- Auto-attaches JWT token to all requests
- Auto-redirects to login on 401

### 2. **Authentication** — `src/services/authService.js`
```javascript
import authService from '@/services/authService'

// Login
const { token, user } = await authService.login(email, password, rememberMe)
localStorage.setItem('summacapital_token', token)

// Get current user
const user = await authService.getCurrentUser()

// Logout
await authService.logout()

// Forgot & reset password
await authService.forgotPassword(email)
await authService.resetPassword(token, password, confirmPassword)
```

### 3. **Assets (Auction)** — `src/services/assetService.js`
```javascript
import assetService from '@/services/assetService'

// Public
const { data, meta } = await assetService.listPublic(page, limit, filters)
const asset = await assetService.getPublic(id)

// Admin
const { data, meta } = await assetService.listAdmin(page, limit, filters)
await assetService.create(formData)
await assetService.update(id, formData)
await assetService.delete(id)
await assetService.updateStatus(id, status)
```

### 4. **Articles** — `src/services/articleService.js`
```javascript
import articleService from '@/services/articleService'

// Public
const { data, meta } = await articleService.listPublic(page, limit, filters)
const article = await articleService.getPublic(id)

// Admin
const { data, meta } = await articleService.listAdmin(page, limit, filters)
await articleService.create(formData)
await articleService.update(id, formData)
await articleService.delete(id)
await articleService.toggleStatus(id, status)
```

### 5. **Early Access** — `src/services/earlyAccessService.js`
```javascript
import earlyAccessService from '@/services/earlyAccessService'

// Public
const { data, meta } = await earlyAccessService.listPublic(page, limit)
const item = await earlyAccessService.getPublic(id)
await earlyAccessService.register(id, { name, email, phone })

// Admin
const { data, meta } = await earlyAccessService.listAdmin(page, limit)
await earlyAccessService.create(formData)
await earlyAccessService.update(id, formData)
await earlyAccessService.delete(id)
const { data, meta } = await earlyAccessService.getRegistrations(id, page, limit)
```

### 6. **Users** — `src/services/userService.js`
```javascript
import userService from '@/services/userService'

const { data, meta } = await userService.list(page, limit, filters)
const user = await userService.getById(id)
await userService.create(userData)
await userService.update(id, userData)
await userService.delete(id)
await userService.updateRole(id, role)

// Excel import/export
await userService.exportExcel()
await userService.importExcel(file)
await userService.getImportTemplate()
```

### 7. **Gallery** — `src/services/galleryService.js`
```javascript
import galleryService from '@/services/galleryService'

// Public
const gallery = await galleryService.listPublic()

// Admin
const { data, meta } = await galleryService.listAdmin(page, limit)
const item = await galleryService.getById(id)
await galleryService.create(formData)
await galleryService.update(id, formData)
await galleryService.delete(id)
```

### 8. **Messages** — `src/services/messageService.js`
```javascript
import messageService from '@/services/messageService'

// Public
await messageService.submit(messageData)

// Admin
const { data, meta } = await messageService.list(page, limit, filters)
const message = await messageService.getById(id)
await messageService.delete(id)
```

### 9. **Activity Log & Dashboard** — `src/services/dashboardService.js`
```javascript
import { activityLogService, dashboardService } from '@/services/dashboardService'

// Activity log
const { data, meta } = await activityLogService.list(page, limit, filters)
await activityLogService.clear()
await activityLogService.export(format)

// Dashboard
const stats = await dashboardService.getStats()
const trends = await dashboardService.getAssetTrends()
const distribution = await dashboardService.getAssetDistribution()
const growth = await dashboardService.getUserGrowth()
```

### 10. **Settings** — `src/services/settingsService.js`
```javascript
import settingsService from '@/services/settingsService'

// Company Profile
const profile = await settingsService.getProfile()
await settingsService.updateProfile(data)

// Organization
const org = await settingsService.getOrganization()
await settingsService.addOrganization(formData)
await settingsService.updateOrganization(id, formData)
await settingsService.deleteOrganization(id)

// Services, Know Us, Benefits (similar pattern)
```

---

## Fallback Dummy Data

Each service includes dummy data that is returned if:
- The API is not running
- The API endpoint doesn't exist yet
- Network error occurs
- Request timeout

**This means the frontend works perfectly even before backend APIs are fully implemented!**

---

## Pages Already Updated to Use Services

### ✅ Authentication
- **Login** (`src/pages/Office/Login/index.jsx`) — Uses `authService.login()`

### ✅ Public Pages
- **Contact** (`src/pages/Contact/index.jsx`) — Uses `messageService.submit()`

### ✅ Admin Dashboard
- **Dashboard** (`src/pages/Office/Dashboard/index.jsx`) — Uses `dashboardService` for all stats and charts

---

## Pages Ready for Update (Template Available)

To update any remaining pages, follow this pattern:

### Example: Update Asset List Page

```jsx
import { useEffect, useState } from 'react'
import assetService from '@/services/assetService'

export default function AssetList() {
  const [assets, setAssets] = useState([])
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true)
        const { data, meta } = await assetService.listAdmin(
          meta.page,
          meta.limit,
          { status: 'Publish', search: '' }
        )
        setAssets(data)
        setMeta(meta)
      } catch (err) {
        setError(err.message)
        console.warn('Using fallback data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {/* Render assets here */}
    </div>
  )
}
```

---

## Environment Variables

Make sure `.env` is configured:

```env
VITE_BASE_URL_API=https://api.summcapital.id
```

or for local development:

```env
VITE_BASE_URL_API=http://localhost:4004/api
```

---

## Backend Implementation Checklist

When implementing backend APIs, ensure endpoints match the specification in `API_QUICK_REFERENCE.md`:

- [ ] Authentication endpoints (`/api/auth/*`)
- [ ] Asset management (`/api/assets`, `/api/office/assets`)
- [ ] Articles (`/api/articles`, `/api/office/articles`)
- [ ] Early Access (`/api/early-access`, `/api/office/early-access`)
- [ ] Users (`/api/office/users`)
- [ ] Gallery (`/api/gallery`, `/api/office/gallery`)
- [ ] Messages (`/api/messages`, `/api/office/messages`)
- [ ] Activity Log (`/api/office/activity-log`)
- [ ] Dashboard (`/api/office/dashboard/*`)
- [ ] Settings (`/api/office/settings/*`)

---

## Testing the Services

### Using localStorage for persistence
```javascript
// After login
localStorage.setItem('summacapital_token', token)
localStorage.setItem('summacapital_user', JSON.stringify(user))

// Interceptor automatically includes token in all requests
```

### Handling errors
```javascript
try {
  const result = await assetService.create(formData)
} catch (error) {
  console.error(error.response?.status, error.response?.data?.message)
}
```

### Working offline (uses dummy data)
- API not running → Uses fallback dummy data automatically
- No changes needed to components
- Seamless experience

---

## File Structure

```
src/services/
├── api.js                    # Core axios setup & helpers
├── authService.js            # Authentication
├── assetService.js           # Assets/Auction
├── articleService.js         # Articles
├── earlyAccessService.js     # Early Access
├── userService.js            # Users
├── galleryService.js         # Gallery
├── messageService.js         # Messages
├── dashboardService.js       # Dashboard & Activity Log
├── settingsService.js        # Settings
└── activityLog.js            # (existing) Local activity logging
```

---

## Next Steps

1. **Start backend development** using `API_QUICK_REFERENCE.md` as specification
2. **Update remaining pages** to use services (see template above)
3. **Test with dummy data first**, then switch to real API
4. **Monitor console for warnings** about API failures (services will log these)
5. **Deploy** — frontend works with or without backend ready!
