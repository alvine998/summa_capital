# Backend API Requirements — Summa Capital CMS

> This document collects all data models, endpoints, and business rules required for backend API development, derived from the existing frontend source code.

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Assets (Auction / Asset Bid)](#2-assets-auction--asset-bid)
3. [Early Access](#3-early-access)
4. [Articles](#4-articles)
5. [Users (CMS Admin Users)](#5-users-cms-admin-users)
6. [Gallery](#6-gallery)
7. [Messages (Contact Form)](#7-messages-contact-form)
8. [Activity Log](#8-activity-log)
9. [Settings / Company Profile](#9-settings--company-profile)
10. [Dashboard Stats](#10-dashboard-stats)
11. [Early Access Registration (Public)](#11-early-access-registration-public)

---

## 1. Authentication

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Login with email & password |
| `POST` | `/auth/logout` | Invalidate session/token |
| `POST` | `/auth/forgot-password` | Send password reset link to email |
| `POST` | `/auth/reset-password` | Reset password using token from email |
| `GET`  | `/auth/me` | Get current authenticated user profile |

### Request — Login

```json
{
  "email": "admin@summacapital.id",
  "password": "string",
  "rememberMe": false
}
```

### Response — Login

```json
{
  "token": "jwt-token-string",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@summacapital.id",
    "role": "Admin"
  }
}
```

### Request — Forgot Password

```json
{
  "email": "admin@summacapital.id"
}
```

### Request — Reset Password

```json
{
  "token": "reset-token-from-email",
  "password": "newpassword",
  "confirmPassword": "newpassword"
}
```

### Notes

- JWT-based authentication.
- Token stored client-side under key `summacapital_token`.
- User data stored under key `summacapital_user`.
- All `/office/*` routes (except login, forgot-password, reset-password) require a valid token.

---

## 2. Assets (Auction / Asset Bid)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/assets` | List all assets (public) |
| `GET`    | `/assets/:id` | Get single asset detail (public) |
| `GET`    | `/office/assets` | List all assets with full detail (admin) |
| `POST`   | `/office/assets` | Create new asset |
| `PUT`    | `/office/assets/:id` | Update asset |
| `DELETE` | `/office/assets/:id` | Delete asset |
| `PATCH`  | `/office/assets/:id/status` | Update asset status only |

### Data Model — Asset

```json
{
  "id": 1,
  "title": "Commercial Building South Jakarta",
  "type": "Commercial Property",
  "description": "A prime commercial building in the heart of South Jakarta...",
  "openingPrice": "IDR 15,000,000,000",
  "estimate": "IDR 18,000,000,000",
  "deadline": "2026-05-30",
  "status": "Active",
  "badge": "Popular",
  "location": "South Jakarta",
  "coordinates": "-6.2971,106.7904",
  "fieldArea": "5500",
  "buildingArea": "8200",
  "area": "5500",
  "images": [
    "https://storage.example.com/assets/image1.jpg",
    "https://storage.example.com/assets/image2.jpg"
  ],
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-25T00:00:00.000Z"
}
```

### Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Min 1 char |
| `type` | enum | Yes | See Asset Types below |
| `description` | string | No | Long text |
| `openingPrice` | string | No | e.g. `IDR 15,000,000,000` |
| `estimate` | string | Yes | Formatted with thousand separators |
| `deadline` | date | Yes | ISO date string |
| `status` | enum | Yes | See Asset Statuses below |
| `badge` | string | No | e.g. `Popular`, `New`, `Premium` |
| `location` | string | Yes | Human-readable location |
| `coordinates` | string | No | `lat,lng` format |
| `fieldArea` | string | No | In m² |
| `buildingArea` | string | No | In m² |
| `area` | string | No | General area in m² |
| `images` | string[] | No | Upload via multipart; max 10 files, 10 MB each |

### Enums

**Asset Types:** `Land`, `Building`, `Apartment`, `Shop`, `Villa`, `Commercial Property`, `Industrial Land`, `Retail Property`, `Residential Property`, `Hospitality Property`, `Industrial Property`, `Other`

**Asset Statuses (admin):** `Pending`, `Publish`, `Rejected`

**Asset Statuses (public):** `Active`, `Upcoming`, `Closed`

### Image Upload

- Multipart form data.
- Max **10 images** per asset.
- Max file size: **10 MB** per image.
- Accepted formats: `image/png`, `image/jpeg`, `image/webp`.

---

## 3. Early Access

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/early-access` | List all early access items (public) |
| `GET`    | `/early-access/:id` | Get single early access item (public) |
| `GET`    | `/office/early-access` | List all items (admin) |
| `POST`   | `/office/early-access` | Create new item |
| `PUT`    | `/office/early-access/:id` | Update item |
| `DELETE` | `/office/early-access/:id` | Delete item |

### Data Model — Early Access

```json
{
  "id": 1,
  "title": "Premium Land in Pondok Indah",
  "description": "Detailed description of the property...",
  "type": "Residential Property",
  "location": "South Jakarta",
  "area": "5600",
  "buildingArea": "4200",
  "fieldArea": "1400",
  "estimate": "IDR 95,000,000,000",
  "projectedEstimate": "IDR 108,000,000,000",
  "return": "14–18% p.a.",
  "deadline": "2026-06-15",
  "status": "Active",
  "coordinates": "-6.2383,106.9756",
  "images": [
    "https://storage.example.com/ea/image1.jpg"
  ],
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-25T00:00:00.000Z"
}
```

### Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | |
| `description` | string | No | |
| `location` | string | Yes | |
| `area` | string | No | m² |
| `buildingArea` | string | No | m² |
| `fieldArea` | string | No | m² |
| `estimate` | string | Yes | Formatted price |
| `projectedEstimate` | string | No | Projected value |
| `return` | string | No | e.g. `14–18% p.a.` |
| `deadline` | date | Yes | ISO date; must be future date |
| `status` | enum | Yes | `Active`, `Closed` |
| `coordinates` | string | No | `lat,lng` |
| `images` | string[] | No | Multiple allowed |

### Image Upload

- Multipart form data.
- Multiple images allowed.
- Accepted formats: `image/png`, `image/jpeg`, `image/webp`.

---

## 4. Articles

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/articles` | List all published articles (public) |
| `GET`    | `/articles/:id` | Get single article (public) |
| `GET`    | `/office/articles` | List all articles including drafts (admin) |
| `POST`   | `/office/articles` | Create article |
| `PUT`    | `/office/articles/:id` | Update article |
| `DELETE` | `/office/articles/:id` | Delete article |
| `PATCH`  | `/office/articles/:id/status` | Toggle `Draft` ↔ `Published` |

### Data Model — Article

```json
{
  "id": 1,
  "title": "Investment Strategy for Real Estate Assets in the Digital Era",
  "excerpt": "Brief summary of the article...",
  "content": "<p>Full HTML content from rich text editor...</p>",
  "category": "Investment",
  "author": "Summa Capital",
  "status": "Published",
  "tags": "investment, property, digital",
  "readTime": "5 min read",
  "views": 245,
  "image": "https://storage.example.com/articles/cover.jpg",
  "createdAt": "2026-04-25T00:00:00.000Z",
  "updatedAt": "2026-04-25T00:00:00.000Z"
}
```

### Field Definitions

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `title` | string | Yes | Min 5 chars, max 200 chars |
| `excerpt` | string | Yes | Min 20 chars, max 500 chars |
| `content` | string | Yes | HTML from Quill editor; min 50 chars (excluding HTML) |
| `category` | enum | Yes | See Categories below |
| `author` | string | Yes | |
| `status` | enum | Yes | `Draft`, `Published` |
| `tags` | string | No | Comma-separated |
| `image` | file | No | Cover image for listing |
| `views` | integer | Auto | Increment on each public read |

### Categories

`Investment`, `Auction`, `Strategy`, `Market Analysis`, `Risk Management`, `Property Valuation`

---

## 5. Users (CMS Admin Users)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/office/users` | List all CMS users |
| `GET`    | `/office/users/:id` | Get single user |
| `POST`   | `/office/users` | Create user |
| `PUT`    | `/office/users/:id` | Update user |
| `DELETE` | `/office/users/:id` | Delete user |
| `PATCH`  | `/office/users/:id/role` | Update user role |

### Data Model — User

```json
{
  "id": 1,
  "name": "Alvin Reyoga",
  "email": "alvin@summacapital.co.id",
  "phone": "+62 813 2298 6243",
  "role": "Admin",
  "status": "Aktif",
  "joinDate": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-04-25T00:00:00.000Z"
}
```

### Request — Create User

```json
{
  "name": "John Doe",
  "email": "john@summacapital.co.id",
  "phone": "+62 812 3456 7890",
  "role": "Staff",
  "status": "Aktif",
  "password": "securepassword"
}
```

### Field Definitions

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | |
| `email` | string | Yes | Valid email format; unique |
| `phone` | string | Yes | |
| `role` | enum | Yes | `Admin`, `Manager`, `Staff` |
| `status` | enum | Yes | `Aktif`, `Nonaktif` |
| `password` | string | Yes (create) | Min 6 chars; hashed server-side; never returned in response |

---

## 6. Gallery

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/gallery` | List all gallery items (public) |
| `GET`    | `/office/gallery` | List all gallery items (admin) |
| `GET`    | `/office/gallery/:id` | Get single gallery item |
| `POST`   | `/office/gallery` | Create gallery item |
| `PUT`    | `/office/gallery/:id` | Update gallery item |
| `DELETE` | `/office/gallery/:id` | Delete gallery item |

### Data Model — Gallery

```json
{
  "id": 1,
  "title": "Head Office",
  "category": "Office",
  "images": [
    "https://storage.example.com/gallery/img1.jpg",
    "https://storage.example.com/gallery/img2.jpg"
  ],
  "totalSize": 2.5,
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-25T00:00:00.000Z"
}
```

### Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | |
| `category` | string | Yes | Free text; common values: `Office`, `Interior`, `Architecture`, `Facilities`, `Landscape` |
| `images` | file[] | Yes | Min 1 image required |

### Image Upload

- Multipart form data.
- Max **10 images** per gallery item.
- Total size limit: **25 MB** per gallery item.
- Accepted formats: `image/png`, `image/jpeg`, `image/webp`.

---

## 7. Messages (Contact Form)

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST`   | `/messages` | Submit contact form (public) |
| `GET`    | `/office/messages` | List all messages (admin) |
| `GET`    | `/office/messages/:id` | View message detail (admin) |
| `DELETE` | `/office/messages/:id` | Delete message (admin) |

### Data Model — Message

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62 812 3456 7890",
  "subject": "Investment Consultation",
  "message": "I would like to learn more about your early access program...",
  "timestamp": "2026-04-28T10:30:00.000Z"
}
```

### Request — Submit Contact Form (Public)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62 812 3456 7890",
  "subject": "Investment Consultation",
  "message": "Message body text..."
}
```

### Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | |
| `email` | string | Yes | Valid email format |
| `phone` | string | No | |
| `subject` | enum | Yes | See Subjects below |
| `message` | string | Yes | |

### Subject Options

`Investment Consultation`, `Auction Information`, `Early Access Program`, `Partnership`, `Other`

---

## 8. Activity Log

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/office/activity-log` | List all activity logs with filter/search |
| `DELETE` | `/office/activity-log` | Clear all logs |
| `GET`    | `/office/activity-log/export` | Export log as CSV/JSON |

### Data Model — Activity Log Entry

```json
{
  "id": 1745820000000,
  "type": "CREATE_ASSET",
  "label": "Created asset",
  "user": "admin",
  "userId": 1,
  "timestamp": "2026-04-28T10:00:00.000Z",
  "ipAddress": "203.0.113.5",
  "details": {
    "assetTitle": "Commercial Building Jakarta",
    "assetType": "Commercial Property",
    "assetLocation": "South Jakarta",
    "assetEstimate": "IDR 18,000,000,000"
  }
}
```

### Query Parameters — GET `/office/activity-log`

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Search across label, user, and details |
| `type` | string | Filter by activity type |
| `user` | string | Filter by user name |
| `date` | string | `today`, `week`, `month`, `all` |

### Activity Types

| Type | Description |
|------|-------------|
| `LOGIN` | User logged in |
| `LOGOUT` | User logged out |
| `CREATE_ASSET` | Asset created |
| `UPDATE_ASSET` | Asset updated |
| `DELETE_ASSET` | Asset deleted |
| `PUBLISH_ASSET` | Asset published |
| `ARCHIVE_ASSET` | Asset archived |
| `CREATE_EARLY_ACCESS` | Early access item created |
| `UPDATE_EARLY_ACCESS` | Early access item updated |
| `DELETE_EARLY_ACCESS` | Early access item deleted |
| `CREATE_USER` | User account created |
| `UPDATE_USER` | User account updated |
| `DELETE_USER` | User account deleted |
| `UPDATE_USER_ROLE` | User role changed |
| `UPLOAD_GALLERY` | Gallery image uploaded |
| `DELETE_GALLERY` | Gallery image deleted |
| `UPDATE_SETTINGS` | Company settings updated |
| `DELETE_MESSAGE` | Contact message deleted |
| `VIEW_MESSAGE` | Contact message viewed |
| `CREATE_ARTICLE` | Article created |
| `UPDATE_ARTICLE` | Article updated |
| `DELETE_ARTICLE` | Article deleted |

---

## 9. Settings / Company Profile

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/office/settings/profile` | Get company profile |
| `PUT`  | `/office/settings/profile` | Update company profile |
| `GET`  | `/office/settings/organization` | List organization members |
| `POST` | `/office/settings/organization` | Add organization member |
| `PUT`  | `/office/settings/organization/:id` | Update organization member |
| `DELETE` | `/office/settings/organization/:id` | Remove organization member |
| `GET`  | `/office/settings/services` | List company services |
| `POST` | `/office/settings/services` | Add service |
| `PUT`  | `/office/settings/services/:id` | Update service |
| `DELETE` | `/office/settings/services/:id` | Remove service |
| `GET`  | `/office/settings/know-us` | List "How did you know us" channels |
| `POST` | `/office/settings/know-us` | Add channel |
| `PUT`  | `/office/settings/know-us/:id` | Update channel |
| `DELETE` | `/office/settings/know-us/:id` | Remove channel |
| `GET`  | `/office/settings/benefits` | List program benefits |
| `POST` | `/office/settings/benefits` | Add benefit |
| `PUT`  | `/office/settings/benefits/:id` | Update benefit |
| `DELETE` | `/office/settings/benefits/:id` | Remove benefit |

### Data Model — Company Profile

```json
{
  "name": "Summa Capital",
  "slogan": "Your Trusted Asset Partner",
  "vision": "...",
  "mission": "...",
  "values": "...",
  "ourStory": "Trusted asset management company with more than 15 years of experience",
  "address": "Jl. Mega Kuningan Barat No.3 5, Jakarta Selatan",
  "phone": "+62 813 2298 6243",
  "email": "info@summacapital.id",
  "established": "2009",
  "yearHistory": [
    { "id": 1, "year": "2009", "description": "Summa Capital was founded" },
    { "id": 2, "year": "2012", "description": "Registered as official Investment Manager" }
  ]
}
```

### Data Model — Organization Member

```json
{
  "id": 1,
  "name": "Ikna Abdul Kholik",
  "position": "CEO",
  "description": "Founder and CEO with 18+ years of experience.",
  "photo": "https://storage.example.com/org/ceo.jpg"
}
```

### Data Model — Service

```json
{
  "id": 1,
  "title": "Asset Management",
  "description": "Professional management of your valuable assets",
  "icon": "💼"
}
```

### Data Model — Know Us Channel

```json
{
  "id": 1,
  "title": "Social Media",
  "description": "Follow us on Instagram, LinkedIn, and more",
  "icon": "📱"
}
```

### Data Model — Benefit

```json
{
  "id": 1,
  "title": "Pre-Market Access",
  "module": "Early Access",
  "description": "Get information on selected assets before they open to the general public.",
  "icon": "🔐"
}
```

**Module options:** `Home`, `Auction`, `Early Access`

---

## 10. Dashboard Stats

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/office/dashboard/stats` | Summary stats for top cards |
| `GET` | `/office/dashboard/asset-trends` | Monthly asset count (line chart) |
| `GET` | `/office/dashboard/asset-distribution` | Asset count by status (donut chart) |
| `GET` | `/office/dashboard/user-growth` | Monthly new users (bar chart) |

### Response — Stats

```json
{
  "activeAssets": 6,
  "registeredUsers": 234,
  "totalAUM": "Rp 2T+",
  "newMessages": 12
}
```

### Response — Asset Trends

```json
{
  "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "data": [3, 4, 5, 5, 6, 6]
}
```

### Response — Asset Distribution

```json
{
  "labels": ["Available", "Auction", "Early Access", "Sold"],
  "data": [45, 30, 15, 10]
}
```

### Response — User Growth

```json
{
  "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "data": [25, 35, 42, 50, 60, 75]
}
```

---

## 11. Early Access Registration (Public)

### Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/early-access/:id/register` | Submit interest registration for an Early Access item |
| `GET`  | `/office/early-access/:id/registrations` | List all registrations for an item (admin) |

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+62 812 3456 7890"
}
```

### Field Definitions

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `email` | string | Yes |
| `phone` | string | Yes |

---

## General Notes

### Authentication

- All `/office/*` API routes require `Authorization: Bearer <token>` header.
- Public routes (`/articles`, `/assets`, `/gallery`, `/early-access`, `/messages POST`) do not require authentication.

### Pagination

Recommended for all list endpoints:

```
GET /office/assets?page=1&limit=20
```

Response should include:

```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

### File Storage

- All uploaded images should be stored in a cloud storage bucket (e.g., AWS S3, Cloudflare R2, Supabase Storage).
- API should return public URLs for stored files.
- Deletion of a record should also delete associated images from storage.

### Error Responses

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}
```

### Timestamps

- All records should include `createdAt` and `updatedAt` timestamps in ISO 8601 format.
- Activity log entries use a `timestamp` field.

### CORS

- Allow requests from the frontend domain.
- Required headers: `Content-Type`, `Authorization`.
