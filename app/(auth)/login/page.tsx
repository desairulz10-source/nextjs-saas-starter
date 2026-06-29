import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import { Github, Mail } from 'lucide-react';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <div className="space-y-4">
          <form
            action={async () => {
              'use server';
              await signIn('github', { callbackUrl: '/dashboard' });
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </form>

          <form
            action={async () => {
              'use server';
              await signIn('google', { callbackUrl: '/dashboard' });
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
