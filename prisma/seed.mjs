import { PrismaClient, UserRole, SubmissionStatus, EventStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin and organizers
  const admin = await prisma.user.upsert({
    where: { email: "admin@aposs.org" },
    update: { name: "APOSS Admin", role: UserRole.ADMIN },
    create: { email: "admin@aposs.org", name: "APOSS Admin", role: UserRole.ADMIN },
  });

  const organizer = await prisma.user.upsert({
    where: { email: "organizer@aposs.org" },
    update: { name: "Primary Organizer", role: UserRole.ORGANIZER },
    create: { email: "organizer@aposs.org", name: "Primary Organizer", role: UserRole.ORGANIZER },
  });

  const viewer = await prisma.user.upsert({
    where: { email: "viewer@aposs.org" },
    update: { name: "Research Enthusiast", role: UserRole.VIEWER },
    create: { email: "viewer@aposs.org", name: "Research Enthusiast", role: UserRole.VIEWER },
  });

  // Submissions

  const s1 = await prisma.submission.create({
    data: {
      title: "Clientelism and Electoral Accountability in Southeast Asia",
      abstract:
        "We examine how clientelistic exchanges shape voter behavior and accountability mechanisms across diverse constituencies in Southeast Asia.",
      authorName: "Nguyen Tran",
      authorEmail: "nguyen.tran@example.com",
      authorAffiliation: "National University of Singapore",
      authorBio: "PhD candidate focusing on comparative politics and political economy.",
      researchField: "Comparative Politics",
      methodology: "Field experiments, survey data",
      keywords: "clientelism, accountability, elections, Southeast Asia",
      status: SubmissionStatus.UNDER_REVIEW,
    },
  });

  const s2 = await prisma.submission.create({
    data: {
      title: "Judicial Independence Under Autocracy: Evidence from Thailand",
      abstract:
        "This paper explores how autocratic regimes influence judicial behavior and the conditions for de facto independence.",
      authorName: "Suda Chai",
      authorEmail: "suda.chai@example.com",
      authorAffiliation: "Chulalongkorn University",
      authorBio: "Assistant Professor of Law and Politics.",
      researchField: "Law and Politics",
      methodology: "Quantitative text analysis, panel data",
      keywords: "judiciary, autocracy, Thailand, institutions",
      status: SubmissionStatus.PENDING,
    },
  });

  const s3 = await prisma.submission.create({
    data: {
      title: "Media Censorship and Public Opinion in Vietnam",
      abstract:
        "We measure the causal effect of media censorship on information acquisition and regime support in Vietnam.",
      authorName: "Lan Pham",
      authorEmail: "lan.pham@example.com",
      authorAffiliation: "Fulbright University Vietnam",
      authorBio: "Researcher in political communication.",
      researchField: "Political Communication",
      methodology: "Survey experiments",
      keywords: "censorship, media, Vietnam, public opinion",
      status: SubmissionStatus.ACCEPTED,
    },
  });

  const s4 = await prisma.submission.create({
    data: {
      title: "The Political Economy of Disaster Relief in Japan",
      abstract:
        "Using municipal-level data, we analyze how political connections shape the allocation of disaster relief funds.",
      authorName: "Haruto Sato",
      authorEmail: "haruto.sato@example.com",
      authorAffiliation: "University of Tokyo",
      authorBio: "Doctoral researcher in political economy.",
      researchField: "Political Economy",
      methodology: "Difference-in-differences",
      keywords: "disaster relief, Japan, political economy, allocation",
      status: SubmissionStatus.SCHEDULED,
    },
  });

  const s5 = await prisma.submission.create({
    data: {
      title: "Digital Activism and Regime Responses in Myanmar",
      abstract:
        "A study of online mobilization dynamics and government responses during periods of contention.",
      authorName: "Aye Min",
      authorEmail: "aye.min@example.com",
      authorAffiliation: "Yangon University",
      authorBio: "Independent researcher.",
      researchField: "Contentious Politics",
      methodology: "Network analysis",
      keywords: "digital activism, Myanmar, repression, mobilization",
      status: SubmissionStatus.REJECTED,
    },
  });

  const s6 = await prisma.submission.create({
    data: {
      title: "Legislative Behavior and Party Discipline in South Korea",
      abstract:
        "We evaluate how party leadership enforces discipline and its impact on roll-call behavior.",
      authorName: "Ji-hoon Kim",
      authorEmail: "jihoon.kim@example.com",
      authorAffiliation: "Seoul National University",
      authorBio: "Assistant Professor of Political Science.",
      researchField: "Legislative Politics",
      methodology: "Ideal point estimation",
      keywords: "legislature, party discipline, South Korea",
      status: SubmissionStatus.PRESENTED,
      presentedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    },
  });

  // Events (link some to submissions)
  const now = new Date();
  const upcoming1Date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // +1 week
  const upcoming2Date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 21); // +3 weeks
  const past1Date = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 14); // -2 weeks

  const e1 = await prisma.event.create({
    data: {
      title: s4.title,
      description: s4.abstract,
      scheduledAt: upcoming1Date,
      duration: 90,
      timeZone: "Asia/Tokyo",
      zoomMeetingId: "98765432101",
      zoomJoinUrl: "https://zoom.us/j/98765432101?pwd=xyz",
      zoomStartUrl: "https://zoom.us/s/98765432101?st=abc",
      zoomPassword: "xyz",
      presenter: s4.authorName,
      presenterEmail: s4.authorEmail,
      moderator: organizer.name ?? "Moderator",
      status: EventStatus.SCHEDULED,
      submission: { connect: { id: s4.id } },
      organizer: { connect: { id: organizer.id } },
    },
  });

  await prisma.submission.update({
    where: { id: s4.id },
    data: {
      status: SubmissionStatus.SCHEDULED,
      scheduledAt: upcoming1Date,
      event: { connect: { id: e1.id } },
    },
  });

  const e2 = await prisma.event.create({
    data: {
      title: s6.title,
      description: s6.abstract,
      scheduledAt: past1Date,
      duration: 75,
      timeZone: "Asia/Seoul",
      zoomMeetingId: "12345098765",
      zoomJoinUrl: "https://zoom.us/j/12345098765?pwd=abc",
      zoomStartUrl: "https://zoom.us/s/12345098765?st=def",
      zoomPassword: "abc",
      presenter: s6.authorName,
      presenterEmail: s6.authorEmail,
      moderator: admin.name ?? "Moderator",
      status: EventStatus.COMPLETED,
      submission: { connect: { id: s6.id } },
      organizer: { connect: { id: admin.id } },
    },
  });

  const e3 = await prisma.event.create({
    data: {
      title: "Roundtable: New Methods in Asian Politics",
      description:
        "A special session discussing cutting-edge methods for studying Asian politics, featuring multiple speakers.",
      scheduledAt: upcoming2Date,
      duration: 120,
      timeZone: "Asia/Singapore",
      zoomMeetingId: "55566677788",
      zoomJoinUrl: "https://zoom.us/j/55566677788?pwd=123",
      zoomStartUrl: "https://zoom.us/s/55566677788?st=456",
      zoomPassword: "123",
      presenter: "Multiple Speakers",
      presenterEmail: "events@aposs.org",
      moderator: organizer.name ?? "Moderator",
      status: EventStatus.SCHEDULED,
      organizer: { connect: { id: organizer.id } },
    },
  });

  console.log("Seed complete:", {
    users: [admin.email, organizer.email, viewer.email],
    submissions: [s1.title, s2.title, s3.title, s4.title, s5.title, s6.title],
    events: [e1.title, e2.title, e3.title],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

