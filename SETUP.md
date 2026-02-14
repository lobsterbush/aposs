# APOSS Setup & Deployment Guide

## Overview

APOSS (Asia Pacific Online Seminar Series) is a Next.js 15 application for managing academic seminar submissions and scheduling.

**Key Features:**
- ✅ Paper submission system (text form)
- ✅ Email notifications (submission confirmations, status updates)
- ✅ Admin dashboard with review workflow
- ✅ Event scheduling and calendar management
- ✅ Email magic link authentication
- ✅ Responsive UI with Tailwind CSS

---

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL database (production) or SQLite (development)
- Resend account for email (https://resend.com)
- Vercel account for deployment (optional but recommended)

---

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```bash
# Database - Use SQLite for local dev
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Email (REQUIRED - Sign up at resend.com)
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="APOSS <notifications@yourdomain.com>"
ADMIN_EMAIL="your-email@example.com"

# SMTP for Auth (uses Resend)
SMTP_HOST="smtp.resend.com"
SMTP_PORT="465"

```

### 3. Set Up Database

Generate Prisma client and run migrations:

```bash
npm run postinstall
npx prisma migrate dev --name init
```

Optional - Seed with sample data:

```bash
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Production Deployment (Vercel)

### 1. Create PostgreSQL Database

Options:
- **Vercel Postgres** (easiest): Create in Vercel dashboard
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app

Get your `DATABASE_URL` connection string.

### 2. Set Up Email Service

1. Sign up at https://resend.com
2. Verify your domain (or use resend.dev for testing)
3. Generate API key
4. Note: You need a verified domain to send emails in production

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Settings → Environment Variables

#### Option B: Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel
```

### 5. Configure Environment Variables

In Vercel dashboard, add these environment variables:

```
DATABASE_URL=postgresql://user:pass@host:5432/database
NEXTAUTH_SECRET=<generate-with-openssl>
NEXTAUTH_URL=https://your domain.com
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=APOSS <notifications@aposs.org>
ADMIN_EMAIL=admin1@example.com,admin2@example.com
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
```

### 6. Run Database Migrations

After first deployment, run migrations:

```bash
vercel env pull .env.production.local
npx prisma migrate deploy
```

Or use the Vercel dashboard to run: `npm run db:migrate`

### 7. Configure Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., aposs.org)
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to your domain

### 8. Configure Email DNS (SPF/DKIM)

For production email delivery:

1. In Resend dashboard, go to your domain
2. Add the SPF and DKIM records to your DNS
3. Verify domain in Resend

---

## Email Configuration

### Resend Setup

1. Create account at https://resend.com
2. Add and verify your domain
3. Create API key
4. Add DNS records (SPF, DKIM) to your domain

### Testing Emails Locally

During local development, emails will show in Resend dashboard but may not deliver without verified domain. Use resend.dev domain for testing.

---

## Authentication

### Admin Access

Admins are whitelisted by email address in the `ADMIN_EMAIL` environment variable.

Add multiple admins:
```
ADMIN_EMAIL=admin1@example.com,admin2@example.com,admin3@example.com
```

### Login Flow

1. Admin goes to `/login`
2. Enters their email
3. Receives magic link email
4. Clicks link to sign in
5. Redirected to `/admin` dashboard

Only emails in `ADMIN_EMAIL` whitelist can sign in.

---

## Database Migrations

### Create a Migration

After changing `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name description_of_change
```

### Deploy Migrations (Production)

```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

---

## Admin Dashboard

Access: `/admin`

**Features:**
- View all submissions with filtering by status
- Review, accept, or reject submissions
- Schedule accepted submissions to specific dates
- Add Zoom meeting links
- Download uploaded papers
- View calendar of scheduled events
- Send status update emails automatically

**Workflow:**
1. New submission → Status: PENDING
2. Click "Review" → Status: UNDER_REVIEW (email sent)
3. Click "Accept" → Status: ACCEPTED (email sent)
4. Enter date/time and submit → Status: SCHEDULED (email sent, event created)

---

## Email Templates

Located in `src/lib/email-templates/`:

- **submission-confirmation.ts** - Sent when paper is submitted
- **admin-alert.ts** - Sent to admins when paper is submitted
- **status-update.ts** - Sent when submission status changes

Templates are HTML with inline CSS for maximum email client compatibility.

---

## Troubleshooting

### Emails Not Sending

1. Check `RESEND_API_KEY` is set correctly
2. Verify domain in Resend dashboard
3. Check Resend dashboard for error logs
4. Ensure `EMAIL_FROM` uses verified domain

### Database Connection Errors

1. Verify `DATABASE_URL` is correct
2. Check database is accessible from Vercel
3. Run migrations: `npx prisma migrate deploy`
4. Check Prisma schema matches database

### Authentication Not Working

1. Verify `NEXTAUTH_SECRET` is set (32+ characters)
2. Check `NEXTAUTH_URL` matches your domain
3. Ensure admin email is in `ADMIN_EMAIL` whitelist
4. Check SMTP settings are correct

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Regenerate Prisma client: `npx prisma generate`
4. Check TypeScript errors: `npm run build`

---

## Maintenance

### Regular Tasks

- **Weekly**: Check admin dashboard for pending submissions
- **Monthly**: Review email delivery rates in Resend dashboard
- **Quarterly**: Audit user access (ADMIN_EMAIL list)
- **Yearly**: Review and update Terms/Privacy policies

### Monitoring

Recommended monitoring services:
- **Uptime**: Vercel Analytics (built-in)
- **Errors**: Sentry or LogRocket
- **Email**: Resend dashboard analytics

---

## Security Best Practices

1. **Secrets**: Never commit `.env` files to git
2. **HTTPS**: Always use HTTPS in production (Vercel provides this)
3. **Rate Limiting**: Consider adding rate limiting to `/api/submissions`
4. **CORS**: API routes are same-origin by default (secure)
5. **File Upload**: Only PDF files accepted, 25MB limit
6. **Admin Access**: Whitelist-based (no public registration)

---

## Backup Strategy

### Database Backups

- **Vercel Postgres**: Automatic daily backups
- **Supabase**: Automatic backups on paid plans
- **Manual**: Use `pg_dump` to backup PostgreSQL

```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## Performance Optimization

Current setup is optimized for:
- **Static Generation**: Public pages (home, about, guidelines)
- **Server-Side Rendering**: Dynamic pages (schedule, events)
- **API Routes**: Efficient database queries with Prisma
- **Edge Caching**: Static assets on Vercel CDN

---

## Cost Estimation (Monthly)

- **Vercel Pro**: $20 (hosting, serverless functions, bandwidth)
- **Vercel Postgres**: $20 (250MB storage)
- **Resend**: $0-20 (3,000 free emails/month, then $20)
- **Domain**: $1-2/month (~$15/year)

**Total**: ~$45-70/month depending on usage

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **Resend Docs**: https://resend.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## License

This project is configured for academic use. Ensure compliance with your institution's policies regarding web applications and data handling.

---

**Last Updated**: November 11, 2025
