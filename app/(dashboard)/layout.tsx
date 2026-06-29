import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart3, Folder, Home, Settings, Users } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/50 flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="font-bold text-xl">
            SaaS Starter
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink href="/dashboard" icon={<Home className="h-4 w-4" />}>
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/teams" icon={<Users className="h-4 w-4" />}>
            Teams
          </NavLink>
          <NavLink href="/dashboard/projects" icon={<Folder className="h-4 w-4" />}>
            Projects
          </NavLink>
          <NavLink href="/dashboard/analytics" icon={<BarChart3 className="h-4 w-4" />}>
            Analytics
          </NavLink>
          <NavLink href="/dashboard/settings" icon={<Settings className="h-4 w-4" />}>
            Settings
          </NavLink>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name || session.user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="w-full justify-start gap-2">
        {icon}
        {children}
      </Button>
    </Link>
  );
}
