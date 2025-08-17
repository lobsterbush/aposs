-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "authorAffiliation" TEXT NOT NULL,
    "authorBio" TEXT,
    "coAuthors" TEXT,
    "researchField" TEXT NOT NULL,
    "methodology" TEXT,
    "keywords" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" DATETIME,
    "scheduledAt" DATETIME,
    "presentedAt" DATETIME,
    "adminNotes" TEXT,
    "reviewerComments" TEXT,
    "eventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "submissions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "scheduledAt" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 90,
    "timeZone" TEXT NOT NULL DEFAULT 'Asia/Tokyo',
    "zoomMeetingId" TEXT,
    "zoomJoinUrl" TEXT,
    "zoomStartUrl" TEXT,
    "zoomPassword" TEXT,
    "presenter" TEXT NOT NULL,
    "presenterEmail" TEXT,
    "moderator" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "submissionId" TEXT,
    "organizerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'APOSS',
    "siteDescription" TEXT NOT NULL DEFAULT 'Asian Politics Online Seminar Series',
    "contactEmail" TEXT NOT NULL DEFAULT 'contact@aposs.org',
    "submissionsOpen" BOOLEAN NOT NULL DEFAULT true,
    "maxSubmissionsPerWeek" INTEGER NOT NULL DEFAULT 1,
    "zoomApiKey" TEXT,
    "zoomApiSecret" TEXT,
    "zoomWebhookSecret" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_eventId_key" ON "submissions"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "events_submissionId_key" ON "events"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");
