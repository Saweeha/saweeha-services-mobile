# API Documentation

**Saweeha Services Backend - Frontend API Reference**

**Version:** 3.0  
**Base URL:** `http://localhost:3000/api` (or your production URL)  
**Content-Type:** `application/json`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Base URL & Headers](#base-url--headers)
3. [Response Format](#response-format)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Authentication Endpoints](#authentication-endpoints)
7. [User Management Endpoints](#user-management-endpoints)
8. [Business Endpoints](#business-endpoints)
9. [Branch Endpoints](#branch-endpoints)
10. [Category Endpoints](#category-endpoints)
11. [Service Endpoints](#service-endpoints)
12. [Professional Endpoints](#professional-endpoints)
13. [Booking Endpoints](#booking-endpoints)
14. [Health Check](#health-check)

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Types

- **Access Token:** Short-lived (7 days), used for API requests
- **Refresh Token:** Long-lived (30 days), used to get new access tokens

### Authentication Flow

1. **Register** → User is created with `is_verified = false` and receives an email verification code (no tokens yet).
2. **Verify Email** → `POST /api/auth/verify-email` marks the user as verified and returns `token` and `refreshToken`.
3. **Login** → Verified users (or `super_admin`) can log in with email/password and receive a new token pair. If a non-verified, non‑super‑admin user attempts to log in, the system **automatically re-sends a registration verification code** and responds with an error asking them to verify their email.
4. **Store tokens** in secure storage (localStorage, secure cookies, etc.)
5. **Include token** in all protected requests
6. **Refresh token** when access token expires (use `/api/auth/refresh`)

---

## Base URL & Headers

### Base URL
```
http://localhost:3000/api
```

### Required Headers
```javascript
{
  "Content-Type": "application/json",  // For JSON requests
  "Authorization": "Bearer <access_token>"  // For protected routes
}
```

**Note:** For endpoints that support image uploads (user profile picture, business logo), use `Content-Type: multipart/form-data` instead of `application/json`. The server automatically handles both formats.

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Error message",
  "errors": ["Additional error details"]  // Optional, for validation errors
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

## Error Handling

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | No token provided |
| `INVALID_TOKEN` | Invalid token format |
| `TOKEN_EXPIRED` | Token has expired |
| `INVALID_CREDENTIALS` | Wrong email/password |
| `FORBIDDEN` | Access denied |
| `INSUFFICIENT_PERMISSIONS` | User lacks required role |
| `VALIDATION_ERROR` | Input validation failed |
| `NOT_FOUND` | Resource not found |
| `EMAIL_ALREADY_EXISTS` | Email already registered |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

### Example Error Handling

```javascript
try {
  const response = await fetch('/api/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired, refresh it
      await refreshToken();
    } else {
      throw new Error(data.message || 'Request failed');
    }
  }
  
  return data;
} catch (error) {
  console.error('API Error:', error);
  throw error;
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Authentication (login, register) | 5 requests | 15 minutes |
| Password Reset | 3 requests | 15 minutes |
| Code Resend | 3 requests | 10 minutes |
| General API | 100 requests | 1 minute |

When rate limit is exceeded, you'll receive:
- **Status Code:** `429`
- **Response:**
```json
{
  "success": false,
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again after X seconds."
}
```

---

## Authentication Endpoints

### Register

**POST** `/api/auth/register`

Register a new user account. To create a business, use the `/api/business` endpoint after registration.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification code.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "user_type": "user",
      "is_verified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "reactivated": false,              // true if an existing unverified user was reactivated
    "hasPendingInvitations": false,    // true if user had pending business invitations
    "requiresEmailVerification": true  // always true after registration
  }
}
```

**Note:** 
- The `token` and `refreshToken` are returned immediately upon registration for seamless authentication.
- User must still verify their email before accessing business features (except `super_admin`).
- If the user had pending business invitations, they will be automatically associated with those businesses upon email verification.

---

### Verify Email

**POST** `/api/auth/verify-email`

Verify email with code sent during registration.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

---

### Login

**POST** `/api/auth/login`

**Rate Limit:** 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

**Note:** Unverified accounts are treated as non-existent and will receive a generic "Invalid email or password" error.

---

### Logout

**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Note:** Client should delete tokens from storage.

---

### Refresh Token

**POST** `/api/auth/refresh`

Get new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "...",
    "refreshToken": "..."
  }
}
```

---

### Change Password

**POST** `/api/auth/change-password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "current_password": "oldPassword123",
  "new_password": "newPassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Forgot Password

**POST** `/api/auth/forgot-password`

**Rate Limit:** 3 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset code sent to your email"
}
```

---

### Reset Password

**POST** `/api/auth/reset-password`

**Rate Limit:** 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456",
  "new_password": "newPassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### Resend Code

**POST** `/api/auth/resend-code`

**Rate Limit:** 3 requests per 10 minutes per IP

**Request Body:**
```json
{
  "email": "john@example.com",
  "type": "registration"  // or "password_reset"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Verification code sent to your email"
}
```

---

### Get Current User

**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "user_type": "user",
      "businesses": [
        {
          "id": 1,
          "business_id": 10,
          "business_name": "My Business",
          "role": "business_admin",
          "is_active": true
        }
      ]
    }
  }
}
```

---

### Invite Business User

**POST** `/api/auth/business-users`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Description:** Sends an invitation email to a user to join the business. The user will receive an email with an invitation link. If they already have an account, they can accept the invitation. If not, they can sign up and will automatically join the business.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567891",  // Optional
  "role": "branch_employee",  // business_admin, branch_admin, branch_employee
  "branchId": 5,  // Optional, required for branch_admin and branch_employee
  "businessId": 10  // Optional, super_admin only
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Invitation sent successfully",
  "data": {
    "invitation": {
      "id": 1,
      "email": "jane@example.com",
      "name": "Jane Doe",
      "business_id": 10,
      "role": "branch_employee",
      "branch_id": 5,
      "token": "abc123def456...",
      "expires_at": "2024-01-08T12:00:00.000Z",
      "is_accepted": false
    }
  }
}
```

---

### Accept Business Invitation

**POST** `/api/auth/accept-invitation`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Authenticated users

**Description:** Accepts a business invitation for an existing user. The invitation token is typically provided via the invitation email link.

**Request Body:**
```json
{
  "token": "abc123def456..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Invitation accepted successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+1234567891",
      "user_type": "user",
      "businesses": [
        {
          "id": 1,
          "business_id": 10,
          "business_name": "My Business",
          "role": "branch_employee",
          "is_active": true
        }
      ]
    }
  }
}
```

---

## User Management Endpoints

### List Users

**GET** `/api/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20, max: 100) - Items per page

**Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "role": "business_admin",
        "is_active": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

---

### Get User by ID

**GET** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": { ... }
  }
}
```

---

### Update User

**PUT** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data  // Required when uploading image, otherwise application/json
```

**Access:** All authenticated users (for self) or Business Admin, Branch Admin, Super Admin (for others)

**Request Body (JSON for text-only updates):**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",  // Optional
  "phone": "+1234567890",  // Optional
  "date_of_birth": "1990-01-01",  // Optional, format: YYYY-MM-DD
  "gender": "male"  // Optional, male or female
}
```

**Request Body (multipart/form-data for updates with image):**
```
name: "John Updated"  // Optional
email: "john.updated@example.com"  // Optional
phone: "+1234567890"  // Optional
date_of_birth: "1990-01-01"  // Optional, format: YYYY-MM-DD
gender: "male"  // Optional, male or female
image: [file]  // Optional - Profile picture (JPEG/PNG/WebP, max 5MB)
```

**Image Upload:**
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB
- The image is automatically processed into original and thumbnail versions
- Old profile picture is automatically deleted when a new one is uploaded
- Image upload is optional - you can update text fields without uploading an image

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Updated",
      "email": "john.updated@example.com",
      "phone": "+1234567890",
      "profile_picture_url": "https://bucket.s3.region.amazonaws.com/users/1/original.jpg",
      "profile_picture_thumbnail_url": "https://bucket.s3.region.amazonaws.com/users/1/thumbnail.jpg",
      ...
    }
  }
}
```

---

### Update User Role

**PATCH** `/api/users/:id/role`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "role": "branch_admin"  // business_admin, branch_admin, branch_employee
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "user": { ... }
  }
}
```

---

### Update User Status

**PATCH** `/api/users/:id/status`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "is_active": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User status updated successfully",
  "data": {
    "user": { ... }
  }
}
```

---

### Update User Branch

**PATCH** `/api/users/:id/branch`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "branchId": 5
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User branch updated successfully",
  "data": {
    "user": { ... }
  }
}
```

---

### Delete User

**DELETE** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "user": { ... }
  }
}
```

**Note:** Soft delete (sets `is_active = false`).

---

## Business Endpoints

### Create Business

**POST** `/api/business`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Authenticated users

**Request Body:**
```json
{
  "name": "My New Business"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Business created successfully",
  "data": {
    "id": 1,
    "name": "My New Business",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Note:** 
- Creates a business and associates the authenticated user as `business_admin`
- If the user's email is already verified (has active business associations), the new business association is immediately active
- If the user's email is not verified yet, the business association will be activated upon email verification

---

### Get Current Business

**GET** `/api/business`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business retrieved successfully",
  "data": {
    "business": {
      "id": 10,
      "name": "My Business",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### Update Business

**PUT** `/api/business`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data  // Required when uploading logo, otherwise application/json
```

**Access:** Business Admin, Super Admin

**Request Body (JSON for text-only updates):**
```json
{
  "name": "Updated Business Name"
}
```

**Request Body (multipart/form-data for updates with logo):**
```
name: "Updated Business Name"  // Optional
image: [file]  // Optional - Business logo (JPEG/PNG/WebP, max 5MB)
```

**Logo Upload:**
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB
- The logo is automatically processed into original and thumbnail versions
- Old logo is automatically deleted when a new one is uploaded
- Logo upload is optional - you can update business name without uploading a logo
- For super_admin: can specify `id` in body to update a specific business

**Response (200):**
```json
{
  "success": true,
  "message": "Business updated successfully",
  "data": {
    "business": {
      "id": 1,
      "name": "Updated Business Name",
      "logo_url": "https://bucket.s3.region.amazonaws.com/businesses/1/original.jpg",
      "logo_thumbnail_url": "https://bucket.s3.region.amazonaws.com/businesses/1/thumbnail.jpg",
      ...
    }
  }
}
```

---

### Delete Business

**DELETE** `/api/business`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business deleted successfully",
  "data": {
    "business": { ... }
  }
}
```

**Note:** Soft delete (sets `is_active = false`).

---

### Deactivate Business

**PATCH** `/api/business/deactivate`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business deactivated successfully",
  "data": {
    "business": { ... }
  }
}
```

---

### Get Business Hours

**GET** `/api/business/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours retrieved successfully",
  "data": {
    "business_hours": {
      "id": 1,
      "business_id": 10,
      "weekly_template": {
        "1": {"start": "09:00", "end": "17:00"},  // Monday
        "2": {"start": "09:00", "end": "17:00"},  // Tuesday
        "3": {"start": "09:00", "end": "17:00"},  // Wednesday
        "4": {"start": "09:00", "end": "17:00"},  // Thursday
        "5": {"start": "09:00", "end": "17:00"},  // Friday
        "6": null,  // Saturday closed
        "7": null   // Sunday closed
      },
      "slot_interval_minutes": 30
    }
  }
}
```

---

### Create/Update Business Hours

**PUT** `/api/business/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "weekly_template": {
    "1": {"start": "09:00", "end": "17:00"},
    "2": {"start": "09:00", "end": "17:00"},
    "3": {"start": "09:00", "end": "17:00"},
    "4": {"start": "09:00", "end": "17:00"},
    "5": {"start": "09:00", "end": "17:00"},
    "6": null,
    "7": null
  },
  "slot_interval_minutes": 30,  // Optional, default: 30
  "businessId": 10  // Optional, super_admin only
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours updated successfully",
  "data": {
    "business_hours": { ... }
  }
}
```

---

### Delete Business Hours

**DELETE** `/api/business/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours deleted successfully"
}
```

---

### Get Business Hours Exceptions

**GET** `/api/business/hours/exceptions`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `id` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours exceptions retrieved successfully",
  "data": {
    "exceptions": [
      {
        "id": 1,
        "business_id": 10,
        "date": "2024-12-25",
        "is_closed": true,
        "start_time": null,
        "end_time": null,
        "reason": "Christmas Day"
      }
    ]
  }
}
```

---

### Create Business Hours Exception

**POST** `/api/business/hours/exceptions`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "date": "2024-12-25",  // YYYY-MM-DD
  "is_closed": true,
  "start_time": null,  // Optional, HH:MM or HH:MM:SS
  "end_time": null,    // Optional, HH:MM or HH:MM:SS
  "reason": "Christmas Day",  // Optional
  "businessId": 10  // Optional, super_admin only
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Business hours exception created successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Get Business Hours Exception by ID

**GET** `/api/business/hours/exceptions/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours exception retrieved successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Update Business Hours Exception

**PUT** `/api/business/hours/exceptions/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "date": "2024-12-25",  // Optional
  "is_closed": false,    // Optional
  "start_time": "10:00", // Optional
  "end_time": "14:00",   // Optional
  "reason": "Updated reason"  // Optional
}
```

**Query Parameters:**
- `businessId` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours exception updated successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Delete Business Hours Exception

**DELETE** `/api/business/hours/exceptions/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Query Parameters:**
- `businessId` (number, optional) - Business ID (super_admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Business hours exception deleted successfully"
}
```

---

## Branch Endpoints

### List Branches

**GET** `/api/branches`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Branches retrieved successfully",
  "data": {
    "branches": [
      {
        "id": 5,
        "business_id": 10,
        "name": "Downtown Branch",
        "address": "123 Main St",
        "is_public": true,
        "is_active": true
      }
    ]
  }
}
```

---

### Create Branch

**POST** `/api/branches`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "name": "Downtown Branch",
  "address": "123 Main St",  // Optional
  "is_public": true,         // Optional, default: true
  "businessId": 10           // Optional, super_admin only
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Branch created successfully",
  "data": {
    "branch": { ... }
  }
}
```

---

### Get Branch by ID

**GET** `/api/branches/:id`

**Headers:**
```
Authorization: Bearer <token>  // Optional, required for private branches
```

**Access:** Public (if `is_public=true`) or Private (requires authentication and same business)

**Response (200):**
```json
{
  "success": true,
  "message": "Branch retrieved successfully",
  "data": {
    "branch": { ... }
  }
}
```

---

### Update Branch

**PUT** `/api/branches/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "name": "Updated Branch Name",  // Optional
  "address": "456 New St",        // Optional
  "is_public": false              // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Branch updated successfully",
  "data": {
    "branch": { ... }
  }
}
```

---

### Delete Branch

**DELETE** `/api/branches/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Branch deleted successfully",
  "data": {
    "branch": { ... }
  }
}
```

**Note:** Soft delete (sets `is_active = false`). Automatically removes user-branch associations and deactivates users who lose required branch assignments.

---

### Deactivate Branch

**PATCH** `/api/branches/:id/deactivate`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Branch deactivated successfully",
  "data": {
    "branch": { ... }
  }
}
```

---

### Get Branch Services

**GET** `/api/branches/:id/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Branch Employee, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Branch services retrieved successfully",
  "data": {
    "services": [ ... ]
  }
}
```

---

### Assign Services to Branch

**POST** `/api/branches/:id/services/assign`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Request Body (Single):**
```json
{
  "serviceId": 20
}
```

**Request Body (Bulk):**
```json
{
  "serviceIds": [20, 21, 22]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Services assigned successfully",
  "data": {
    "assignments": [ ... ]
  }
}
```

---

### Remove Service from Branch

**POST** `/api/branches/:id/services/remove`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Request Body:**
```json
{
  "serviceId": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service removed from branch successfully"
}
```

---

### Remove All Services from Branch

**DELETE** `/api/branches/:id/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "All services removed from branch successfully",
  "data": {
    "removedCount": 5
  }
}
```

---

## Category Endpoints

### List Categories

**GET** `/api/categories`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `active_only` (string, optional) - If `'true'`, only return active categories

**Response (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "id": 1,
        "business_id": 10,
        "name": "Hair Services",
        "is_active": true
      }
    ]
  }
}
```

---

### Create Category

**POST** `/api/categories`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "name": "Hair Services",
  "is_active": true,      // Optional, default: true
  "businessId": 10        // Optional, super_admin only
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category": { ... }
  }
}
```

---

### Get Category by ID

**GET** `/api/categories/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "category": { ... }
  }
}
```

---

### Update Category

**PUT** `/api/categories/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "name": "Updated Category Name",  // Optional
  "is_active": false                 // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "category": { ... }
  }
}
```

---

### Delete Category

**DELETE** `/api/categories/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "category": { ... }
  }
}
```

---

## Service Endpoints

### List Services

**GET** `/api/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `active_only` (string, optional) - If `'true'`, only return active services
- `category_id` (number, optional) - Filter by category ID

**Response (200):**
```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": {
    "services": [
      {
        "id": 20,
        "business_id": 10,
        "category_id": 1,
        "name": "Haircut",
        "description": "Professional haircut service",
        "price": 50.00,
        "duration_minutes": 30,
        "services_count": 1,
        "is_featured": false,
        "is_active": true
      }
    ]
  }
}
```

---

### Get Featured Services

**GET** `/api/services/featured`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Featured services retrieved successfully",
  "data": {
    "services": [ ... ]
  }
}
```

---

### Create Service

**POST** `/api/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "category_id": 1,
  "name": "Haircut",
  "description": "Professional haircut service",  // Optional
  "price": 50.00,
  "duration_minutes": 30,
  "services_count": 1,      // Optional, default: 1
  "is_featured": false,     // Optional, default: false
  "is_active": true,        // Optional, default: true
  "businessId": 10          // Optional, super_admin only
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "service": { ... }
  }
}
```

---

### Get Service by ID

**GET** `/api/services/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service retrieved successfully",
  "data": {
    "service": { ... }
  }
}
```

---

### Update Service

**PUT** `/api/services/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Request Body:**
```json
{
  "category_id": 1,         // Optional
  "name": "Updated Name",   // Optional
  "description": "...",     // Optional
  "price": 60.00,          // Optional
  "duration_minutes": 45,   // Optional
  "services_count": 1,      // Optional
  "is_featured": true,      // Optional
  "is_active": true         // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {
    "service": { ... }
  }
}
```

---

### Delete Service

**DELETE** `/api/services/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "Service deleted successfully",
  "data": {
    "service": { ... }
  }
}
```

---

### Get Service Professionals

**GET** `/api/services/:id/professionals`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service professionals retrieved successfully",
  "data": {
    "professionals": [ ... ]
  }
}
```

---

### Assign Professionals to Service

**POST** `/api/services/:id/professionals/assign`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Request Body:**
```json
{
  "professionalIds": [1, 2, 3]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professionals assigned successfully",
  "data": {
    "created": [ ... ],
    "failed": [ ... ]  // IDs that failed to assign
  }
}
```

---

### Remove All Professionals from Service

**DELETE** `/api/services/:id/professionals`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Super Admin

**Response (200):**
```json
{
  "success": true,
  "message": "All professionals removed from service successfully",
  "data": {
    "removedCount": 3
  }
}
```

---

### Get Service Branches

**GET** `/api/services/:id/branches`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service branches retrieved successfully",
  "data": {
    "branches": [ ... ]
  }
}
```

---

## Professional Endpoints

### Assign Professional to Service

**POST** `/api/professionals/assign`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Request Body:**
```json
{
  "professionalId": 5,
  "serviceId": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional assigned to service successfully",
  "data": {
    "assignment": { ... }
  }
}
```

---

### Remove Professional from Service

**POST** `/api/professionals/remove`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Business Admin, Branch Admin, Super Admin

**Request Body:**
```json
{
  "professionalId": 5,
  "serviceId": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional removed from service successfully"
}
```

---

### Get Professional Services

**GET** `/api/professionals/:id/services`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional services retrieved successfully",
  "data": {
    "services": [ ... ]
  }
}
```

---

### Get Professional Hours

**GET** `/api/professionals/:id/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours retrieved successfully",
  "data": {
      "professional_hours": {
        "id": 1,
        "user_business_id": 5,
        "weekly_template": {
          "1": {"start": "09:00", "end": "17:00"},
          "2": {"start": "09:00", "end": "17:00"},
          "3": {"start": "09:00", "end": "17:00"},
          "4": {"start": "09:00", "end": "17:00"},
          "5": {"start": "09:00", "end": "17:00"},
          "6": null,
          "7": null
        }
      }
  }
}
```

---

### Create/Update Professional Hours

**PUT** `/api/professionals/:id/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "weekly_template": {
    "1": {"start": "09:00", "end": "17:00"},
    "2": {"start": "09:00", "end": "17:00"},
    "3": {"start": "09:00", "end": "17:00"},
    "4": {"start": "09:00", "end": "17:00"},
    "5": {"start": "09:00", "end": "17:00"},
    "6": null,
    "7": null
  }
}
```

**Notes:**
- Slot interval is managed at the business level via `business_hours.slot_interval_minutes`
- All professionals in a business use the same slot interval for consistency

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours updated successfully",
  "data": {
    "professional_hours": { ... }
  }
}
```

---

### Delete Professional Hours

**DELETE** `/api/professionals/:id/hours`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours deleted successfully"
}
```

---

### Get Professional Hours Exceptions

**GET** `/api/professionals/:id/hours/exceptions`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours exceptions retrieved successfully",
  "data": {
    "exceptions": [
      {
        "id": 1,
        "user_business_id": 5,
        "date": "2024-12-25",
        "is_closed": true,
        "start_time": null,
        "end_time": null,
        "reason": "Holiday"
      }
    ]
  }
}
```

---

### Create Professional Hours Exception

**POST** `/api/professionals/:id/hours/exceptions`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "date": "2024-12-25",      // YYYY-MM-DD
  "is_closed": true,
  "start_time": null,        // Optional, HH:MM or HH:MM:SS
  "end_time": null,          // Optional, HH:MM or HH:MM:SS
  "reason": "Holiday"        // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Professional hours exception created successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Get Professional Hours Exception by ID

**GET** `/api/professionals/:id/hours/exceptions/:exceptionId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours exception retrieved successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Update Professional Hours Exception

**PUT** `/api/professionals/:id/hours/exceptions/:exceptionId`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "date": "2024-12-25",      // Optional
  "is_closed": false,        // Optional
  "start_time": "10:00",     // Optional
  "end_time": "14:00",       // Optional
  "reason": "Updated reason" // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours exception updated successfully",
  "data": {
    "exception": { ... }
  }
}
```

---

### Delete Professional Hours Exception

**DELETE** `/api/professionals/:id/hours/exceptions/:exceptionId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional hours exception deleted successfully"
}
```

---

### Get Professional Time Off

**GET** `/api/professionals/:id/time-off`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional time off retrieved successfully",
  "data": {
    "time_off": [
      {
        "id": 1,
        "user_business_id": 5,
        "start_date": "2024-12-20",
        "end_date": "2024-12-25",
        "reason": "Vacation"
      }
    ]
  }
}
```

---

### Create Professional Time Off

**POST** `/api/professionals/:id/time-off`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "start_date": "2024-12-20",  // YYYY-MM-DD
  "end_date": "2024-12-25",    // YYYY-MM-DD
  "reason": "Vacation"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Professional time off created successfully",
  "data": {
    "time_off": { ... }
  }
}
```

---

### Get Professional Time Off by ID

**GET** `/api/professionals/:id/time-off/:timeOffId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional time off retrieved successfully",
  "data": {
    "time_off": { ... }
  }
}
```

---

### Update Professional Time Off

**PUT** `/api/professionals/:id/time-off/:timeOffId`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "start_date": "2024-12-20",  // Optional
  "end_date": "2024-12-25",    // Optional
  "reason": "Updated reason"   // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional time off updated successfully",
  "data": {
    "time_off": { ... }
  }
}
```

---

### Delete Professional Time Off

**DELETE** `/api/professionals/:id/time-off/:timeOffId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Professional time off deleted successfully"
}
```

---

## Booking Endpoints

The booking system supports **chain bookings** - allowing customers to book multiple sequential services in a single appointment. The system automatically calculates availability by checking that all services in the chain can fit consecutively without gaps.

### Get Available Time Slots

**GET** `/api/bookings/availability`

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `businessId` (required) - Business ID
- `branchId` (required) - Branch ID
- `date` (required) - Date in YYYY-MM-DD format
- `services` (required) - JSON string of services array

**Services Array Format:**
```json
[
  {
    "serviceId": 1,
    "professionalId": 5,
    "duration": 30
  },
  {
    "serviceId": 2,
    "professionalId": 6,
    "duration": 45
  }
]
```

**Example Request:**
```
GET /api/bookings/availability?businessId=1&branchId=2&date=2024-12-20&services=[{"serviceId":1,"professionalId":5,"duration":30},{"serviceId":2,"professionalId":6,"duration":45}]
```

**Response (200):**
```json
{
  "success": true,
  "message": "Available slots fetched successfully",
  "data": {
    "date": "2024-12-20",
    "availableSlots": [
      "09:00",
      "09:15",
      "09:30",
      "10:00",
      "10:15",
      "14:00",
      "14:15"
    ]
  }
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Business ID, branch ID, date, and services are required"
}
```

**403 - Insufficient Permissions:**
```json
{
  "success": false,
  "code": "INSUFFICIENT_PERMISSIONS",
  "message": "User does not have access to this business"
}
```

**Notes:**
- The system checks availability for the entire chain of services
- Each slot represents a potential start time where all services can fit consecutively
- Availability considers:
  - Business operating hours and exceptions
  - Professional working hours and exceptions
  - Professional time-off periods
  - Existing bookings (excluding cancelled bookings)
- Slots are generated based on the business's slot interval (default: 15 minutes)

---

### Create Booking

**POST** `/api/bookings`

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "businessId": 1,
  "branchId": 2,
  "customerId": 10,              // Optional - null for walk-ins
  "customerName": "John Doe",    // Required
  "customerPhone": "+1234567890", // Required
  "date": "2024-12-20",          // Required - YYYY-MM-DD
  "startTime": "09:00",          // Required - HH:MM
  "services": [                   // Required - Array of services
    {
      "serviceId": 1,
      "professionalId": 5
    },
    {
      "serviceId": 2,
      "professionalId": 6
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "business_id": 1,
    "branch_id": 2,
    "customer_id": 10,
    "customer_name": "John Doe",
    "customer_phone": "+1234567890",
    "appointment_date": "2024-12-20",
    "time_slot": "09:00:00",
    "appointment_timestamp": "2024-12-20 09:00:00",
    "start_time": "2024-12-20 09:00:00",
    "end_time": "2024-12-20 10:15:00",
    "status": "pending",
    "created_at": "2024-12-19 10:30:00",
    "updated_at": "2024-12-19 10:30:00",
    "deleted_at": null,
    "services": [
      {
        "id": 1,
        "booking_id": 1,
        "service_id": 1,
        "professional_user_business_id": 5,
        "sequence_order": 1,
        "start_time": "2024-12-20 09:00:00",
        "end_time": "2024-12-20 09:30:00",
        "duration_minutes": 30,
        "price": "50.00",
        "snapshot_service_name": "Haircut",
        "snapshot_category_id": 1
      },
      {
        "id": 2,
        "booking_id": 1,
        "service_id": 2,
        "professional_user_business_id": 6,
        "sequence_order": 2,
        "start_time": "2024-12-20 09:30:00",
        "end_time": "2024-12-20 10:15:00",
        "duration_minutes": 45,
        "price": "75.00",
        "snapshot_service_name": "Shave",
        "snapshot_category_id": 1
      }
    ]
  }
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Missing required booking data"
}
```

**400 - Slot Not Available:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Selected time slot is no longer available"
}
```

**403 - Insufficient Permissions:**
```json
{
  "success": false,
  "code": "INSUFFICIENT_PERMISSIONS",
  "message": "User does not have access to this business"
}
```

**Notes:**
- The booking is created within a database transaction to ensure atomicity
- Availability is re-validated within the transaction to prevent race conditions
- Each service in the chain is assigned a `sequence_order` (1, 2, 3, ...)
- Start and end times are automatically calculated for each service in the chain
- Service prices and names are snapshotted at booking time
- Bookings can be created for registered customers (`customerId`) or walk-ins (`customerId` = null). For walk-ins, a business-scoped customer record is automatically created based on `businessId + customerPhone` and reused on future bookings.
- Booking status defaults to `pending` and can be: `pending`, `confirmed`, `cancelled`, `completed`, `no_show`

---

### Reschedule Booking

**PUT** `/api/bookings/:id/reschedule`

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (required) - Booking ID

**Request Body:**
```json
{
  "date": "2024-12-22",          // Required - YYYY-MM-DD
  "startTime": "11:00",          // Required - HH:MM
  "services": [                  // Optional - if omitted, existing services are reused
    {
      "serviceId": 3,
      "professionalId": 7
    },
    {
      "serviceId": 4,
      "professionalId": 8
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking rescheduled successfully",
  "data": {
    "id": 1,
    "business_id": 1,
    "branch_id": 2,
    "customer_id": 10,
    "customer_name": "John Doe",
    "customer_phone": "+1234567890",
    "appointment_date": "2024-12-22",
    "time_slot": "11:00:00",
    "appointment_timestamp": "2024-12-22 11:00:00",
    "start_time": "2024-12-22 11:00:00",
    "end_time": "2024-12-22 12:15:00",
    "status": "pending",
    "services": [
      {
        "id": 10,
        "booking_id": 1,
        "service_id": 3,
        "professional_user_business_id": 15,
        "sequence_order": 1,
        "start_time": "2024-12-22 11:00:00",
        "end_time": "2024-12-22 11:30:00",
        "duration_minutes": 30,
        "price": "50.00",
        "snapshot_service_name": "New Service A",
        "snapshot_category_id": 2
      }
    ]
  }
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Date and start time are required"
}
```

**400 - Slot Not Available / Conflict:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Selected time slot conflicts with existing booking"
}
```

**403 - Insufficient Permissions:**
```json
{
  "success": false,
  "code": "INSUFFICIENT_PERMISSIONS",
  "message": "User does not have access to this booking"
}
```

**Notes:**
- Completed and cancelled bookings **cannot** be rescheduled.
- If `services` is omitted, the existing services and professionals are reused.
- Availability is re-validated inside a database transaction and a hard conflict check runs against existing bookings for the involved professionals.

---

### Cancel Booking

**PUT** `/api/bookings/:id/cancel`

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (required) - Booking ID

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 1,
    "business_id": 1,
    "branch_id": 2,
    "customer_id": 10,
    "customer_name": "John Doe",
    "customer_phone": "+1234567890",
    "status": "cancelled"
  }
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Invalid booking ID"
}
```

**400 - Already Cancelled / Completed:**
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Booking is already cancelled"
}
```

**403 - Insufficient Permissions:**
```json
{
  "success": false,
  "code": "INSUFFICIENT_PERMISSIONS",
  "message": "User does not have access to this booking"
}
```

**Notes:**
- Completed bookings cannot be cancelled.
- Cancellation is performed inside a transaction and an audit log entry is created, but logging failures do not block the operation.

---

## Health Check

### Health Check

**GET** `/api/health`

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "message": "Health check route is working"
}
```

---

## Common Patterns

### Date Format
All dates use ISO 8601 format: `YYYY-MM-DD`

### Time Format
Times use 24-hour format: `HH:MM` or `HH:MM:SS`

### Weekly Template Format
```json
{
  "1": {"start": "09:00", "end": "17:00"},  // Monday
  "2": {"start": "09:00", "end": "17:00"},  // Tuesday
  "3": {"start": "09:00", "end": "17:00"},  // Wednesday
  "4": {"start": "09:00", "end": "17:00"},  // Thursday
  "5": {"start": "09:00", "end": "17:00"},  // Friday
  "6": null,  // Saturday (closed)
  "7": null   // Sunday (closed)
}
```

### Phone Format
Phone numbers must include country code: `+[country code][number]`
Example: `+1234567890`

### Role Values
- `business_admin` - Business administrator
- `branch_admin` - Branch administrator
- `branch_employee` - Branch employee
- `super_admin` - System super administrator

---

## Example Frontend Implementation

### Axios Setup

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post('/api/auth/refresh', { refreshToken });
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          // Retry original request
          error.config.headers.Authorization = `Bearer ${data.data.token}`;
          return axios.request(error.config);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Usage Example

```javascript
// Login
const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.data.token);
  localStorage.setItem('refreshToken', data.data.refreshToken);
  return data;
};

// Get services
const getServices = async () => {
  const { data } = await api.get('/services');
  return data.data.services;
};

// Create service
const createService = async (serviceData) => {
  const { data } = await api.post('/services', serviceData);
  return data.data.service;
};
```

---

**End of API Documentation**

