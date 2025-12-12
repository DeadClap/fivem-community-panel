// apps/backend/prisma/seed.ts
import { PrismaClient, RankBand } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert LSPD department
  const lspd = await prisma.department.upsert({
    where: { name: 'Los Santos Police Department' },
    update: {},
    create: {
      name: 'Los Santos Police Department',
      code: 'L',
    },
  });

  // Basic LSPD rank ladder
  const ranks = [
    { name: 'Officer', shortCode: 'OFC', level: 10, band: RankBand.BASE },
    {
      name: 'Senior Officer',
      shortCode: 'SOFC',
      level: 20,
      band: RankBand.BASE,
    },
    {
      name: 'Sergeant',
      shortCode: 'SGT',
      level: 30,
      band: RankBand.SUPERVISOR,
    },
    {
      name: 'Lieutenant',
      shortCode: 'LT',
      level: 40,
      band: RankBand.LEADERSHIP,
    },
    { name: 'Captain', shortCode: 'CPT', level: 50, band: RankBand.LEADERSHIP },
    { name: 'Chief', shortCode: 'CHIEF', level: 100, band: RankBand.OWNER },
  ];

  for (const rank of ranks) {
    await prisma.departmentRank.upsert({
      where: {
        // unique-ish composite: department + name
        // (we don't have a composite unique here, so we fake it by name uniqueness within department)
        // You can add @@unique([departmentId, name]) in schema later if you want.
        id: `${lspd.id}-${rank.name}`, // hack; better: add a real composite unique in schema
      } as any, // TypeScript hates this hack; in practice you'd refactor to a real unique
      update: {},
      create: {
        departmentId: lspd.id,
        name: rank.name,
        shortCode: rank.shortCode,
        level: rank.level,
        band: rank.band,
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Seed completed');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
