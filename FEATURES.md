# APOSS Features (as of Jan 13, 2026)

## Public site
- Modern single-page home with hero, value props, process overview, organizer info, and CTAs (Submit, Schedule, Register, Contact).
- Static informational pages: About, Guidelines, Organizers, Presenters, Supporters, Contact, Privacy, Terms.
- Schedule page shows upcoming and past seminars; surfaces Zoom join links when present.

## Submission workflow
- Multi-step submission form (text-only) collecting author info, abstract, keywords, field, methodology, publication status, availability/presentation preferences, and notes.
- Automatic confirmation email to submitter on successful submission.
- Admin alert email sent to organizer list for each new submission.

## Admin dashboard
- Magic-link protected `/admin` (NextAuth email provider with whitelist).
- View all submissions with status chips; statuses: PENDING, UNDER_REVIEW, ACCEPTED, SCHEDULED, PRESENTED, REJECTED.
- One-click status updates with automatic status-update emails.
- Inline date/time picker to schedule a submission; creates an Event and updates submission status.
- Calendar tab (month grid) and Events tab for rescheduling and Zoom link entry.

## Events & scheduling
- API endpoints to create/update events; keeps submission `scheduledAt` in sync.
- On scheduling or event updates, presenter receives an email with date/time and Zoom link (if provided).
- Schedule page filters out cancelled events and surfaces Zoom join links when available.

## Email system
- Resend-backed transactional emails:
  - Submission confirmation
  - Admin alert
  - Status updates (Under Review, Accepted, Rejected, Scheduled) with scheduled date and Zoom link.
- Configurable `EMAIL_FROM` and admin recipient list via env vars.

## Authentication & security
- Email magic-link auth for admins only (whitelist via `ADMIN_EMAIL`).
- Prisma models trimmed to Submission, Event, Settings, and NextAuth tables; no file uploads or blob storage.
- Environment-driven secrets; HTTPS assumed in production.

## Tech stack highlights
- Next.js 15 (App Router), React 19, TypeScript.
- Prisma + Postgres (SQLite for local dev).
- Tailwind CSS v4 for styling; lucide-react icons.
- Deployment-ready for Vercel; no blob storage required.
