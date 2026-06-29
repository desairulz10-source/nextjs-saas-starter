import { prisma } from '@/lib/prisma';

async function main() {
  console.log('Start seeding...');

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('Created user:', user.email);

  const team = await prisma.team.create({
    data: {
      name: 'Demo Team',
      slug: 'demo-team',
      description: 'A demo team for testing',
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
      projects: {
        create: [
          {
            name: 'Website Redesign',
            description: 'Redesign the company website',
            status: 'ACTIVE',
          },
          {
            name: 'Mobile App',
            description: 'Build the mobile application',
            status: 'ACTIVE',
          },
        ],
      },
    },
  });

  console.log('Created team:', team.name);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
