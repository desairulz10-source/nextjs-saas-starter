import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const teams = await prisma.team.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { members: { some: { userId: session.user.id } } },
      ],
    },
    include: {
      owner: {
        select: { name: true, email: true, image: true },
      },
      members: {
        include: {
          user: {
            select: { name: true, email: true, image: true },
          },
        },
      },
      _count: {
        select: { projects: true },
      },
    },
  });

  return NextResponse.json(teams);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { name, description } = await req.json();

  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const team = await prisma.team.create({
    data: {
      name,
      description,
      slug: `${slug}-${Date.now()}`,
      ownerId: session.user.id,
      members: {
        create: {
          userId: session.user.id,
          role: 'OWNER',
        },
      },
    },
  });

  return NextResponse.json(team, { status: 201 });
}
