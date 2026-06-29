import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, Folder, Users } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const stats = await prisma.teamMember.count({
    where: { userId: user?.id },
  });

  const teams = await prisma.team.findMany({
    where: {
      OR: [
        { ownerId: user?.id },
        { members: { some: { userId: user?.id } } },
      ],
    },
    include: {
      _count: {
        select: { members: true, projects: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Teams"
          value={teams.length}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Active teams"
        />
        <StatCard
          title="Projects"
          value={teams.reduce((acc, t) => acc + t._count.projects, 0)}
          icon={<Folder className="h-4 w-4 text-muted-foreground" />}
          description="Total projects"
        />
        <StatCard
          title="Subscription"
          value="Free"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          description="Current plan"
        />
        <StatCard
          title="Activity"
          value="24h"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description="Last active"
        />
      </div>

      {/* Teams List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Teams</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.description || 'No description'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{team._count.members} members</span>
                  <span>{team._count.projects} projects</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {teams.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No teams yet. Create your first team to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
