# APOSS - Asia Pacific Online Seminar Series

A Next.js application for managing academic seminar submissions, scheduling, and event coordination.

## 🎯 Features

- **Paper Submission System** - Multi-step form (no uploads; email confirmations)
- **Email Notifications** - Automated confirmations and scheduling updates
- **Admin Dashboard** - Review submissions, schedule events, manage calendar
- **Magic Link Authentication** - Secure, passwordless admin login
- **Event Management** - Schedule seminars, manage Zoom links, public calendar
- **Responsive Design** - Professional UI built with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL (production) or SQLite (development)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set up database
npx prisma generate
npx prisma migrate dev

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup and deployment guide
- **[ROLLOUT_PLAN.md](ROLLOUT_PLAN.md)** - Detailed implementation roadmap
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What's been built

## 🔧 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** NextAuth.js (Email Magic Links)
- **Email:** Resend
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Deployment:** Vercel

## 📦 Project Structure

```
src/
├── app/
│   ├── submit/          # Paper submission form
│   ├── admin/           # Admin dashboard
│   ├── schedule/        # Event calendar
│   ├── login/           # Authentication
│   └── api/             # API routes
├── components/          # Reusable UI components
└── lib/
    ├── email.ts         # Email service
    └── email-templates/ # HTML templates
```

## 🌐 Deployment

See [SETUP.md](SETUP.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

## 🔐 Environment Variables

Required for production:

```bash
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate-with-openssl>
NEXTAUTH_URL=https://yourdomain.com
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=APOSS <notifications@aposs.org>
ADMIN_EMAIL=admin@example.com
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
```

See `.env.example` for complete list.

## 📝 License

This project is for academic use. Please ensure compliance with your institution's policies.

## 🤝 Contributing

This is an internal project for APOSS. For questions or issues, contact the organizers.

## 📧 Contact

- **General Inquiries:** contact@aposs.org
- **Organizer:** Charles Crabtree

---

**Built with Next.js 15** | **Powered by Vercel**
