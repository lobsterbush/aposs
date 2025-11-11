# APOSS Deployment Checklist

Use this checklist to deploy APOSS to production.

---

## Before You Start

- [ ] Read through [SETUP.md](SETUP.md) for detailed instructions
- [ ] Have access to domain DNS settings
- [ ] Credit card ready for Vercel Pro ($20/month) and Resend if needed

---

## Step 1: Set Up Email Service (30 minutes)

- [ ] Sign up at https://resend.com
- [ ] Add your domain (e.g., aposs.org)
- [ ] Add DNS records provided by Resend (SPF, DKIM, DMARC)
- [ ] Wait for domain verification (can take 24-48 hours)
- [ ] Create API key
- [ ] Save API key: `re_xxxxxxxxxxxx`

**Note:** You can use resend.dev domain for testing while waiting for verification.

---

## Step 2: Prepare Code for Deployment (10 minutes)

- [ ] Ensure all changes are committed to git
- [ ] Push to GitHub:
  ```bash
  git add .
  git commit -m "Complete Phase 1 implementation"
  git push origin main
  ```

---

## Step 3: Deploy to Vercel (20 minutes)

### 3.1 Create Vercel Account
- [ ] Sign up at https://vercel.com
- [ ] Connect your GitHub account

### 3.2 Import Project
- [ ] Click "Add New Project"
- [ ] Select your GitHub repository
- [ ] Framework Preset should auto-detect as "Next.js"

### 3.3 Create Database
- [ ] Go to Storage tab
- [ ] Create "Postgres" database
- [ ] Name it "aposs-db"
- [ ] Copy `DATABASE_URL` connection string

### 3.4 Create Blob Storage
- [ ] Go to Storage tab
- [ ] Create "Blob" storage
- [ ] Name it "aposs-files"
- [ ] Copy `BLOB_READ_WRITE_TOKEN`

### 3.5 Add Environment Variables

In Vercel project settings → Environment Variables, add:

```bash
# Database
DATABASE_URL=<paste-postgres-connection-string>

# NextAuth
NEXTAUTH_SECRET=<generate-new: openssl rand -base64 32>
NEXTAUTH_URL=https://your-project.vercel.app

# Email
RESEND_API_KEY=<from-resend-dashboard>
EMAIL_FROM=APOSS <notifications@aposs.org>
ADMIN_EMAIL=your-email@example.com,colleague@example.com

# SMTP
SMTP_HOST=smtp.resend.com
SMTP_PORT=465

# File Storage
BLOB_READ_WRITE_TOKEN=<from-vercel-blob-dashboard>
```

- [ ] Add all environment variables
- [ ] Double-check EMAIL_FROM matches verified domain

### 3.6 Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Note your deployment URL: `https://your-project.vercel.app`

---

## Step 4: Run Database Migrations (5 minutes)

After first deployment:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production.local

# Run migrations
npx prisma migrate deploy
```

- [ ] Migrations completed successfully
- [ ] No errors in terminal

---

## Step 5: Configure Custom Domain (15 minutes)

### 5.1 Add Domain in Vercel
- [ ] Go to Project Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter your domain: `aposs.org`
- [ ] Note the DNS records provided

### 5.2 Update DNS
- [ ] Log in to your domain registrar
- [ ] Add A record: `76.76.21.21` (or as shown in Vercel)
- [ ] Add CNAME record: `www` → `cname.vercel-dns.com`
- [ ] Wait for DNS propagation (5-60 minutes)

### 5.3 Update Environment
- [ ] In Vercel, update `NEXTAUTH_URL` to your domain:
  ```bash
  NEXTAUTH_URL=https://aposs.org
  ```
- [ ] Redeploy for changes to take effect

---

## Step 6: Test Everything (30 minutes)

### 6.1 Test Submission Flow
- [ ] Go to https://aposs.org/submit
- [ ] Fill out submission form
- [ ] Upload a PDF file
- [ ] Submit form
- [ ] Verify success screen appears
- [ ] Check email for confirmation (both author and admin)

### 6.2 Test Admin Login
- [ ] Go to https://aposs.org/login
- [ ] Enter your admin email
- [ ] Check email for magic link
- [ ] Click link to sign in
- [ ] Verify redirected to `/admin`

### 6.3 Test Admin Dashboard
- [ ] Verify submission appears in dashboard
- [ ] Click "Review" → check email sent
- [ ] Click "Accept" → check email sent
- [ ] Enter date/time and schedule
- [ ] Check scheduling email sent
- [ ] Verify event appears on `/schedule`

### 6.4 Test Public Pages
- [ ] Home page loads correctly
- [ ] Schedule page shows events
- [ ] About page displays correctly
- [ ] Contact page has correct information
- [ ] Privacy and Terms pages load

---

## Step 7: Final Configuration (10 minutes)

### 7.1 Update Admin Emails
- [ ] In Vercel environment variables, update `ADMIN_EMAIL`
- [ ] Add all organizers' emails (comma-separated)
- [ ] Redeploy

### 7.2 Verify Email Domain
- [ ] Check Resend dashboard
- [ ] Ensure domain is verified (green checkmark)
- [ ] Test email delivery to various providers (Gmail, Outlook, etc.)

### 7.3 Set Up Monitoring (Optional)
- [ ] Enable Vercel Analytics (free)
- [ ] Set up Sentry for error tracking (optional)
- [ ] Add Uptime monitoring (optional)

---

## Step 8: Import Historical Data (Optional, 1-2 hours)

If you have 104 past seminars to import:

- [ ] Prepare data in correct format
- [ ] Create import script or manual entry
- [ ] Run import
- [ ] Verify events appear on schedule

---

## Step 9: Launch Announcement (30 minutes)

- [ ] Draft announcement email
- [ ] Include:
  - New submission system URL
  - Brief instructions
  - Contact information
  - Registration link
- [ ] Send to existing APOSS community
- [ ] Post on social media/mailing lists

---

## Post-Launch Monitoring (First Week)

### Daily
- [ ] Check admin dashboard for new submissions
- [ ] Verify emails are being delivered
- [ ] Monitor Vercel dashboard for errors
- [ ] Check Resend dashboard for delivery rates

### Weekly
- [ ] Review submission quality and volume
- [ ] Check for any user-reported issues
- [ ] Verify scheduled events are correct

---

## Troubleshooting Common Issues

### Emails Not Sending
1. Check Resend API key is correct
2. Verify domain is verified in Resend
3. Check EMAIL_FROM matches verified domain
4. Check Resend dashboard for error logs

### File Upload Fails
1. Verify BLOB_READ_WRITE_TOKEN is set
2. Check file is PDF and under 25MB
3. Check Vercel Blob quota

### Admin Can't Login
1. Verify email is in ADMIN_EMAIL list
2. Check NEXTAUTH_URL matches your domain
3. Check SMTP settings are correct
4. Look for magic link email in spam

### Database Errors
1. Verify DATABASE_URL is correct
2. Check migrations ran: `npx prisma migrate deploy`
3. Check database connection in Vercel dashboard

---

## Success! 🎉

Once all items are checked:
- ✅ Site is live at your custom domain
- ✅ Submissions are working
- ✅ Emails are being sent
- ✅ Admin dashboard is accessible
- ✅ Events can be scheduled

---

## Quick Reference

**Important URLs:**
- Production site: https://aposs.org
- Admin dashboard: https://aposs.org/admin
- Vercel dashboard: https://vercel.com/dashboard
- Resend dashboard: https://resend.com/home

**Admin Emails:**
- Update in Vercel: Settings → Environment Variables → ADMIN_EMAIL

**Emergency Contacts:**
- Vercel support: https://vercel.com/support
- Resend support: support@resend.com

---

**Last Updated:** November 11, 2025
