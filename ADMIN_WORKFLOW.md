# APOSS Admin & Paper Submission Workflow

## Overview
The APOSS website manages paper submissions, event scheduling, and registrations through a PostgreSQL database using Prisma ORM. This document explains how the system works and how to administer it.

---

## Paper Submission Process

### 1. Author Submits Paper (Public)
**URL:** `/submit`

**What happens:**
- Author fills out multi-step form with:
  - **Step 1:** Author information (name, email, affiliation, bio, co-authors)
  - **Step 2:** Research details (title, abstract, keywords, research field, methodology)
  - **Step 3:** Additional info (publication status, presentation preferences, availability)

- Form submits to API: `POST /api/submissions`
- Creates `Submission` record in database with status: `PENDING`
- Sends **two emails** automatically:
  1. **Confirmation email** to author
  2. **Alert email** to admin(s) at `ADMIN_EMAIL` address

**Database Record Created:**
```
Submission {
  id: string
  title: string
  abstract: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  status: "PENDING"
  submittedAt: DateTime
  ... (other fields)
}
```

---

## Admin Review Process

### 2. Admin Reviews Submission (Requires Admin Access)

**Current Status:** No admin UI built yet - would need to create `/admin` pages

**How to review submissions manually:**

#### Option A: Via API (temporary solution)
```bash
# Get all submissions
curl http://localhost:3000/api/submissions

# View specific submission by ID
curl http://localhost:3000/api/submissions/[id]

# Update submission status
curl -X PATCH http://localhost:3000/api/submissions/[id] \
  -H "Content-Type: application/json" \
  -d '{"status": "ACCEPTED"}'
```

#### Option B: Via Prisma Studio (development)
```bash
npx prisma studio
```
Opens visual database editor at `http://localhost:5555`

### Submission Status Flow
1. `PENDING` - Just submitted, awaiting review
2. `UNDER_REVIEW` - Admin is reviewing
3. `ACCEPTED` - Approved, ready to schedule
4. `SCHEDULED` - Event created and scheduled
5. `PRESENTED` - Talk has been delivered
6. `REJECTED` - Not accepted (optional)

---

## Event Scheduling

### 3. Admin Schedules Accepted Paper

**API Endpoint:** `POST /api/events`

**What happens:**
1. Admin provides:
   - `submissionId` (the accepted submission)
   - `scheduledAt` (date/time for presentation)
   - Optional: Zoom meeting details

2. System automatically:
   - Creates `Event` record in database
   - Updates `Submission` status to `SCHEDULED`
   - Links submission to event
   - Sends **notification email** to presenter with:
     - Scheduled date/time
     - Zoom join URL (if provided)
     - Presentation guidelines

**Database Record Created:**
```
Event {
  id: string
  title: string (from submission)
  scheduledAt: DateTime
  presenter: string (author name)
  presenterEmail: string
  status: "SCHEDULED"
  zoomJoinUrl: string (optional)
  submissionId: string (linked)
}
```

### Event Status Flow
1. `SCHEDULED` - Future event
2. `ONGOING` - Currently happening
3. `COMPLETED` - Past event
4. `CANCELLED` - Event cancelled

---

## Public Display

### 4. Event Appears on Schedule Page
**URL:** `/schedule`

**What shows:**
- **Upcoming Seminars:** Events with status `SCHEDULED` and future date
- **Past Seminars:** Events with status `COMPLETED` or past date
- Each event shows:
  - Title, presenter, date/time
  - Zoom join link (if available)
  - Registration status

**Data Source:** `GET /api/events` or `GET /api/public/events`

---

## Registration System

### User Registration (Separate from Submissions)
**URL:** `/register`

**API Endpoint:** `POST /api/registrations`

**What happens:**
- User provides: name, email, affiliation, research interests
- **Note:** Currently uses **file storage** (`tmp/registrations.json`), not database
- No email confirmation sent
- Simple tracking of interested attendees

**To view registrations:**
```bash
cat tmp/registrations.json
```

---

## Email Configuration

### Email Provider: Resend
Emails are sent via Resend API. Requires environment variable:

```env
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="APOSS <notifications@aposs.org>"
ADMIN_EMAIL="admin@example.com,admin2@example.com"
```

**Email Templates:**
Located in `src/lib/email-templates/`
- `submission-confirmation.ts` - Sent to authors upon submission
- `admin-alert.ts` - Sent to admins when new submission arrives
- `status-update.ts` - Sent when submission status changes or event scheduled

**If API key not configured:**
- Emails will fail silently
- Submissions still saved to database
- Check console logs for errors

---

## Database Information

### Technology Stack
- **Database:** PostgreSQL (production) / SQLite (local dev)
- **ORM:** Prisma
- **Connection:** Set via `DATABASE_URL` environment variable

### Key Models
1. **Submission** - Paper proposals from authors
2. **Event** - Scheduled seminars
3. **User** - Admin users (for future auth)
4. **Account/Session** - NextAuth session management

### Database Commands
```bash
# View database schema
npx prisma studio

# Check migration status
npx prisma migrate status

# Apply migrations
npx prisma migrate deploy

# Seed database with test data
node prisma/seed.mjs
```

---

## Building an Admin Dashboard (Future Work)

### Recommended Approach
Create protected pages under `/admin`:

1. **`/admin/submissions`** - List all submissions with filters
   - View by status (pending, accepted, etc.)
   - Search by author, title, keywords
   - Quick actions: Accept, Reject, Schedule

2. **`/admin/submissions/[id]`** - Detailed submission view
   - Full paper details
   - Author contact info
   - Action buttons: Update status, Schedule event, Send email

3. **`/admin/events`** - Manage scheduled events
   - Calendar view of upcoming seminars
   - Edit Zoom links, dates, times
   - Mark as completed/cancelled

4. **`/admin/registrations`** - View attendee list
   - Export email list for announcements
   - Analytics on attendance

### Authentication
- Uses NextAuth (configured in `src/app/api/auth/[...nextauth]/route.ts`)
- Currently no auth providers configured
- Recommended: Add email magic links or OAuth (Google, GitHub)

### Example Admin Page Structure
```tsx
// src/app/admin/submissions/page.tsx
export default async function AdminSubmissions() {
  // Protect with auth check
  const session = await getServerSession()
  if (!session) redirect('/login')
  
  // Fetch submissions
  const submissions = await prisma.submission.findMany()
  
  return (
    <AdminLayout>
      <SubmissionTable submissions={submissions} />
    </AdminLayout>
  )
}
```

---

## Testing the System

### Manual Testing Script
A test script is provided: `test-backend.mjs`

```bash
# Start dev server
npm run dev

# In another terminal, run tests
node test-backend.mjs
```

**Tests:**
1. ✅ Events API - Fetch all events
2. ✅ Public Events API - Public-facing event list
3. ✅ Submissions List - Get all submissions
4. ✅ Create Submission - Test submission form
5. ✅ Registrations - Test registration endpoint
6. ✅ Database Connection - Verify Prisma works

---

## Quick Reference

### API Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/submissions` | GET | List all submissions | Future: Yes |
| `/api/submissions` | POST | Create submission | No |
| `/api/submissions/[id]` | GET | Get one submission | Future: Yes |
| `/api/submissions/[id]` | PATCH | Update submission | Future: Yes |
| `/api/events` | GET | List all events | Future: Yes |
| `/api/events` | POST | Schedule event | Future: Yes |
| `/api/events/[id]` | GET | Get one event | Future: Yes |
| `/api/events/[id]` | PATCH | Update event | Future: Yes |
| `/api/public/events` | GET | Public event list | No |
| `/api/registrations` | POST | Register interest | No |

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="APOSS <notifications@aposs.org>"
ADMIN_EMAIL="admin@example.com"

# Optional: Zoom Integration
ZOOM_API_KEY=""
ZOOM_API_SECRET=""
```

---

## Support & Questions

For technical questions about the workflow or to request admin dashboard features, contact the developer or refer to:
- Code: `src/app/api/` directory for all API routes
- Database: `prisma/schema.prisma` for data models
- Email: `src/lib/email-templates/` for email content
