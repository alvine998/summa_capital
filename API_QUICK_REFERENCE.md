# Summa Capital CMS — API Quick Reference

> **Base URL:** `http://localhost:4004`  
> **Content-Type:** `application/json` (except file uploads — use `multipart/form-data`)  
> **Auth header:** `Authorization: Bearer <token>`

---

## Standard Response Shape

All endpoints return the same envelope:

```json
// Success
{ "status": "success", "message": "...", "data": { ... } }

// Paginated list
{
  "status": "success",
  "data": [ ... ],
  "meta": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
}

// Error
{ "status": "error", "message": "..." }
```

**HTTP status codes used:**

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content (DELETE success, no body) |
| 400 | Bad Request / Validation error |
| 401 | Unauthorized (no token / expired) |
| 403 | Forbidden (inactive account / wrong role) |
| 404 | Not Found |
| 409 | Conflict (duplicate email, etc.) |
| 413 | Payload Too Large (> 10 MB) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## Rate Limits

| Scope | Limit |
|-------|-------|
| All routes | 200 req / 15 min per IP |
| `POST /api/auth/login` | 20 req / 15 min per IP |
| `POST /api/auth/forgot-password` | 20 req / 15 min per IP |

---

## 1. Authentication

### Login
```
POST /api/auth/login
```
Body:
```json
{
  "email": "admin@summacapital.com",
  "password": "yourpassword",
  "rememberMe": false
}
```
Response `data`:
```json
{
  "token": "eyJ...",
  "user": { "id": 1, "name": "Admin", "email": "...", "role": "Admin" }
}
```
> Save `token` in your app — pass it as `Authorization: Bearer <token>` on every protected request.  
> Token expires in **7 days** (30 days if `rememberMe: true`).

---

### Logout
```
POST /api/auth/logout
```
Auth required. Returns `{ "status": "success", "message": "Logged out successfully" }`.

---

### Get Current User
```
GET /api/auth/me
```
Auth required. Returns logged-in user object.

---

### Forgot Password
```
POST /api/auth/forgot-password
```
Body: `{ "email": "user@example.com" }`  
Always returns 200 (prevents email enumeration). Sends reset link to email.

---

### Reset Password
```
POST /api/auth/reset-password
```
Body:
```json
{
  "token": "<token-from-email>",
  "password": "newpassword",
  "confirmPassword": "newpassword"
}
```

---

## 2. Office Users

> All user routes require auth. Mounted at `/api/office/users`.

### List Users
```
GET /api/office/users?page=1&limit=10&search=john
```

### Get User
```
GET /api/office/users/:id
```

### Create User
```
POST /api/office/users
```
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "08123456789",
  "role": "Staff",
  "status": "Aktif",
  "joinDate": "2025-01-15"
}
```
`role` enum: `Admin` | `Manager` | `Staff`  
`status` enum: `Aktif` | `Nonaktif`

### Update User
```
PUT /api/office/users/:id
```
Same body as create (all fields optional).

### Delete User
```
DELETE /api/office/users/:id
```
Returns 204.

### Update Role
```
PATCH /api/office/users/:id/role
```
Body: `{ "role": "Manager" }`

### Export Users to Excel
```
GET /api/office/users/export/excel
```
Returns an `.xlsx` file download.

### Import Users from Excel
```
POST /api/office/users/import/excel
Content-Type: multipart/form-data
```
Field: `file` (.xlsx, max 5 MB).  
Response `data`: `{ "created": 5, "failed": 1, "errors": [...] }`

### Download Import Template
```
GET /api/office/users/import/template
```
Returns `.xlsx` template file.

---

## 3. Assets (Auction)

### Public

#### List Assets
```
GET /api/assets?page=1&limit=10&search=tanah&type=Tanah&status=Publish
```
`type` enum: `Tanah` | `Bangunan` | `Kendaraan` | `Mesin` | `Elektronik` | `Perhiasan` | `Seni` | `Furnitur` | `Olahraga` | `Pertanian` | `Peternakan` | `Lainnya`  
`status` enum: `Pending` | `Publish` | `Rejected` | `Active` | `Upcoming` | `Closed`

#### Get Asset Detail
```
GET /api/assets/:id
```

---

### Admin (auth required)

#### List All Assets (admin view)
```
GET /api/office/assets?page=1&limit=10&search=&type=&status=
```

#### Create Asset
```
POST /api/office/assets
Content-Type: multipart/form-data
```
Fields:

| Field | Type | Notes |
|-------|------|-------|
| title | text | required |
| type | text | enum above |
| description | text | |
| openingPrice | number | |
| estimate | number | |
| deadline | text | date ISO |
| status | text | default Pending |
| badge | text | |
| location | text | |
| coordinates | text | e.g. `-6.200,106.816` |
| fieldArea | number | m² |
| buildingArea | number | m² |
| area | number | m² |
| images | file[] | jpeg/png/webp, up to 10 files |

#### Update Asset
```
PUT /api/office/assets/:id
Content-Type: multipart/form-data
```
Same fields as create.

#### Delete Asset
```
DELETE /api/office/assets/:id
```

#### Update Asset Status
```
PATCH /api/office/assets/:id/status
```
Body: `{ "status": "Publish" }`

---

## 4. Early Access

### Public

#### List Early Access
```
GET /api/early-access?page=1&limit=10
```

#### Get Early Access Detail
```
GET /api/early-access/:id
```

#### Register for Early Access
```
POST /api/early-access/:id/register
```
Body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "phone": "08123456789" }
```

---

### Admin (auth required)

#### List (admin view)
```
GET /api/office/early-access?page=1&limit=10
```

#### Create
```
POST /api/office/early-access
Content-Type: multipart/form-data
```
Fields:

| Field | Type |
|-------|------|
| title | text |
| description | text |
| type | text |
| location | text |
| area | number |
| buildingArea | number |
| fieldArea | number |
| estimate | number |
| projectedEstimate | number |
| return | number |
| deadline | text |
| status | text (`Active` \| `Closed`) |
| coordinates | text |
| images | file[] (up to 10) |

#### Update
```
PUT /api/office/early-access/:id
Content-Type: multipart/form-data
```

#### Delete
```
DELETE /api/office/early-access/:id
```

#### List Registrations
```
GET /api/office/early-access/:id/registrations
```

---

## 5. Articles

### Public

#### List Articles
```
GET /api/articles?page=1&limit=10&search=&category=
```
`category` enum: `Berita` | `Edukasi` | `Tips` | `Properti` | `Investasi` | `Umum`

#### Get Article
```
GET /api/articles/:id
```
> Increments `views` counter automatically.

---

### Admin (auth required)

#### List (admin view)
```
GET /api/office/articles?page=1&limit=10&search=&status=
```
`status` enum: `Draft` | `Published`

#### Create
```
POST /api/office/articles
Content-Type: multipart/form-data
```
Fields:

| Field | Type |
|-------|------|
| title | text |
| excerpt | text |
| content | text |
| category | text |
| author | text |
| status | text (Draft \| Published) |
| tags | text |
| readTime | text (e.g. `5 min`) |
| image | file (single, jpeg/png/webp) |

#### Update
```
PUT /api/office/articles/:id
Content-Type: multipart/form-data
```

#### Delete
```
DELETE /api/office/articles/:id
```

#### Toggle Status
```
PATCH /api/office/articles/:id/status
```
Body: `{ "status": "Published" }` — toggles between `Draft` and `Published`.

---

## 6. Gallery

### Public

#### List Gallery
```
GET /api/gallery
```

---

### Admin (auth required)

#### List (admin view)
```
GET /api/office/gallery
```

#### Get Gallery Item
```
GET /api/office/gallery/:id
```

#### Create
```
POST /api/office/gallery
Content-Type: multipart/form-data
```
Fields: `title` (text), `category` (text), `images` (file[], up to 10)

#### Update
```
PUT /api/office/gallery/:id
Content-Type: multipart/form-data
```

#### Delete
```
DELETE /api/office/gallery/:id
```

---

## 7. Messages (Contact Form)

### Public

#### Submit Message
```
POST /api/messages
```
Body:
```json
{
  "name": "Budi",
  "email": "budi@example.com",
  "phone": "08123456789",
  "subject": "Pertanyaan",
  "message": "Saya ingin bertanya..."
}
```
`subject` enum: `Pertanyaan` | `Pengaduan` | `Kerjasama` | `Informasi` | `Lainnya`

---

### Admin (auth required)

#### List Messages
```
GET /api/office/messages?page=1&limit=10
```

#### Get Message
```
GET /api/office/messages/:id
```

#### Delete Message
```
DELETE /api/office/messages/:id
```

---

## 8. Activity Log (Admin)

> All routes require auth.

#### List Logs
```
GET /api/office/activity-log?page=1&limit=20&type=LOGIN&user=Admin&date=today&search=
```
`date` filter: `today` | `week` | `month`

#### Clear All Logs
```
DELETE /api/office/activity-log
```

#### Export Logs
```
GET /api/office/activity-log/export?format=csv
```
`format`: `csv` (default) | `json`

---

## 9. Dashboard (Admin)

> All routes require auth.

#### Summary Stats
```
GET /api/office/dashboard/stats
```
Returns totals: users, assets, articles, messages, etc.

#### Asset Trends
```
GET /api/office/dashboard/asset-trends
```

#### Asset Distribution
```
GET /api/office/dashboard/asset-distribution
```

#### User Growth
```
GET /api/office/dashboard/user-growth
```

---

## 10. Settings (Admin)

> All routes require auth.

### Company Profile

```
GET  /api/office/settings/profile
PUT  /api/office/settings/profile
```
PUT body fields: `name`, `slogan`, `vision`, `mission`, `values`, `ourStory`, `address`, `phone`, `email`, `established`, `yearHistory` (JSON array)

---

### Organization Members

```
GET    /api/office/settings/organization
POST   /api/office/settings/organization          (multipart: name, position, description, photo, order)
PUT    /api/office/settings/organization/:id      (multipart: same fields)
DELETE /api/office/settings/organization/:id
```

---

### Services

```
GET    /api/office/settings/services
POST   /api/office/settings/services              body: { title, description, icon, order }
PUT    /api/office/settings/services/:id
DELETE /api/office/settings/services/:id
```

---

### Know Us

```
GET    /api/office/settings/know-us
POST   /api/office/settings/know-us               body: { title, description, icon, order }
PUT    /api/office/settings/know-us/:id
DELETE /api/office/settings/know-us/:id
```

---

### Benefits

```
GET    /api/office/settings/benefits
POST   /api/office/settings/benefits              body: { title, module, description, icon, order }
PUT    /api/office/settings/benefits/:id
DELETE /api/office/settings/benefits/:id
```
`module` enum: `Home` | `Auction` | `Early Access`

---

## 11. Static Files

Uploaded images are served at:
```
GET /uploads/<folder>/<filename>
```
Example: `http://localhost:4004/uploads/assets/image-123456789.jpg`

---

## 12. Health Check

```
GET /health
```
Response: `{ "status": "ok", "timestamp": "2026-04-29T..." }`

---

## Frontend Usage Tips

### Axios setup (recommended)
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4004/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
```

### Login flow
```js
const { data } = await api.post('/auth/login', { email, password, rememberMe });
localStorage.setItem('token', data.data.token);
```

### File upload (multipart)
```js
const form = new FormData();
form.append('title', 'My Asset');
form.append('images', file1);
form.append('images', file2);

await api.post('/office/assets', form, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

### Paginated list
```js
const { data } = await api.get('/assets', { params: { page: 1, limit: 10, search: 'tanah' } });
// data.data  → array of items
// data.meta  → { page, limit, total, totalPages }
```

---

## Appendix: All Endpoints at a Glance

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | /api/auth/login | No | |
| POST | /api/auth/logout | Yes | |
| GET | /api/auth/me | Yes | |
| POST | /api/auth/forgot-password | No | Rate limited |
| POST | /api/auth/reset-password | No | |
| GET | /api/office/users | Yes | |
| GET | /api/office/users/:id | Yes | |
| POST | /api/office/users | Yes | |
| PUT | /api/office/users/:id | Yes | |
| DELETE | /api/office/users/:id | Yes | |
| PATCH | /api/office/users/:id/role | Yes | |
| GET | /api/office/users/export/excel | Yes | File download |
| POST | /api/office/users/import/excel | Yes | Multipart |
| GET | /api/office/users/import/template | Yes | File download |
| GET | /api/assets | No | |
| GET | /api/assets/:id | No | |
| GET | /api/office/assets | Yes | |
| POST | /api/office/assets | Yes | Multipart |
| PUT | /api/office/assets/:id | Yes | Multipart |
| DELETE | /api/office/assets/:id | Yes | |
| PATCH | /api/office/assets/:id/status | Yes | |
| GET | /api/early-access | No | |
| GET | /api/early-access/:id | No | |
| POST | /api/early-access/:id/register | No | |
| GET | /api/office/early-access | Yes | |
| POST | /api/office/early-access | Yes | Multipart |
| PUT | /api/office/early-access/:id | Yes | Multipart |
| DELETE | /api/office/early-access/:id | Yes | |
| GET | /api/office/early-access/:id/registrations | Yes | |
| GET | /api/articles | No | |
| GET | /api/articles/:id | No | Increments views |
| GET | /api/office/articles | Yes | |
| POST | /api/office/articles | Yes | Multipart |
| PUT | /api/office/articles/:id | Yes | Multipart |
| DELETE | /api/office/articles/:id | Yes | |
| PATCH | /api/office/articles/:id/status | Yes | |
| GET | /api/gallery | No | |
| GET | /api/office/gallery | Yes | |
| GET | /api/office/gallery/:id | Yes | |
| POST | /api/office/gallery | Yes | Multipart |
| PUT | /api/office/gallery/:id | Yes | Multipart |
| DELETE | /api/office/gallery/:id | Yes | |
| POST | /api/messages | No | |
| GET | /api/office/messages | Yes | |
| GET | /api/office/messages/:id | Yes | |
| DELETE | /api/office/messages/:id | Yes | |
| GET | /api/office/activity-log | Yes | |
| DELETE | /api/office/activity-log | Yes | |
| GET | /api/office/activity-log/export | Yes | File download |
| GET | /api/office/dashboard/stats | Yes | |
| GET | /api/office/dashboard/asset-trends | Yes | |
| GET | /api/office/dashboard/asset-distribution | Yes | |
| GET | /api/office/dashboard/user-growth | Yes | |
| GET | /api/office/settings/profile | Yes | |
| PUT | /api/office/settings/profile | Yes | |
| GET | /api/office/settings/organization | Yes | |
| POST | /api/office/settings/organization | Yes | Multipart |
| PUT | /api/office/settings/organization/:id | Yes | Multipart |
| DELETE | /api/office/settings/organization/:id | Yes | |
| GET | /api/office/settings/services | Yes | |
| POST | /api/office/settings/services | Yes | |
| PUT | /api/office/settings/services/:id | Yes | |
| DELETE | /api/office/settings/services/:id | Yes | |
| GET | /api/office/settings/know-us | Yes | |
| POST | /api/office/settings/know-us | Yes | |
| PUT | /api/office/settings/know-us/:id | Yes | |
| DELETE | /api/office/settings/know-us/:id | Yes | |
| GET | /api/office/settings/benefits | Yes | |
| POST | /api/office/settings/benefits | Yes | |
| PUT | /api/office/settings/benefits/:id | Yes | |
| DELETE | /api/office/settings/benefits/:id | Yes | |
| GET | /health | No | |
